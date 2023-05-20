import { Router } from "express";
import { createShortLink, deleteLink, getLink, openLink } from "../controllers/links.controller.js";
import { authValidation } from "../middlewares/auth.middleware.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { linkSchema } from "../schemas/link.schemas.js";
import { validateUserLink } from "../middlewares/links.middleware.js";

const linkRoutes = Router();

linkRoutes.post("/urls/shorten", validateSchema(linkSchema), authValidation, createShortLink);
linkRoutes.get("/urls/:id", getLink);
linkRoutes.get("/urls/open/:shortUrl", openLink);
linkRoutes.delete("/urls/:id", authValidation, validateUserLink, deleteLink);

export default linkRoutes;