import {findAllFollowers} from "./followersService.js"

export const followersList = async (req, res) => {
	const {username} = req.params;
	try{
		const followers = await findAllFollowers(username);
		if(!followers.status) return res.status(404).render("followersListPage.ejs", {error: true, title: username ,message: followers.message});
		return res.status(200).render("followersListPage.ejs", {error: false, title: username, data: followers.data})
	}catch(error){
		console.log(error);

	}
}

export const followingsList = async (req, res) => {
	const {username} = req.params;
	try{
		const followings = await findAllFollowings(username);
		if(!followings.status) return res.status(404).render("followingsListPage.ejs", {error: true, title: username, message: followings.message});
		return res.status(200).render("followingsListPage.ejs", {error: false, title: username ,data: followings.data});
	}catch(error){
		console.log(error);
	}
}

export const followUsers = async (req, res) => {
	const {id} = req.user;
	const {idFollowing} = req.params;
	try{
		const data = {id, idFollowing};
		const result = await followUser(data);

		res.status
	}catch(error){

	}
}