import { Request, Response, Router } from "express";
import {
  authMe,
  createNewUser,
  loginUser,
} from "../controllers/auth.controller";
import { isLoggedIn } from "../middleware/isLoggedIn";
import { validate } from "../middleware/validate";
import {
  validateLoginSchema,
  validateSignUpSchema,
} from "../schema/auth.schema";

const routes = Router();

declare module "express-session" {
  export interface SessionData {
    visites: number;
    user: boolean;
    userEmail: string;
  }
}

routes.post("/api/signup", validate(validateSignUpSchema), createNewUser);
routes.post("/api/login", validate(validateLoginSchema), loginUser);
routes.get("/api/me", isLoggedIn, authMe);

export default routes;
