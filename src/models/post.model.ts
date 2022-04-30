import { Schema, model } from "mongoose";

export type PostType = {
  title: string;
  body: string;
  comments: string[];
  likes: number;
  img1Url: string;
  img2Url: string;
};

const postSchema = new Schema<PostType>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  comments: [{ type: String, required: true }],
  likes: { type: Number, required: true, default: 0 },
  img1Url: { type: String, required: true },
  img2Url: { type: String, required: true },
});

export const PostModel = model("postModel", postSchema);
