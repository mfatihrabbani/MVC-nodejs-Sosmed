import express from "express";
import usersRoute from "./src/users/usersRouter.js"
import followersRoute from "./src/followers/followersRouter.js"
import bodyParser from "body-parser"
import path from "path"
const app = express();

app.set("view engine", "ejs");
app.set('views', "./src/views"); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(express.json());

app.use("/", usersRoute);
app.use("/users", followersRoute);

app.listen(3000);
console.log("Server running")
