import { Router } from "express";
import userRoutes from "./user.routes.js";
import linkRoutes from "./links.routes.js";

const router = Router()

router.use(userRoutes);
router.use(linkRoutes);

export default router;