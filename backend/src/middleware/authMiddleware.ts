import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  try {
    const secretKey = "sdhfkhskhfkj-wejtrhwejt-ertj";
    const decoded = jwt.verify(token, secretKey) as { id: number; email: string; role: string };
    req.user = decoded; // Properti `user` sekarang ada
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
