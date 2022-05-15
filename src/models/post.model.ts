import { Schema, model } from "mongoose";
import { string } from "yup";

export type PostType = {
  title: string;
  body: string;
  userName: string;
  // comments: string[];
  likedBy: string;
  likes: number;
  img: string;
};

const postSchema = new Schema<PostType>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  userName: { type: String, required: true },
  likedBy: [{ type: String }],
  // comments: [{ type: String, required: true }],
  likes: { type: Number, required: true, default: 0 },
  img: { type: String, required: true },
});

export const PostModel = model("postModel", postSchema);
