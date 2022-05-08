import { PostModel } from "../models/post.model";

type Post = {
  body: string;
  userName: string;
  title: string;
  img: string;
};

export const createNewPost = (body: Post) => {
  try {
    PostModel.create(body);
    return true;
  } catch (err: any) {
    return false;
  }
};
