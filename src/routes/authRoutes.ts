import express from "express";
import { signUp, login } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// 🔐 Register route
router.post("/register", signUp);

// 🔐 Login route
router.post("/login", login);

// ✅ Logout route: clear JWT cookie
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// ✅ Me route: check if user is authenticated
router.get("/me", protect, (req, res) => {
  res.json({
    message: "User authenticated",
    user: (req as any).user, // Optionally replace 'any' with a custom User type
  });
});

export default router;
