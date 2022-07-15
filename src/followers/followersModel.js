import { DataTypes } from "sequelize";
import sequelize from "../dbconfig/dbConnection.js";
import User from "../users/usersModel.js"

const Followers = sequelize.define("Followers",{
	following:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	id_user:{
		type: DataTypes.STRING,
		primaryKey: true,
		allowNull: false,
		references:{
			model: User,
			key: "id_user"
		}
	}
});

Followers.hasOne(User)
Followers.sync({alter: true});


export default Followers;