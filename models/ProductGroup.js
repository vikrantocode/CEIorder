const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const BasicProductDetail = require('./BasicProductDetail');

const ProductGroup = sequelize.define('productGroups', {
	name: {
		type: Sequelize.STRING
	}
});

ProductGroup.hasMany(BasicProductDetail, { onDelete: 'set null' });

sequelize
	.sync()
	.then(() => {
		console.log('Product Groups Table created succesfully!');
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = ProductGroup;
