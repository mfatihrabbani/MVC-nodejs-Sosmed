import Followers from "./followersModel.js";
import Users from "../users/usersModel.js";
import { Op } from "sequelize";
import {checkUsername} from "../users/usersService.js"
import {failedMessage, parsingResult, successData, failedMessageData} from "../utils/utils.js"

export const findAllFollowers = async (username) => {
	try{
		const getUsername = await checkUsername(username)
		if(getUsername == null) return failedMessage("Username not found")
		const getFollowers = await Followers.findAll({include:[{model: user, required: true}]},{
			attributes: ["id_user", "following"],
			where:{
				following: resultUsername.id_user,
			}
		});
		const result = parsingResult(getFollowers);
		console.log(result);
		if(result.length == 0) return failedMessageData("You dont have followers", resultUsername.username);
		return successData(result);
	}catch(error){
		console.log(error)
		return error
	}
}

export const findAllFollowings = async (username) => {
	try{
		const getUsername = await checkUsername(username)
		if(getUsername == null) return failedMessage("Username not found not found")
		const getFollowings = await Followers.findAll({
			attributes: ["id_user", "following"],
			where:{
				id_user: resultUsername.id_user
			}
		});
		const result = parsingResult(getFollowers);
		console.log(result);
		if(result.length == 0) return failedMessageData("You not following other people", resultUsername.username);
		return successData(result);
	}catch(error){
		console.log(error)
		return error
	}
}

export const followUser = async (data) => {
	try{
		const {id, idFollowing} = data;
		const checkFollowed = await Followers.findOne({where:{[Op.and]:[{id_user: id}, {following: idFollowing}]}});
		if(checkFollowed != null) return failedMessage("You already follow this user");
		await Followers.create({id_user: id, following: idFollowing});
		return true;
	}catch(error){
		console.log(error);
	}
}

export const checkFollowing = async (idUser, id) => {
	try{
		const checkFollowed = await Followers.findOne({where:{[Op.and]:[{id_user: idUser}, {following: id}]}});
		if(checkFollowed != null) return true;
		return false;
	}catch(error){
		console.log(error);

	}
}