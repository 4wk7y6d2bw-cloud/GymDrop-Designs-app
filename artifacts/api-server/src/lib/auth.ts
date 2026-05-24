import { type Request, type Response, type NextFunction } from "express";

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (!(req.session as any).adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
};
