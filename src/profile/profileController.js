import {getData, updateProfile, getProfile} from "./profileService.js";


export const renderProfile = async (req, res) => {
	const {username} = req.params;
	console.log(username)
	console.log(req.user)
	let {isOwner, id} = req.user;

	try{
		const data = await getData(username, id);
		console.log(data);
		if(!data.status) return res.status(404).render("profilePage.ejs", {error: true, message: data.message, title: "Not Found"});
		if(!isOwner || id != data.id) return res.status(200).render("profilePage.ejs",{title: username, error: false, owner: false, followers: data.totalFollowers, followings: data.totalFollowings, statusFollow: data.statusFollow, id: data.id, name : data.name, bio: data.bio, link: data.link});
		return res.status(200).render("profilePage.ejs",{title: username, error: false, owner: true, followers: data.totalFollowers, followings: data.totalFollowings, id: data.id, name : data.name, bio: data.bio, link: data.link});
	}catch(error){
		console.log(error);
		res.status(500).render("404Page.ejs");
	}
}

export const updateProfiles = async (req, res) => {
	const {id, username} = req.user;
	const {name, bio, link} = req.body;
	const data = {id, name, bio, link}
	try{
		const update = await updateProfile(data);
		console.log(update);
		res.status(201).redirect(`/p/${username}`);
	}catch(error){
		console.log(error);
		res.status(500).render("404Page.ejs");
	}
}

export const renderUpdateProfile = async (req, res) => {
	const {id, username} = req.user;
	try{
		const result =  await getProfile(id);
		console.log(result)
		const {name, bio, link} = result;
		res.status(200).render("updateProfilePage.ejs", {title: username, name, bio, link});
	}catch(error){
		console.log(error)
		res.status(500).render("404Page.ejs");
	}
}