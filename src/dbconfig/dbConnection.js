import Sequelize from "sequelize";

const sequelize = new Sequelize("Sosmed", "root", "root",{
	"host": "localhost",
	"dialect": "mysql"
});

try{
	console.log("Connection Success");
}catch(error){
	console.error("Connection Failed", error)
}

export default sequelize;