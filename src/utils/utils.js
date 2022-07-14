import bcrypt from "bcrypt";
import uniqid from "uniqid";
import jwt from "jsonwebtoken"

export const parsingResult = (data) => {
	return JSON.parse(JSON.stringify(data));
}

export const hashPasswords = async (password) => {
	const hashPassword = await bcrypt.hash(password, 10);
	console.log(hashPassword)
	return hashPassword;
}

export const generateId = () => {
	return uniqid();
}

export const failedMessage = (message) => {
	const data = {
		status: false,
		message
	}

	return data;
}

export const generateToken = (data) => {
	const {id, username, sesionId} = data;
	try{
			const token = jwt.sign({
			sesionId,
			id,
			username

		}, "RAHASIA", {expiresIn: "1h"})
		return token
	}catch(err){
		console.log(err);
		return err;
	}

}