const Sequelize = require('sequelize');
const db = require('../config/database');
const BasicProductDetail = require('./BasicProductDetail');
const VendorAddress = require('./VendorAddress');
const Warehouse = require('./Warehouse');

const Vendor = db.define('vendors', {
	name: {
		type: Sequelize.STRING
	},
	alias: {
		type: Sequelize.STRING
	},
	accountNumber: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING
	},
	emailCC: {
		type: Sequelize.STRING
	},
	website: {
		type: Sequelize.STRING
	},
	paymentTerm: {
		type: Sequelize.STRING
	},
	restockPast: {
		type: Sequelize.STRING
	},
	restockFuture: {
		type: Sequelize.STRING
	},
	freeShippingOver: {
		type: Sequelize.STRING
	},
	smallOrderThreshold: {
		type: Sequelize.STRING
	},
	leadTimeToShip: {
		type: Sequelize.STRING
	},
	smallOrderFee: {
		type: Sequelize.STRING
	}
});

Vendor.hasOne(VendorAddress, { onDelete: 'cascade' });
Vendor.hasMany(Warehouse, { onDelete: 'cascade' });
const VendorProducts = db.define('vendorProducts', {}, { timestamps: false });
Vendor.belongsToMany(BasicProductDetail, { through: VendorProducts });
BasicProductDetail.belongsToMany(Vendor, { through: VendorProducts });

db.sync()
	.then(() => {
		console.log('Vendors Table Created Successfully!');
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = {
	Vendor: Vendor,
	VendorProducts: VendorProducts
};
