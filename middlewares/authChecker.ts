import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function authChecker(req: Request, res: Response, next: NextFunction): any {
  const token = req.cookies.authToken;
  const payload = verify(token, process.env.JWT_SECRET!);
  
  if (!payload) return res.json({success: false, message: "Invalid token, please login"})

  req.body.payload = payload
  return next()
}