const demoUsers = [
  {
    id: "student-1",
    name: "Jordan Davis",
    email: "student@shield.demo",
    department: "Computer Science",
    role: "student",
    status: "active",
    verified: true,
    password: "S.H.I.E.L.D.123!",
  },
  {
    id: "admin-1",
    name: "Avery Morgan",
    email: "admin@shield.demo",
    department: "Student Affairs",
    role: "admin",
    status: "active",
    verified: true,
    password: "Admin123!",
  },
];

let pendingRegistration = null;
let pendingOtp = "";

const publicUser = ({ password: _password, ...user }) => user;

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("shield_session")) || null;
  } catch {
    return null;
  }
}

export function login(email, password) {
  const user = demoUsers.find(
    (candidate) =>
      candidate.email.toLowerCase() === email.toLowerCase() &&
      candidate.password === password,
  );
  if (!user) throw new Error("Invalid email or password.");
  const safeUser = publicUser(user);
  localStorage.setItem("shield_session", JSON.stringify(safeUser));
  return safeUser;
}

export function beginSignup(details) {
  if (
    demoUsers.some(
      (user) => user.email.toLowerCase() === details.email.toLowerCase(),
    )
  )
    throw new Error("An account with this email already exists.");
  pendingRegistration = { ...details };
  pendingOtp = String(Math.floor(100000 + Math.random() * 900000));
  return pendingOtp;
}

export function getPendingOtp() {
  return pendingOtp;
}

export function verifySignup(code) {
  if (!pendingRegistration || code !== pendingOtp)
    throw new Error("That verification code is not valid.");
  const user = publicUser({
    id: `student-${Date.now()}`,
    ...pendingRegistration,
    role: "student",
    status: "active",
    verified: true,
  });
  demoUsers.push({ ...user, password: pendingRegistration.password });
  localStorage.setItem("shield_session", JSON.stringify(user));
  pendingRegistration = null;
  pendingOtp = "";
  return user;
}

export function resendOtp() {
  if (!pendingRegistration)
    throw new Error("No registration is waiting for verification.");
  pendingOtp = String(Math.floor(100000 + Math.random() * 900000));
  return pendingOtp;
}

export function logout() {
  localStorage.removeItem("shield_session");
}
