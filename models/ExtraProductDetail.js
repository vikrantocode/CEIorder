const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const ExtraProductDetail = sequelize.define('extraProductDetails', {
	property: {
		type: Sequelize.STRING
	},
	value: {
		type: Sequelize.STRING(2500)
	},
	comments: {
		type: Sequelize.STRING
	}
});

sequelize
	.sync()
	.then(() => {
		console.log('Extra Product Details Table Created Succesfully!');
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = ExtraProductDetail;
