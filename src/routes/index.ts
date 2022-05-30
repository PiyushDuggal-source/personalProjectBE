import authRoutes from "./routes.auth";
import userRoutes from "./routes.user";
import express = require("express");
import { Router } from "express";

const router = Router();

router.use(authRoutes);
router.use(userRoutes);

export default router;
