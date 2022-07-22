import Followers from "./followersModel.js";
import Users from "../users/usersModel.js";
import { Op } from "sequelize";
import {checkUsername} from "../users/usersService.js"
import {failedMessage, parsingResult, successData, failedMessageData} from "../utils/utils.js"

export const FollowersList = async (username) => {
	try{
		const getUsername = await checkUsername(username)
		if(getUsername == null) return failedMessageData("Username not found", "USER NOT FOUND")
		const getFollowers = await Followers.findAll({
			include:[{model: Users, required: false, as: "followers", attributes:["id_user", "username"]}],
			attributes: ["id_user", "following"],
			where:{following: getUsername.id_user}
		});
		const result = parsingResult(getFollowers);
		console.log("result ", result);
		if(result.length == 0) return failedMessageData("No one followers", getUsername.username);
		return successData(result);
	}catch(error){
		console.log(error)
		return error
	}
}

export const FollowingsList = async (username) => {
	try{
		const getUsername = await checkUsername(username)
		if(getUsername == null) return failedMessageData("Username not found", "USER NOT FOUND")
		const getFollowings = await Followers.findAll({
			include:[{model: Users, required: false, as: "followings", attributes:["id_user", "username"]}],
			attributes: ["id_user", "following"],
			where:{
				id_user: getUsername.id_user
			}
		});
		const result = parsingResult(getFollowings);
		console.log(result);
		if(result.length == 0) return failedMessageData("No one following People", getUsername.username);
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

export const findAllFollowers = async (username) => {
	try{
		const getUsername = await checkUsername(username)
		if(getUsername == null) return {data: []};
		const getFollowers = await Followers.findAll({
			//include:[{model: Users, required: true, attributes:["id_user", "username"]}],
			attributes: ["id_user", "following"],
			where:{
				following: getUsername.id_user,
			}
		});
		const result = parsingResult(getFollowers);
		console.log(result);
		if(result.length == 0) return {data: []};
		return successData(result);
	}catch(error){
		console.log(error)
		return error
	}
}

export const findAllFollowings = async (username) => {
	try{
		const getUsername = await checkUsername(username)
		if(getUsername == null) return {data: []}
		const getFollowings = await Followers.findAll({
			attributes: ["id_user", "following"],
			where:{
				id_user: getUsername.id_user
			}
		});
		const result = parsingResult(getFollowings);
		console.log(result);
		if(result.length == 0) return {data: []};
		return successData(result);
	}catch(error){
		console.log(error)
		return error
	}
}

export const unFollowUser = async (data) => {
	try{
		const {id, idUnFollow} = data;
		const checkFollowed = await Followers.findOne({where:{[Op.and]:[{id_user: id}, {following: idUnFollow}]}});
		console.log(checkFollowed)
		if(checkFollowed == null) return false;
		const UnFollow = await Followers.destroy({where:{[Op.and]:[{id_user: id}, {following: idUnFollow}]}});
		console.log("Unfollow");
		return true;
	}catch(error){
		console.log(error);
		return error;
	}
}