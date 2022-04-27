import { NextFunction, Request, Response } from "express";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    next();
    return;
  } else {
    res.send({ auth: false });
  }
};
