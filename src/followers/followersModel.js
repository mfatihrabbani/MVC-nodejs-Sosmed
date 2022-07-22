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
			foreignKey: "id_user",
			key: "id_user"
		}
	}
});

Followers.belongsTo(User, {as: "followers",foreignKey: "id_user"});
Followers.belongsTo(User, {as: "followings",foreignKey: "following"});
//User.belongsTo(Followers. {foreignKey: "id_user"});
Followers.sync({alter: true});


export default Followers;