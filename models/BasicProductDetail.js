const Sequelize = require('sequelize');
const db = require('../config/database');
const AdditionalProductDetail = require('./AdditionalProductDetail');
const Catalog = require('./Catalog');
const Note = require('./Note');
const Measurement = require('./Measurement');
const PriceAndCost = require('./PriceAndCost');
const Manufacturer = require('./Manufacturer');
const ImageDetail = require('./ImageDetail');
const ProductClass = require('./ProductClass');
const Selling = require('./Selling');
const UPC = require('./UPC');
const Usage = require('./Usage');
const OrderItem = require('./OrderItem');
const ProductVariant = require('./ProductVariant');
const ExtraProductDetail = require('./ExtraProductDetail');
const ProductResource = require('./ProductResource');

const BasicProductDetail = db.define('basicProductDetails', {
	productId: {
		type: Sequelize.INTEGER
	},
	productType: {
		type: Sequelize.STRING
	},
	itemNumber: {
		type: Sequelize.STRING,
		unique: true
	},
	itemPrefix: {
		type: Sequelize.STRING
	},
	description25Char: {
		type: Sequelize.STRING(2000)
	},
	businessUnit: {
		type: Sequelize.STRING
	},
	countryOriginCode: {
		type: Sequelize.STRING
	},
	countryOriginName: {
		type: Sequelize.STRING
	},
	greenIndicator: {
		type: Sequelize.BOOLEAN
	},
	greenInformation: {
		type: Sequelize.STRING(4500)
	},
	hazardousMaterialCode: {
		type: Sequelize.STRING
	},
	actionIndicator: {
		type: Sequelize.BOOLEAN
	},
	activeIndicator: {
		type: Sequelize.BOOLEAN
	},
	airShippableIndicator: {
		type: Sequelize.BOOLEAN
	},
	assemblyIndicator: {
		type: Sequelize.BOOLEAN
	},
	expirationDateIndicator: {
		type: Sequelize.BOOLEAN
	},
	facilityTotalOnHandQty: {
		type: Sequelize.INTEGER
	},
	hubSupplier: {
		type: Sequelize.STRING
	},
	keywords: {
		type: Sequelize.ARRAY(Sequelize.STRING(1200)),
		allowNull: false
	},
	// manufacturerId : {
	//     type: Sequelize.INTEGER,
	//     allowNull: false,
	//     references : {
	//         model : 'manufacturers',
	//         key : 'id'
	//     }
	// },
	nationalStockNumber: {
		type: Sequelize.STRING
	},
	packageIncludes: {
		type: Sequelize.ARRAY(Sequelize.STRING(1200))
	},
	pinkIndicator: {
		type: Sequelize.BOOLEAN
	},
	productCategory: {
		type: Sequelize.ARRAY(Sequelize.INTEGER)
	},
	privateBrandIndicator: {
		type: Sequelize.BOOLEAN
	},
	prop65Indicator: {
		type: Sequelize.BOOLEAN
	},
	prop65LabelIndicator: {
		type: Sequelize.BOOLEAN
	},
	packQuantity: {
		type: Sequelize.INTEGER
	},
	packUnit: {
		type: Sequelize.STRING
	},
	prop65ToxicityChemical: {
		type: Sequelize.STRING(4000)
	},
	prop65WarningMessage: {
		type: Sequelize.STRING(4000)
	},
	specialFeatBenefitStmt: {
		type: Sequelize.STRING(1200)
	},
	recycledIndicator: {
		type: Sequelize.BOOLEAN
	},
	serialNumbrRequiredInd: {
		type: Sequelize.STRING
	},
	stockingIndicator: {
		type: Sequelize.BOOLEAN
	},
	// vendorId : {
	//     type : Sequelize.INTEGER,
	//     references : {
	//         model : 'vendors',
	//         key : 'id'
	//     }
	// },
	valuePack: {
		type: Sequelize.STRING
	},
	warrantyComments: {
		type: Sequelize.STRING(1200)
	},
	warrantyIndicator: {
		type: Sequelize.BOOLEAN
	},
	webAvailability: {
		type: Sequelize.BOOLEAN
	},
	model: {
		type: Sequelize.STRING
	},
	exclusiveBrandCode: {
		type: Sequelize.STRING
	},
	masterSKU: {
		type: Sequelize.STRING
	},
	eBayItemID: {
		type: Sequelize.STRING
	},
	amazonItemID: {
		type: Sequelize.STRING
	},
	vendorCategory: {
		type: Sequelize.STRING
	},
	specialHandlingIndicator: {
		type: Sequelize.STRING
	},
	quickShipIndicator: {
		type: Sequelize.STRING
	},
	itemPackageQty: {
		type: Sequelize.STRING
	},
	dropStock: {
		type: Sequelize.STRING
	},
	salesQtyMin: {
		type: Sequelize.STRING
	},
	isArchieve: {
		type: Sequelize.BOOLEAN,
		default: false
	}
});

BasicProductDetail.hasOne(AdditionalProductDetail, { onDelete: 'cascade' });
BasicProductDetail.hasOne(Catalog, { onDelete: 'cascade' });
BasicProductDetail.hasOne(ImageDetail, { onDelete: 'cascade' });
BasicProductDetail.hasOne(Manufacturer, { onDelete: 'cascade' });
BasicProductDetail.hasOne(Measurement, { onDelete: 'cascade' });
BasicProductDetail.hasMany(Note, { onDelete: 'cascade' });
BasicProductDetail.hasOne(PriceAndCost, { onDelete: 'cascade' });
BasicProductDetail.hasOne(ProductClass, { onDelete: 'cascade' });
BasicProductDetail.hasOne(Selling, { onDelete: 'cascade' });
BasicProductDetail.hasOne(UPC, { onDelete: 'cascade' });
BasicProductDetail.hasOne(Usage, { onDelete: 'cascade' });
BasicProductDetail.hasMany(OrderItem, { onDelete: 'cascade' });
BasicProductDetail.hasMany(ProductVariant, { onDelete: 'cascade' });
BasicProductDetail.hasMany(ProductResource, { onDelete: 'cascade' });
BasicProductDetail.hasMany(ExtraProductDetail, { onDelete: 'cascade' });

db.sync()
	.then(() => {
		console.log('Basic Product Details Table created succesfully!');
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = BasicProductDetail;
