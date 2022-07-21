import Followers from "./followersModel.js";
import Users from "../users/usersModel.js";
import { Op } from "sequelize";
import {checkUsername} from "../users/usersService.js"
import {failedMessage, parsingResult, successData, failedMessageData} from "../utils/utils.js"

export const FollowersList = async (username) => {
	try{
		const getUsername = await checkUsername(username)
		if(getUsername == null) return failedMessage("Username not found")
		const getFollowers = await Users.findAll({
			include:[{model: Followers, required: false, attributes:["id_user", "following"], where:{following: getUsername.id_user}}],
			attributes: ["id_user", "username"]
		});
		const result = parsingResult(getFollowers);
		console.log(result);
		if(result.length == 0) return failedMessageData("You dont have followers", getUsername.username);
		return successData(result);
	}catch(error){
		console.log(error)
		return error
	}
}

export const FollowingsList = async (username) => {
	try{
		const getUsername = await checkUsername(username)
		if(getUsername == null) return failedMessage("Username not found not found")
		const getFollowings = await Followers.findAll({
			attributes: ["id_user", "following"],
			where:{
				id_user: getUsername.id_user
			}
		});
		const result = parsingResult(getFollowings);
		console.log(result);
		if(result.length == 0) return failedMessageData("You not following People", getUsername.username);
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