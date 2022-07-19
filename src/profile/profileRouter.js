import express from "express";
import {renderProfile} from "./profileController.js";
import {identifyUser, auth} from "../middlewares/middlewares.js"

const router = express.Router();

router.get("/:username", [identifyUser], renderProfile);

export default router;