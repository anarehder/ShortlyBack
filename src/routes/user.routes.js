import { Router } from "express";
import { signin, signup } from "../controllers/user.controller.js";
import { validateEmailAvailable, validateEmailPassword, validatePassword } from "../middlewares/users.middleware.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { userLoginSchema, userSchema } from "../schemas/user.schemas.js";

const userRoutes = Router();

userRoutes.post("/signup", validateSchema(userSchema), validateEmailAvailable, validatePassword, signup);
userRoutes.post("/signin", validateSchema(userLoginSchema), validateEmailPassword,  signin);

export default userRoutes;