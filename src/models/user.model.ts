import { Schema, Document, model } from "mongoose";
import bcryptjs from "bcryptjs";

enum Gender {
  Male = "Male",
  Female = "Female",
  Others = "Others",
}

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: (pass: string) => Promise<Boolean>;
  gender: "Male" | "Female" | "Others";
  imageUrl: string;
  comparePass: (pass: string) => Promise<Boolean>;
}

const userModel = new Schema<User>({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  gender: { type: String, require: true },
});

userModel.pre("save", function (next) {
  const user = this;
  const SALT_WORK_FACTOR = 10;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcryptjs.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcryptjs.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userModel.methods.comparePassword = function (
  candidatePassword: string
): Promise<boolean> {
  let password = this.password;
  return new Promise((resolve, reject) => {
    bcryptjs.compare(candidatePassword, password, (err, success) => {
      if (err) return reject(err);
      return resolve(success);
    });
  });
};

export const UserModel = model<User>("Users", userModel);
