import { Router } from "express";
import { createPost } from "../controllers/user.controller";
import { isLoggedIn } from "../middleware/isLoggedIn";
import { validate } from "../middleware/validate";
import { validatePostSchema } from "../schema/user.schema";

const routes = Router();

routes.post(
  "/api/create",
  isLoggedIn,
  validate(validatePostSchema),
  createPost
);

export default routes;
