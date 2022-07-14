import express from "express";
import {postRegister, renderRegister, postLogin, renderLogin} from "./usersController.js"
const router = express.Router();

router.get("/login", renderLogin);
router.post("/login", postLogin);
router.get("/register", renderRegister);
router.post("/register", postRegister);

export default router;