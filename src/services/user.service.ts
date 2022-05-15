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

export const getAllPost = async () => {
  return await PostModel.find({}, ["-__v"]).sort({ _id: -1 });
};

export const isPostLiked = async (postId: string, userName: string) => {
  console.log(postId, userName);
  const post = await PostModel.find({ _id: postId });
  if (post[0].likedBy.includes(userName)) {
    return true;
  } else {
    return false;
  }
};

export const likePost = async (postId: string, userName: string) => {
  const post = await PostModel.find({ _id: postId });
  let updatedLike = post[0].likes + 1;
  console.log(updatedLike);
  try {
    await PostModel.updateOne(
      { _id: postId },
      { likes: updatedLike, likedBy: [`${userName}`] }
    );
    return true;
  } catch (err: any) {
    return false;
  }
};
