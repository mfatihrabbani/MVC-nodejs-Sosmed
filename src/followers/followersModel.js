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
		allowNull: false,
		references:{
			model: User,
			key: "id_user"
		}
	}
});

Followers.hasOne(User, {foreignKey: "id_user"})
Followers.sync({alter: true});


export default Followers;