import { Request, Response, Router } from "express";
import {
  authMe,
  createNewUser,
  loginUser,
  logout,
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
    userName: string;
  }
}

routes.post("/api/signup", validate(validateSignUpSchema), createNewUser);
routes.post("/api/login", validate(validateLoginSchema), loginUser);
routes.get("/api/me", isLoggedIn, authMe);
routes.get("/api/logout", logout);

export default routes;
