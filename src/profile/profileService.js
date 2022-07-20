import Followers from "../followers/followersModel.js";
import Profile from "./profileModel.js"; 
import {findAllFollowers, findAllFollowings, checkFollowing} from "../followers/followersService.js"
import {failedMessage, parsingResult, successData, failedMessageData} from "../utils/utils.js"
import {checkUsername} from "../users/usersService.js"

export const getData = async (username, id) => {
	try{
		const getUsername = await checkUsername(username);
		if(getUsername == null) return failedMessage("User not found")
		const profile = await Profile.findOne({where: {id_user: getUsername.id_user}});
		const statusFollow = await checkFollowing(id, getUsername.id_user)
		const followers = await findAllFollowers(username);
		console.log(followers);
		const followings = await findAllFollowings(username);
		console.log(followings)
		let totalFollowers = followers.data.length;
		let totalFollowings = followings.data.length;
		if(totalFollowers == 0) totalFollowers = "0";
		if(totalFollowings == 0) totalFollowings = "0";
		let { name, bio, link} = profile;
		console.log(totalFollowers, totalFollowings)
		console.log(name, bio, link)
		return {status: true,totalFollowers, totalFollowings,statusFollow, id: getUsername.id_user, name: name || "-", bio: bio || "-", link: link || "-"};
	}catch(error){
		console.log(error)
	}
}

export const updateProfile = async (data) => {
	try{
		const {id, name , bio, link} = data;
		const update = await Profile.update({name, bio, link}, {where:{id_user:id}});
		return parsingResult(update);
	}catch(error){
		console.log(error);
	}
}

export const getProfile = async (id) => {
	try{
		const result = await Profile.findOne({where: {id_user: id}});
		console.log(parsingResult(result));
		return parsingResult(result);
	}catch(error){
		console.log(error);
	}	
}