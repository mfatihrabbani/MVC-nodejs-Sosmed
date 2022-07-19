import { DataTypes } from "sequelize";
import sequelize from "../dbconfig/dbConnection.js";
import User from "../users/usersModel.js"

const Profile = sequelize.define("Profile", {
	id_user: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true,
		references: {
			model : User,
			key: "id_user",
		}
	},
	name: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	bio : {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	link: {
		type: DataTypes.STRING,
		allowNull: true
	}
});

Profile.hasOne(User);
Profile.sync({alter: true});

export default Profile;