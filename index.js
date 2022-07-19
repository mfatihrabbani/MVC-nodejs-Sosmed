import express from "express";
import usersRoute from "./src/users/usersRouter.js"
import profileRoute from "./src/profile/profileRouter.js"
import followersRoute from "./src/followers/followersRouter.js"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import path from "path"
const app = express();

app.set("view engine", "ejs");
app.set('views', "./src/views"); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(express.json());
app.use(cookieParser())

app.use("/", usersRoute);
app.use("/", profileRoute);
app.use("/users", followersRoute);

app.listen(3000);
console.log("Server running")
