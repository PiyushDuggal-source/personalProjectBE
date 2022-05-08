require("dotenv").config({ path: __dirname + "/.env" });
import MongoStore from "connect-mongo";
import express from "express";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDb } from "./utils/connect";
import router from "./routes";
const app = express();

connectToDb(process.env.MONGO_URL as string);

const store = MongoStore.create({
  mongoUrl: "mongodb://127.0.0.1:27017/backend",
  ttl: 86400,
  collectionName: "cookieSessions",
});

app.use(
  session({
    secret: "samsoong",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // 1 hour
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      // maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: store,
  })
);
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
  })
);

app.use(express.json());

app.use(router);

app.listen(process.env.PORT, () => {
  console.log("app is running");
});
