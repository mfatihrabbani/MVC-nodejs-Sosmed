import Users from "./usersModel.js";
import Profile from "../profile/profileModel.js"
import {parsingResult, hashPasswords, generateId, failedMessage, generateToken} from "../utils/utils.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

export const registerUser = async (data) => {
	try{
		const {username, email, password, confirmPassword} = data;
		if(!username || !email || !password || !confirmPassword) return {status: false, message: "Please check again you field"}
		if(password.length < 8) return {status: false, message: "Password must 8 character"}
		if(password != confirmPassword) return {status: false, message: "Please check again your password"};
		const results = await Users.findAll({
			attributes:["email", "password"],
			where:{
				[Op.or]:[
					{email},
					{username}
				]
			}
		});
		const userChecks = parsingResult(results)
		console.log(userChecks);
		if(userChecks.length != 0) return {status: false, message: "Username or email already used"};
		const hashPassword = await bcrypt.hash(password, 10)
		const id = generateId();
		const result = await Users.create({id_user: id, username, email, password: hashPassword});
		await Profile.create({id_user: id});
		return {status: true}
	}catch(error){
		console.log(error)
		return error;
	}
	
}

export const loginUser = async (data) => {
	try{
		const {username, password} = data;
		if(!username || !password) return failedMessage("Please check again your input");
		const getUser = await Users.findOne({
			attributes:["id_user", "username", "password"],
			where:{
				username,
			}
		});
		const result = parsingResult(getUser);
		if(result == null) return failedMessage("Please check again your email");
		const checkPassword = await bcrypt.compare(password, result.password);
		if(!checkPassword) return failedMessage("Check your password again");
		const sessionId = generateId();
		const token = generateToken({username, id: result.id_user, sessionId});
		await Users.update({sessionId},{where:{id_user: result.id}})
		return {status: true, token: token, id: result.id_user};
	}catch(error){
		console.log(error);
		return error;
	}

}

export const checkUsername = async (username) => {
	try{
		const getUsername = await Users.findOne({where:{username},attributes: ["id_user", "username"]});
		const resultUsername =  parsingResult(getUsername);
		return resultUsername
	}catch(error){
		console.log(error)
	}
}