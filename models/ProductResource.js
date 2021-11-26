const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const ProductResource = sequelize.define('productResources', {
	name: {
		type: Sequelize.STRING
	},
	link: {
		type: Sequelize.STRING(2500)
	},
	comments: {
		type: Sequelize.STRING
	}
});

sequelize
	.sync()
	.then(() => {
		console.log('Product Resources Table Created Succesfully!');
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = ProductResource;
