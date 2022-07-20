import jwt from "jsonwebtoken";

export const identifyUser = async (req, res, next) => {
	try{
		const token = req.cookies.Authorization;
		if(!token){
			const data = {
				id : null,
				isOwner : false,
			}
			req.user = data;
			return next();
		}

		let decoded = await jwt.verify(token, "RAHASIA");
		decoded.isOwner = true;
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