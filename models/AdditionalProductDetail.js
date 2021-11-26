const Sequelize = require('sequelize');
const db = require('../config/database');

const AdditionalProductDetail = db.define('additionalProductDetails', {
	blankSpaceOneCharacter: {
		type: Sequelize.CHAR
	},
	description125Character: {
		type: Sequelize.STRING(15000)
	},
	dualSKUNumber: {
		type: Sequelize.STRING
	},
	dualSKUSequence: {
		type: Sequelize.STRING
	},
	energyStarRatedCode: {
		type: Sequelize.STRING
	},
	EPAOrCPGCode: {
		type: Sequelize.STRING
	},
	itemNumberRevised: {
		type: Sequelize.STRING
	},
	itemNumberSubstitute: {
		type: Sequelize.STRING
	},
	itemReferenceCode: {
		type: Sequelize.STRING
	},
	itemQtyPreAuthCode: {
		type: Sequelize.STRING
	},
	itemVideoUrl: {
		type: Sequelize.STRING
	},
	consolidatedItemCopy: {
		type: Sequelize.STRING(4000)
	},
	contentQualityClass: {
		type: Sequelize.STRING
	},
	discontinuedToBeDisco: {
		type: Sequelize.STRING
	},
	discontinuedDate: {
		type: Sequelize.DATE
	},
	discontinuedSource: {
		type: Sequelize.STRING
	},
	MSDSCode: {
		type: Sequelize.STRING
	},
	nonReturnabeCode: {
		type: Sequelize.STRING
	},
	recycleCtntPrcntgPreCons: {
		type: Sequelize.STRING
	},
	recycleCtntPrcntgPostCons: {
		type: Sequelize.STRING
	},
	recycleCtntPrcntgTotal: {
		type: Sequelize.STRING
	},
	shippingClassCode: {
		type: Sequelize.STRING
	},
	SKUGroupId: {
		type: Sequelize.STRING
	},
	SKUGroupName: {
		type: Sequelize.STRING
	},
	SKUGroupVideoUrl: {
		type: Sequelize.STRING
	},
	stateRestrictionCode: {
		type: Sequelize.STRING
	},
	stockStatusCode: {
		type: Sequelize.STRING
	},
	stockingIndicatorDescr: {
		type: Sequelize.STRING
	},
	TAAOrGSACode: {
		type: Sequelize.STRING
	},
	ULCode: {
		type: Sequelize.STRING
	},
	unitConversionFactor: {
		type: Sequelize.STRING
	},
	unitConversionQty: {
		type: Sequelize.STRING
	},
	unitOfMeasureQty: {
		type: Sequelize.STRING
	},
	unitWithinUOM: {
		type: Sequelize.STRING
	},
	UNSPSC: {
		type: Sequelize.STRING
	},
	stockStatusALBANALB16: {
		type: Sequelize.STRING
	},
	onHandQtyALBANALB16: {
		type: Sequelize.INTEGER
	},
	stockStatusATLANATL01: {
		type: Sequelize.STRING
	},
	onHandQtyATLANATL01: {
		type: Sequelize.STRING
	},
	stockStatusATLANAGA40: {
		type: Sequelize.STRING
	},
	onHandQtyATLANAGA40: {
		type: Sequelize.STRING
	},
	dptCode: {
		type: Sequelize.STRING
	},
	editDivisor: {
		type: Sequelize.STRING
	},
	marketingSource: {
		type: Sequelize.STRING
	},
	isRebate: {
		type: Sequelize.BOOLEAN
	},
	rebateEndDate: {
		type: Sequelize.DATE
	},
	rebateAmount: {
		type: Sequelize.DOUBLE
	},
	handlingCharge: {
		type: Sequelize.DOUBLE
	},
	fobOrigin: {
		type: Sequelize.STRING
	},
	truckParcel: {
		type: Sequelize.STRING
	},
	freightClass: {
		type: Sequelize.STRING
	},
	fixedFreightPrice: {
		type: Sequelize.STRING
	},
	freightCommodityCode: {
		type: Sequelize.STRING
	}
});

// db
// .sync().then(()=>{
//     console.log("Additional Product Details Table created succesfully!")
// }).catch((err)=>{console.log(err)});

module.exports = AdditionalProductDetail;
