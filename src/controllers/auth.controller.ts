import { Request, Response } from "express";
import { CreateUserInput, LoginUserInput } from "../schema/auth.schema";
import { createUser, getUserByEmail } from "../services/auth.service";
import bcryptjs from "bcryptjs";

export const createNewUser = (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  console.log(`Route reached with path: ${req.path} and method: ${req.method}`);
  const body = req.body;
  try {
    const imageUrl = `https://avatars.dicebear.com/api/croodles/${
      body.email[3] + body.email[2] + body.email[1] + body.password[3]
    }`;
    createUser({ ...body, imageUrl });

    return res.status(200).send({ status: "ok", created: true });
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(409)
        .send({ status: `User with email: ${body.email} is already exists` });
    }
  }

  return res.send({
    status: "not ok",
    message: "Unable to create a new User",
  });
};

export const loginUser = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response
) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email, password);
  console.log(user);

  if (!user) {
    res
      .status(404)
      .send({ message: `User with email: ${email}, does not exist!` });
    return;
  }

  const confirmPass = bcryptjs.compareSync(password, user.password);

  console.log(confirmPass);
  if (!confirmPass) {
    res.status(401).send({ message: `Email or Password does not match!` });
    return;
  }

  req.session.user = true;
  req.session.userEmail = user.email;

  res.status(200).json({ login: true });
};

export const authMe = (req: Request, res: Response) => {
  if (req.session.user) {
    res.status(200).send({ auth: true });
  }
};
