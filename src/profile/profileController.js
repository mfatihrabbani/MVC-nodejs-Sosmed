import {getData} from "./profileService.js";


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
	}
}

