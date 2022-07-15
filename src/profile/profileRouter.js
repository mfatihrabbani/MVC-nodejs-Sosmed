import express from "express";
import {} from "./profileService.js";

const router = express.Router();

router.get("/:username", renderProfile)