import { User, UserModel } from "../models/user.model";

interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: "Male" | "Female" | "Others";
  imageUrl: string;
}

export const createUser = (input: NewUser) => {
  return UserModel.create(input);
};

export const getUserByEmail = async (email: string) => {
  return UserModel.findOne({ email: email });
};
