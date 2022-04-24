import mongoose from "mongoose";

export const connectToDb = async (dbURL: string) => {
  try {
    mongoose.connect(dbURL).then(() => {
      console.log("connected to DB");
    });
  } catch (err: any) {
    console.info("unable to connect to DB");
    process.exit(1);
  }
};
