import { Router } from "express";
import {
  createPost,
  getPosts,
  isLiked,
  isUserExists,
  UserInfo,
} from "../controllers/user.controller";
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

routes.get("/api/isUser/:userName", isUserExists);

routes.get("/api/userInfo/:userName", UserInfo);

export default routes;
