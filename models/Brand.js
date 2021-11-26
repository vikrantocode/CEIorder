const Sequelize = require('sequelize');
const db = require('../config/database');
const BasicProductDetail = require('./BasicProductDetail');

const Brand = db.define('brands', {
	brandShortName: {
		type: Sequelize.STRING
	},
	brandLongName: {
		type: Sequelize.STRING
	},
	imageNameBrandLogo: {
		type: Sequelize.STRING
	},
	parentId: {
		type: Sequelize.INTEGER
	}
});

Brand.hasMany(BasicProductDetail, { onDelete: 'cascade' });

db.sync()
	.then(() => {
		console.log('Brand Details Table created succesfully!');
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = Brand;
