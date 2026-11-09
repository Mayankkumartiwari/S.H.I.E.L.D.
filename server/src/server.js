import dotenv from 'dotenv';
import {redisClient}from './config/redis.config.js'
dotenv.config();

import app from './app.js';
import connectDB from './config/db.js';

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`CampusBuzz server running on port ${port}.`);
    });
   await redisClient.connect();
   console.log("Redis connected Successfully");
  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
};

startServer();
