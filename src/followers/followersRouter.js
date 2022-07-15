import express from "express";
import {followersList, followingsList, followUser} from "./followersController.js"
const router = express.Router();

router.get("/followers/:username", followersList);
router.get("/followings/:username", followingsList);
router.post("/follow/:idFollowing", followUser)
export default router;