require("dotenv").config({ path: __dirname + "/.env" });
console.log("dwdwdw", __dirname);
import MongoStore from "connect-mongo";
import express from "express";
import session from "express-session";
import cors from "cors";
import { connectToDb } from "./utils/connect";
import router from "./routes";
const app = express();

connectToDb(process.env.MONGO_URL as string);

const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  dbName: "ActiveSessions",
  collectionName: "Sessions",
  autoRemove: "interval",
});

app.use(
  session({
    secret: "samsoong",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
    store: store,
  })
);

app.use(cors());

app.use(express.json());

app.use(router);

app.listen(process.env.PORT, () => {
  console.log("app is running");
});
