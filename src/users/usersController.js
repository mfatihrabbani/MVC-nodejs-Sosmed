import {registerUser, loginUser} from "./usersService.js";

export const postRegister = async (req, res) => {
	try{
		const {username, email, password, confirmPassword} = req.body;
		const data = {username, email, password, confirmPassword}
		console.log(data)
		const validate = await registerUser(data);
		console.log(validate)
		if(!validate.status) return res.status(404).render("registerPage.ejs",{error: true, message: validate.message});
		return res.status(201).redirect("/login")
	}catch(error){
		res.status(500).render("404Page.ejs");
	}
}

export const postLogin = async (req, res) => {
	try{
		const {username, password} = req.body;
		const data = {username, password};
		const result = await loginUser(data);
		console.log(result)
		if(!result.status) return res.status(404).render("loginPage.ejs", {error: true, message: result.message});
		res.cookie("Authorization", result.token,{
			httpOnly: true
		});
		res.status(200).redirect(`/p/${username}`)
	}catch(error){
		res.status(500).render("404Page.ejs");
	}
}

export const renderRegister = (req, res) => {
	res.render("registerPage.ejs", {error: false})
}

export const renderLogin = (req, res) => {
	res.render("loginPage.ejs",{error: false})
}