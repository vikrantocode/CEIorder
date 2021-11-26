const Sequelize = require('sequelize');
const db = require('../config/database');
const ProductVariant = require('./ProductVariant');

const Variant = db.define('variants', {
	name: {
		type: Sequelize.STRING
	}
});

Variant.hasMany(ProductVariant, { onDelete: 'cascade' });

db.sync()
	.then(() => {
		console.log('Variants Table created succesfully!');
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = Variant;
