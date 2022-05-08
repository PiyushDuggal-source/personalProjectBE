import * as yup from "yup";
import { PostType } from "../models/post.model";

export const validatePostSchema = yup.object().shape({
  title: yup.string().required().min(4),
  body: yup.string().required().max(500),
  userName: yup.string().required(),
});

export type CreatePostInput = yup.InferType<typeof validatePostSchema>;
