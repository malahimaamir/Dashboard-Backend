// File: server/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("🔥 Error:", err.message);
  console.table("something amazing!!!", err);
  res.status(500).json({ error: "Something went wrong on the server." });
};

export default errorHandler;
