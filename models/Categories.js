const Sequelize = require('sequelize');
const db = require('../config/database');
const Categories = db.define('categories', {
	parentId: {
		type: Sequelize.INTEGER
		//allowNull: false
	},
	category: {
		type: Sequelize.STRING
		//allowNull: false
	},
	slug: {
		type: Sequelize.STRING
	},
	status: {
		type: Sequelize.BOOLEAN,
		defaultValue: true
	},
	categoryimg: {
		type: Sequelize.STRING,
		defaultValue:
			'https://res.cloudinary.com/nikitaocode/image/upload/v1610533300/cart_vaj8qb.png'
	},
	googleCategoryId: {
		type: Sequelize.INTEGER
	}
});

// db
// .sync().then(()=>{
//     console.log("Categories Table creates succesfully!")
// }).catch((err)=>{console.log(err)});

module.exports = Categories;
