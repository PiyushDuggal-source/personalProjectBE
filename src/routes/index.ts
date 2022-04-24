import routes from "./routes.auth";

import { Router } from "express";

const router = Router();

router.use(routes);

export default router;
