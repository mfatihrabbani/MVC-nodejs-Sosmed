import {FollowersList, FollowingsList,followUser, unFollowUser} from "./followersService.js"

export const followersList = async (req, res) => {
	const {username} = req.params;
	try{
		const followers = await FollowersList(username);
		console.log(followers);
		if(!followers.status) return res.status(404).render("followersListPage.ejs", {error: true, title: username ,message: followers.data.message});
		return res.status(200).render("followersListPage.ejs", {error: false, title: username, data: followers.data})
	}catch(error){
		console.log(error);
		res.status(500).render("404Page.ejs");
	}
}

export const followingsList = async (req, res) => {
	const {username} = req.params;
	try{
		const followings = await FollowingsList(username);
		console.log(followings)
		if(!followings.status) return res.status(404).render("followingsListPage.ejs", {error: true, title: username, message: followings.data.message});
		return res.status(200).render("followingsListPage.ejs", {error: false, title: username ,data: followings.data});
	}catch(error){
		console.log(error);
	}
}

export const followUsers = async (req, res) => {
	const {id} = req.user;
	const {idFollowing,username} = req.params;
	console.log(id, idFollowing, username)
	try{
		const data = {id, idFollowing};
		const result = await followUser(data);

		res.status(201).redirect(`/p/${username}`);
	}catch(error){
		res.status(500).render("404Page.ejs");
	}
}

export const unFollowUsers = async (req, res) => {
	const {idUnFollow, username} = req.params;
	const {id} = req.user;

	try{
		const data = {id, idUnFollow};
		console.log(data);
		const result = await unFollowUser(data);

		res.status(201).redirect(`/p/${username}`);
	}catch(error){
		console.log(error);
		res.status(500).render("404Page.ejs");
	}
}