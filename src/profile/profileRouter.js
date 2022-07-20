import express from "express";
import {renderProfile, renderUpdateProfile, updateProfiles} from "./profileController.js";
import {identifyUser, auth} from "../middlewares/middlewares.js"

const router = express.Router();

router.get("/p/:username", [identifyUser], renderProfile);
router.get("/profile", [auth], renderUpdateProfile);
router.post("/profile", [auth], updateProfiles)

export default router;