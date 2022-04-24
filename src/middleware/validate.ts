import { NextFunction, Request, Response } from "express";
import { AnyObjectSchema } from "yup";

export const validate =
  (schema: AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.validate(req.body);
      next();
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };
