import { Request, Response } from "express";
import { registerUser, loginUser, generateToken } from "../services/authService";
import { IUser } from "../models/User";
import type { CookieOptions } from "express";

// Cookie options
const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax", // ✅ string literal: OK now
  maxAge: 60 * 60 * 1000, // 1 hour
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;
    const newUser: IUser = await registerUser({ fullName, email, password });
    const token = generateToken(newUser._id.toString());

    res
      .cookie("token", token, cookieOptions)
      .status(201)
      .json({
        message: "Registered successfully",
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
        },
      });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: IUser = await loginUser(email, password);
    const token = generateToken(user._id.toString());

    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        message: "Login successful",
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
      });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
