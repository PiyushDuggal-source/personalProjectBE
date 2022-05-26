import { Request, Response } from "express";
import { CreatePostInput } from "../schema/user.schema";
import {
  createNewPost,
  getAllPost,
  getLikesAndPosts,
  isPostLiked,
  likePost,
  userExistsAndSendUser,
} from "../services/user.service";

export const createPost = (
  req: Request<{}, {}, CreatePostInput>,
  res: Response
) => {
  const { title, body, userName } = req.body;

  const img = `https://avatars.dicebear.com/api/croodles/${
    title[2] + body[2] + userName[2] + userName[3] + title[4]
  }.svg?scale=80`;
  try {
    createNewPost({ ...req.body, img });
    res.json({ created: true });
  } catch (err: any) {
    res.json({ created: false, message: err.message });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  console.log(`Route is reached with ${req.path} and method ${req.method}`);
  try {
    const post = await getAllPost();
    res.json({ post });
  } catch (err: any) {
    res.json({ error: true });
  }
};

export const isLiked = async (req: Request, res: Response) => {
  console.log(`Route is reached with ${req.path} and method ${req.method}`);
  const postId = req.params.postId;
  const liked = await isPostLiked(postId, `${req.session.userName}`);
  if (!liked) {
    likePost(postId, `${req.session.userName}`);
  }
  res.json({ liked });
};

export const isUserExists = async (req: Request, res: Response) => {
  console.log(`Route is reached with ${req.path} and method ${req.method}`);
  const userName = req.params.userName;
  const exists = await userExistsAndSendUser(userName, false);
  res.json({ exists });
};

export const UserInfo = async (req: Request, res: Response) => {
  console.log(`Route is reached with ${req.path} and method ${req.method}`);
  const userName = req.params.userName;
  const userData = await userExistsAndSendUser(userName, true);
  const [likePoints, posts] = await getLikesAndPosts(userName);
  res.json({ userData, likePoints, posts });
};
