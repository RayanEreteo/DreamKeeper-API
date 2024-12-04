import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function authChecker(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.authToken;

  const ok = verify(token, process.env.JWT_SECRET!);

  if (!ok) return res.json({success: false, message: "Invalid token, please login"})

  return next()
}
