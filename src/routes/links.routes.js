import { Router } from "express";
import { createShortLink, getLink } from "../controllers/links.controller.js";
import { authValidation } from "../middlewares/auth.middleware.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { linkSchema } from "../schemas/link.schemas.js";

const linkRoutes = Router();

linkRoutes.post("/urls/shorten", validateSchema(linkSchema), authValidation, createShortLink);
linkRoutes.get("/urls/:id", getLink);

export default linkRoutes;