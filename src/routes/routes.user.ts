import { Router } from "express";
import { createPost, getPosts, isLiked } from "../controllers/user.controller";
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

routes.get("/api/getPosts", getPosts);

routes.get("/api/isLiked/:postId", isLoggedIn, isLiked);

export default routes;
