import { DataTypes } from "sequelize";
import sequelize from "../dbconfig/dbConnection.js";

const Users = sequelize.define("User", {
	id_user:{
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true,
	},
	username:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	email:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	password:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	session_id:{
		type: DataTypes.STRING,
		defaultValue: "P",
	}
})

await Users.sync({alter: true})

export default Users