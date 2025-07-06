// File: src/services/authService.ts
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";
const JWT_EXPIRES_IN = "1h";

// Helper to generate 6-digit unique userId
function generateUserId(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const registerUser = async ({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists");

  let userId: string | undefined;
  let idExists = true;

  while (idExists) {
    userId = generateUserId();
    const userWithSameId = await User.findOne({ userId });
    idExists = !!userWithSameId;
  }

  const newUser = await User.create({ fullName, email, password, userId });
  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }) as IUser;
  if (!user || !(await user.comparePassword(password))) {
    throw new Error("You don't have an account. Please sign up.");
  }
  return user;
};

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
