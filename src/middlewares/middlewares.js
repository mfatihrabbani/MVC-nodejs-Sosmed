import jwt from "jsonwebtoken";

export const identifyUser = async (req, res, next) => {
	try{
		const token = req.cookies.Authorization;
		if(!token){
			res.user.id = null
			req.user.isOwner = false
			return next();
		}

		const decoded = await jwt.verify(token, "RAHASIA");
		req.user = decoded
		return next();
	}catch(error){
		console.log(error);
	}
}

export const auth = async (req, res, next) => {
	try{
		const token = req.cookies["Authorization"];
		const decoded = await jwt.verify(token, "RAHASIA");
		req.user = decoded
		return next();
	}catch(error){
		console.log(error);
	}
}