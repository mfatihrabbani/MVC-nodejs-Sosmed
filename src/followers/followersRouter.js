import express from "express";
import {followersList, followingsList, followUsers, unFollowUsers} from "./followersController.js"
import {identifyUser, auth} from "../middlewares/middlewares.js"
const router = express.Router();

router.get("/followers/:username", followersList);
router.get("/followings/:username", followingsList);
router.post("/follow/:idFollowing/username/:username", [auth], followUsers);
router.post("/unfollow/:idUnFollow/username/:username", [auth], unFollowUsers);
export default router;