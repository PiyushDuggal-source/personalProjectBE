import { Request, Response } from "express";
import { CreateUserInput, LoginUserInput } from "../schema/auth.schema";
import { createUser, getUserByEmail } from "../services/auth.service";
import * as bcryptjs from "bcryptjs";

export const createNewUser = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  console.log(`Route reached with path: ${req.path} and method: ${req.method}`);
  const body = req.body;
  const imageUrl = `https://avatars.dicebear.com/api/croodles/${
    body.email[3] + body.email[2] + body.email[1] + body.password[3]
  }.svg?scale=80`;
  try {
    const user = await createUser({ ...body, imageUrl });
    if (user) {
      res.status(200).json({ status: "ok", created: true });
    }
  } catch (error: any) {
    if (error.code === 11000) {
      if (error.keyValue.userName) {
        return res.json({
          error: `User with User Name: ${body.userName} is already exists`,
        });
      }
      return res.json({
        error: `User with Email: ${body.email} is already exists`,
      });
    }
    return res.send({
      status: "not ok",
      message: "Unable to create a new User",
    });
  }
};

export const loginUser = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response
) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email, password);

  if (!user) {
    res.json({ error: `User with email: ${email}, does not exist!` });
    return;
  }

  const confirmPass = bcryptjs.compareSync(password, user.password);

  if (!confirmPass) {
    res.status(400).json({ error: `Email or Password does not match!` });
    return;
  }

  req.session.user = true;
  req.session.userName = user.userName;

  res.status(200).json({ login: true });
};

export const authMe = (req: Request, res: Response) => {
  console.log(`Route is reached with ${req.path} and method ${req.method}`);
  if (req.session.user) {
    res.status(200).json({ auth: true, userName: `${req.session.userName}` });
  }
};

export const logout = (req: Request, res: Response) => {
  console.log(`Route is reached with ${req.path} and method ${req.method}`);
  req.session.user = false;
  req.session.userName = "";
  res.json({ logout: true });
};
