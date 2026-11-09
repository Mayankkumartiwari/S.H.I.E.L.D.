import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";
import { env } from "../config/env.js";
import { redisClient } from "../config/redis.config.js";

export const register = async (req, res) => {
  try {
    const {
      name,
      emailId,
      collegeId,
      department,
      password,
    } = req.body;

    // Check required fields
    if (
      !name ||
      !emailId ||
      !collegeId ||
      !department ||
      !password
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Password validation
    if (password.length < 4 || password.length > 15) {
      return res.status(400).json({
        message: "Password must be between 4 and 15 characters",
      });
    }

    // Check existing email
    const existingEmail = await User.findOne({ emailId });

    if (existingEmail) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    // Check existing college ID
    const existingCollegeId = await User.findOne({ collegeId });

    if (existingCollegeId) {
      return res.status(409).json({
        message: "College ID already registered",
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      emailId,
      collegeId,
      department,
      passwordHash,
    });

    // Create JWT
    const token = jwt.sign(
      {
        _id: user._id,
        emailId: user.emailId,
        role: user.role,
      },
      env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );

    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        emailId: user.emailId,
        collegeId: user.collegeId,
        department: user.department,
        role: user.role,
      },
      message: "Registration successful",
    });

  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};


// =========================
// LOGIN
// =========================
export const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // passwordHash has select:false
    const user = await User.findOne({ emailId })
      .select("+passwordHash");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Update last login
    user.lastLoginAt = new Date();
    await user.save();

    // Create JWT
    const token = jwt.sign(
      {
        _id: user._id,
        emailId: user.emailId,
        role: user.role,
      },
      env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );

    // Store JWT in cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        emailId: user.emailId,
        collegeId: user.collegeId,
        department: user.department,
        role: user.role,
      },
      message: "Login successful",
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};


// =========================
// LOGOUT
// =========================
export const logout = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User is not logged in",
      });
    }

    // Verify token
    const payload = jwt.verify(token, env.JWT_KEY);

    // Block token in Redis until its original expiry
    await redisClient.set(`token:${token}`, "Blocked");

    await redisClient.expireAt(
      `token:${token}`,
      payload.exp
    );

    // Remove cookie
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      message: "Logout successful",
    });

  } catch (error) {
    console.error("Logout error:", error);

    return res.status(400).json({
      message: "Logout failed",
      error: error.message,
    });
  }
};