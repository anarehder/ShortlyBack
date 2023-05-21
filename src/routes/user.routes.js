import { Router } from "express";
import { getMyLinks, getRanking, signin, signup } from "../controllers/user.controller.js";
import { validateEmailAvailable, validateEmailPassword, validatePassword } from "../middlewares/users.middleware.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { userLoginSchema, userSchema } from "../schemas/user.schemas.js";
import { authValidation } from "../middlewares/auth.middleware.js";

const userRoutes = Router();

userRoutes.post("/signup", validateSchema(userSchema), validateEmailAvailable, validatePassword, signup);
userRoutes.post("/signin", validateSchema(userLoginSchema), validateEmailPassword,  signin);
userRoutes.get("/users/me", authValidation, getMyLinks);
userRoutes.get("/ranking", getRanking);

export default userRoutes;