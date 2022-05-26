import authRoutes from "./routes.auth";
import userRoutes from "./routes.user";
import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("nolfajfdjlddwjj");
});
router.use(authRoutes);
router.use(userRoutes);

export default router;
