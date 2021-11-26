const Sequelize = require('sequelize');
const db = require('../config/database');

const ProductVariant = db.define('productVariants', {
	variantValue: {
		type: Sequelize.STRING
	},
	listPrice: {
		type: Sequelize.STRING
	},
	costColumn1Price: {
		type: Sequelize.STRING
	}
});

db.sync()
	.then(() => {
		console.log('Product Variants Table Created Successfully');
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = ProductVariant;
