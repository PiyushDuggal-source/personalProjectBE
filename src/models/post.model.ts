import { Schema, model } from "mongoose";

export type PostType = {
  title: string;
  body: string;
  author: string;
  // comments: string[];
  likes: number;
  img: string;
};

const postSchema = new Schema<PostType>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  // comments: [{ type: String, required: true }],
  likes: { type: Number, required: true, default: 0 },
  img: { type: String, required: true },
});

export const PostModel = model("postModel", postSchema);
