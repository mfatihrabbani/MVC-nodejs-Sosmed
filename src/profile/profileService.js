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
		let totalFollowers;
		let totalFollowings;
		const statusFollow = await checkFollowing(id, getUsername.id_user)
		const followers = await findAllFollowers(username);
		const followings = await findAllFollowings(username);
		if(followers.length == 0) totalFollowers = 0;
		if(followings.length == 0) totalFollowings = 0;
		let { name, bio, link} = profile;
		return {status: true,totalFollowers, totalFollowings,statusFollow, id: getUsername.id_user, name, bio, link};
	}catch(error){
		console.log(error)
	}
}

export const getProfile = async (id) => {
	try{
		

	}catch(error){
		console.log(error);
	}
}