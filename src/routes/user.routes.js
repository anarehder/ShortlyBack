import { Router } from "express";
import { signup } from "../controllers/user.controller.js";
import { validateEmailAvailable, validatePassword } from "../middlewares/users.middleware.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { userSchema } from "../schemas/user.schemas.js";

const userRoutes = Router();

userRoutes.post("/signup", validateSchema(userSchema), validateEmailAvailable, validatePassword, signup);

export default userRoutes;