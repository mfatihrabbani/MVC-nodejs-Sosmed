import Followers from "./followersModel.js";
import {findAllFollowers, findAllFollowings, checkFollowing} from "../followers/followersService.js"
import {checkUsername} from "../users/usersService.js"

export const getData = async (username, id) => {
	try{
		const getUsername = await checkUsername(username);
		if(getUsername == null) return failedMessage("User not found")
		let totalFollowers;
		let totalFollowings;
		const statusFollow = await checkFollowing(id, getUsername.id_user)
		const followers = await findAllFollowers(username);
		const followings = await findAllFollowings(username);
		if(followers.length == 0) totalFollowers = 0;
		if(followings.length == 0) totalFollowings = 0;
		return {status: true,totalFollowers, totalFollowings,statusFollow, id: getUsername.id_user};
	}catch(error){
		console.log(error)
	}
}

export const getProfile = async (username) => {

}