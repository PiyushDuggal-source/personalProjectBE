import * as yup from "yup";

export const validateSignUpSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  userName: yup.string().required(),
  gender: yup.mixed().oneOf(["Male", "Female", "Others"]),
});

export const validateLoginSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export type CreateUserInput = yup.InferType<typeof validateSignUpSchema>;
export type LoginUserInput = yup.InferType<typeof validateLoginSchema>;
