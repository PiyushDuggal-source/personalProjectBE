import { Request, Response } from "express";
import { CreatePostInput } from "../schema/user.schema";
import { createNewPost } from "../services/user.service";

export const createPost = (
  req: Request<{}, {}, CreatePostInput>,
  res: Response
) => {
  const { title, body, userName } = req.body;

  const img = `https://avatars.dicebear.com/api/croodles/${
    title[2] + body[2] + userName[2] + userName[3] + title[4]
  }.svg`;
  try {
    createNewPost({ ...req.body, img });
    res.json({ created: true });
  } catch (err: any) {
    res.json({ created: false, message: err.message });
  }
};
