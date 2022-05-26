import { PostModel } from "../models/post.model";
import { UserModel } from "../models/user.model";

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
  try {
    await PostModel.updateOne(
      { _id: postId },
      {
        likes: updatedLike,
        $push: {
          likedBy: [`${userName}`],
        },
      }
    );
    return true;
  } catch (err: any) {
    return false;
  }
};

export const userExistsAndSendUser = async (
  userName: string,
  sendData: boolean
) => {
  const user = await UserModel.findOne({ userName: userName }, [
    "-__v",
    "-password",
    "-email",
    "-_id",
  ]);
  if (!sendData) {
    if (!user) {
      return false;
    } else {
      return true;
    }
  } else {
    return user;
  }
};

export const getLikesAndPosts = async (userName: string) => {
  const posts = await PostModel.find({ userName: userName }, [
    "-_id",
    "-likedBy",
    "-userName",
    "-body",
    "-__v",
  ]);
  let likes = 0;
  posts.forEach((post) => {
    likes = likes + post.likes;
  });
  const likePoints = likes * 12;
  return [likePoints, posts];
};
