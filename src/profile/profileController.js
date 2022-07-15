import {getData} from "./profileService.js";

export const renderProfile = async (req, res) => {
	const {username} = req.params;
	const {isOwner, id} = req.user;
	try{
		const data = await getData(username, id);
		if(!data.status) return res.status(404).render("profilePage.ejs", {error: true, message: data.message});
		if(!isOwner) return res.status(200).render("profilePage.ejs",{title: username, error: false, owner: false, followers: data.totalFollowers, followings: data.totalFollowings, statusFollow: data.statusFollow, id: data.id});
		return res.status(200).render("profilePage.ejs",{title: username, error: false, owner: true, followers: data.totalFollowers, followings: data.totalFollowings});
	}catch{

	}
}