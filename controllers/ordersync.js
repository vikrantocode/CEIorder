const uploads = './uploads';
const uploaded = './uploaded';
const BaseUrl = '../';
var path = require('path')
var ps = require('process-sync')
var csvHeaders = require('csv-headers');
const csv = require('csvtojson');
const _ = require('lodash-contrib');
const xlsx = require('xlsx')
const fs = require('fs');
const https = require('https'); // or 'https' for https:// URLs
const http = require('http'); // or 'https' for https:// URLs
var csvHeaders = require('csv-headers');
// Models 
const sequelize = require('../config/database');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const PaymentDetail = require('../models/PaymentDetail');
const ShippingDetail = require('../models/ShippingDetail');
const BillingDetail = require('../models/BillingDetail');

const csvHeader = ["productId", "itemNumber", "description25Char", "businessUnit", "countryOriginCode", "countryOriginName", "greenIndicator", "hazardousMaterialCode",
 					"actionIndicator", "activeIndicator", "airShippableIndicator", "assemblyIndicator", "expirationDateIndicator", "facilityTotalOnHandQty", "hubSupplier",
 					"keywords", "pinkIndicator", "privateBrandIndicator", "prop65Indicator", "prop65LabelIndicator",	"packQuantity",	"packUnit"	,"prop65ToxicityChemical",
 					"prop65WarningMessage","specialFeatBenefitStmt", "recycledIndicator", "serialNumbrRequiredInd", "stockingIndicator", "valuePack", "warrantyComments",
 					"warrantyIndicator", "webAvailability", "brandShortName", "subVendorId", "exclusiveBrandCode",	"vendorName", "vendorId", "eBayItemID", "amazonItemID",
 					"vendorCategory", "productType", "specialHandlingIndicator", "quickShipIndicator", "itemPackageQty", "dropStock", "salesQtyMin", "description125Character",
 					"dualSKUNumber", "dualSKUSequence", "energyStarRatedCode","EPAOrCPGCode", "itemNumberRevised", "itemNumberSubstitute", "itemReferenceCode", "itemQtyPreAuthCode",
 					"consolidatedItemCopy", "contentQualityClass", "discontinuedToBeDisco", "discontinuedDate", "discontinuedSource", "MSDSCode", "nonReturnabeCode", 
 					"recycleCtntPrcntgPreCons", "recycleCtntPrcntgPostCons", "recycleCtntPrcntgTotal", "shippingClassCode", "SKUGroupId", "SKUGroupName", "SKUGroupVideoUrl", 
 					"stateRestrictionCode", "stockStatusCode", "stockingIndicatorDescr", "TAAOrGSACode", "ULCode", "unitConversionFactor", "unitConversionQty", "unitOfMeasureQty",
 					"unitWithinUOM", "UNSPSC", "stockStatusALBANALB16", "onHandQtyALBANALB16",	"stockStatusATLANATL01", "onHandQtyATLANATL01",	"stockStatusATLANAGA40", "onHandQtyATLANAGA40",
 					"dptCode",	"editDivisor", "marketingSource", "isRebate", "rebateEndDate", "rebateAmount", "handlingCharge", "fobOrigin", "truckParcel", "freightClass",
 					"fixedFreightPrice", "freightCommodityCode", "listPrice" ]

var url = require("url");
var path = require("path");

const moveFile =function (oldPath, newPath) {
	try{
		fs.rename(oldPath, newPath,function (err) {
		    if (err) {
				console.log(err, "----------error")
			}
	}) 
	}catch (err){

	}
	
}


//? Helper Function to Rename Keys
const renameToDesiredFormat = (data) => {
	let result = [];
	data.map((item) => {
		result.push(
			_.renameKeys(item, {
				OrderID: 'orderId',
				OrderItemID: 'orderItemId',
				UserID: 'customerId',
				SiteCode: 'siteCode',
				TimeOfOrder: 'timeOfOrder',
				SubTotal: 'subTotal',
				ShippingTotal: 'shippingTotal',
				OrderDiscountsTotal: 'orderDiscountsTotal',
				ShippingDiscountsTotal: 'shippingDiscountsTotal',
				HandlingFee: 'handlingFee',
				InsuranceTotal: 'insuranceTotal',
				GiftWrapCharge: 'giftWrapCharge',
				DropShipFeeTotal: 'dropShipFeeTotal',
				GrandTotal: 'grandTotal',
				Status: 'status',
				PaymentStatus: 'paymentStatus',
				PaymentDate: 'payementDate',
				PaymentReferenceNumber: 'paymentReferenceNumber',
				PaymentMethod: 'paymentMethod',
				ShippingStatus: 'shippingStatus',
				ShipDate: 'shippingDate',
				ShippingFee: 'shippingFee',
				ShipFirstName: 'shipFirstName',
				ShipLastName: 'shippingLastName',
				ShipCompanyName: 'shipCompanyName',
				ShipAddress1: 'shipAddress1',
				ShipAddress2: 'shipAddress2',
				ShipCity: 'shipCity',
				ShipState: 'shipState',
				ShipZipCode: 'shipZipCode',
				ShipCountry: 'shipCountry',
				ShipPhoneNumber: 'shipPhoneNumber',
				OrderSource: 'orderSource',
				OrderSourceOrderID: 'orderSourceOrderId',
				OrderCurrency: 'orderCurrency',
				eBaySalesRecordNumber: 'eBaySalesRecordNumber',
				ShippingMethodSelected: 'shippingMethodSelected',
				IsRushOrder: 'isRushOrder',
				InvoicePrinted: 'invoicePrinted',
				InvoicePrintedDate: 'invoicePrintedDate',
				ShippingCarrier: 'shippingCarrier',
				PackageType: 'packageType',
				CompanyID: 'companyId',
				OrderSourceOrderTotal: 'orderSourceTotal',
				StationID: 'stationId',
				CustomerServiceStatus: 'customerServiceStatus',
				TaxRate: 'taxRate',
				TaxTotal: 'taxTotal',
				GoogleOrderNumber: 'googleOrderNumber',
				IsInDispute: 'isInDispute',
				DisputeStartedOn: 'disputeStartedOn',
				PaypalFeeTotal: 'payPalFeeTotal',
				PostingFeeTotal: 'postingFeeTotal',
				FinalValueTotal: 'finalValueTotal',
				ShippingWeightTotalOz: 'shippingWeightTotalOz',
				Qty: 'qty',
				LineTotal: 'lineTotal',
				BackOrderQty: 'backOrderQty',
				OriginalUnitPrice: 'originalUnitPrice',
				OriginalShippingCost: 'OriginalShippingCost',
				AdjustedUnitPrice: 'adjustedUnitPrice',
				AdjustedShippingCost: 'adjustedShippingCost',
				TrackingNumber: 'trackingNumber',
				SerialNumber: 'serialNumber',
				LocationNotes: 'locationNotes',
				ShippedBy: 'shippedBy',
				DeliveryDate: 'deliveryDate',
				ShipFromWarehouse: 'shipFromWarehouse',
				eBayItemID: 'eBayItemId',
				AmazonItemID: 'amazonItemId',
				MarketingSource: 'marketingSource'
			})
		);
	});
	const dateFields = [
		'deliveryDate',
		'disputeStartedOn',
		'invoicePrintedDate',
		'timeOfOrder',
		'payementDate',
		'shippingDate'
	];
	result.map((order) => {
		dateFields.map((dateHeader) => {
			if (order[dateHeader] === '') order[dateHeader] = null;
		});
	});
	return result;
};


const readfile = async (file)=>{
	let filext = path.extname(file)
	if (filext ==='.csv'){
		const jsonOrders =await csv().fromFile(file);
		const orders = renameToDesiredFormat(jsonOrders);
		return orders;
		
	}
	else if (filext ==='.xlsx'){
		const wb = xlsx.readFile(file)
		const ws = wb.Sheets['sample']
		const datas = xlsx.utils.sheet_to_json(ws)
		console.log(datas, "---------------------------xlsx")
		return datas;
	}

}

const UploadOrder=function(file, oldPath, newPath ){

	ps.lock();
	setTimeout(function(){
		readfile(oldPath).then(async(order) =>{
			const t =await sequelize.transaction();
			let date_ob1 = new Date();
			// current hours
			let hours1 = date_ob1.getHours();
			// current minutes
			let minutes1 = date_ob1.getMinutes();
			// current seconds
			let seconds1 = date_ob1.getSeconds();
			try {
				for (data of order) {
					const orderDetails = _.pick(data, [
						'customerId',
						'orderSource',
						'orderSourceOrderId',
						'isRushOrder',
						'packageType',
						'deliveryDate',
						'locationNotes',
						'eBaySalesRecordNumber',
						'serialNumber',
						'trackingNumber',
						'disputeStartedOn',
						'isInDispute',
						'siteCode',
						'googleOrderNumber',
						'customerServiceStatus',
						'invoicePrinted',
						'invoicePrintedDate',
						'status',
						'timeOfOrder'
					]);
					const paymentDetails = _.pick(data, [
						'paymentStatus',
						'payementDate',
						'paymentReferenceNumber',
						'paymentMethod',
						'orderCurrency',
						'orderDiscountsTotal',
						'insuranceTotal',
						'subTotal',
						'grandTotal',
						'taxRate',
						'taxTotal',
						'lineTotal',
						'finalValueTotal',
						'postingFeeTotal',
						'payPalFeeTotal',
						'orderSourceTotal',
						'orderId'
					]);
					const shippingDetails = _.pick(data, [
						'shippingTotal',
						'shippingDiscountsTotal',
						'dropShipFeeTotal',
						'shippingDate',
						'shipFirstName',
						'shippingLastName',
						'shipCompanyName',
						'shipAddress1',
						'shipAddress2',
						'shipCity',
						'shipState',
						'shipZipCode',
						'shipCountry',
						'shipPhoneNumber',
						'shippingMethodSelected',
						'companyId',
						'shippingCarrier',
						'shippedBy',
						'shipFromWarehouse',
						'shippingFee',
						'originalShippingCost',
						'adjustedShippingCost',
						'shippingWeightTotalOz',
						'shippingStatus',
						'stationId',
						'orderId'
					]);
					const billingDetails = _.pick(data, [
						'billingTotal',
						'billingDiscountsTotal',
						'billingDate',
						'billingFirstName',
						'billingLastName',
						'billingCompanyName',
						'billingAddress1',
						'billingAddress2',
						'billingCity',
						'billingState',
						'billingZipCode',
						'billingCountry',
						'billingPhoneNumber',
						'billingMethodSelected'
					]);
					const orderItemDetails = _.pick(data, [
						'adjustedUnitPrice',
						'originalUnitPrice',
						'handlingFee',
						'giftWrapCharge',
						'qty',
						'backOrderQty',
						'orderId'
					]);
					const { id } = await Order.create(orderDetails, { transaction: t });
					paymentDetails.orderId = id
					shippingDetails.orderId = id
					billingDetails.orderId = id
					orderItemDetails.orderId = id
					await PaymentDetail.create(paymentDetails, { transaction: t });
					await BillingDetail.create(billingDetails, { transaction: t });
					await ShippingDetail.create(shippingDetails, { transaction: t });
					await ShippingDetail.create(shippingDetails, { transaction: t });
					await OrderItem.create(orderItemDetails, { transaction: t });
					console.log(id)
					}	// End for 

				// t.commit();
				// // //  Move file to uploded folder after successfully imported 
				// moveFile(oldPath, newPath)
				
				let date_ob2 = new Date();
					// current hours
				let hours2 = date_ob2.getHours();
				// current minutes
				let minutes2 = date_ob2.getMinutes();
				// current seconds
				let seconds2 = date_ob2.getSeconds();
				console.log("-------------------------------",file," Upload time = ",(hours2-hours1) + ":" + (minutes2-minutes1)+ ":" + (seconds2- seconds1))
				ps.unlock();
			} catch (err) {
					console.log(err, "------------------------------------------------------err")
					// t.rollback();
					ps.unlock();

			}	

		})
	},3000);

	}

const Ordersync = async(req, res) => {
	// Read file inside Uplods dir 
	 fs.readdir(uploads,(err, files) => {	   
		files.forEach(async(file) => {

			const oldPath = (uploads+"/"+file)
			const newPath = (uploaded+"/"+file)
            
			ps.process(UploadOrder,[file,oldPath, newPath]);
			
			});
	  	}); 
	}


const ImportOrder = async(req, res) => {
	const oldPath = req.query.name
	readfile(oldPath).then(async(order) =>{
		const t =await sequelize.transaction();
		try {
			for (data of order) {
				const orderDetails = _.pick(data, [
					'customerId',
					'orderSource',
					'orderSourceOrderId',
					'isRushOrder',
					'packageType',
					'deliveryDate',
					'locationNotes',
					'eBaySalesRecordNumber',
					'serialNumber',
					'trackingNumber',
					'disputeStartedOn',
					'isInDispute',
					'siteCode',
					'googleOrderNumber',
					'customerServiceStatus',
					'invoicePrinted',
					'invoicePrintedDate',
					'status',
					'timeOfOrder'
				]);
				const paymentDetails = _.pick(data, [
					'paymentStatus',
					'payementDate',
					'paymentReferenceNumber',
					'paymentMethod',
					'orderCurrency',
					'orderDiscountsTotal',
					'insuranceTotal',
					'subTotal',
					'grandTotal',
					'taxRate',
					'taxTotal',
					'lineTotal',
					'finalValueTotal',
					'postingFeeTotal',
					'payPalFeeTotal',
					'orderSourceTotal',
					'orderId'
				]);
				const shippingDetails = _.pick(data, [
					'shippingTotal',
					'shippingDiscountsTotal',
					'dropShipFeeTotal',
					'shippingDate',
					'shipFirstName',
					'shippingLastName',
					'shipCompanyName',
					'shipAddress1',
					'shipAddress2',
					'shipCity',
					'shipState',
					'shipZipCode',
					'shipCountry',
					'shipPhoneNumber',
					'shippingMethodSelected',
					'companyId',
					'shippingCarrier',
					'shippedBy',
					'shipFromWarehouse',
					'shippingFee',
					'originalShippingCost',
					'adjustedShippingCost',
					'shippingWeightTotalOz',
					'shippingStatus',
					'stationId',
					'orderId'
				]);
				const billingDetails = _.pick(data, [
					'billingTotal',
					'billingDiscountsTotal',
					'billingDate',
					'billingFirstName',
					'billingLastName',
					'billingCompanyName',
					'billingAddress1',
					'billingAddress2',
					'billingCity',
					'billingState',
					'billingZipCode',
					'billingCountry',
					'billingPhoneNumber',
					'billingMethodSelected'
				]);
				const orderItemDetails = _.pick(data, [
					'adjustedUnitPrice',
					'originalUnitPrice',
					'handlingFee',
					'giftWrapCharge',
					'qty',
					'backOrderQty',
					'orderId'
				]);
				const { id } = await Order.create(orderDetails, { transaction: t });
				paymentDetails.orderId = id
				shippingDetails.orderId = id
				billingDetails.orderId = id
				orderItemDetails.orderId = id
				await PaymentDetail.create(paymentDetails, { transaction: t });
				await BillingDetail.create(billingDetails, { transaction: t });
				await ShippingDetail.create(shippingDetails, { transaction: t });
				await ShippingDetail.create(shippingDetails, { transaction: t });
				await OrderItem.create(orderItemDetails, { transaction: t });
				console.log(id)
				}	// End for 

			// t.commit();
			// // //  Move file to uploded folder after successfully imported 
			// moveFile(oldPath, newPath)
			return res.status(201).send('Order Imported Successfully');
		} catch (err) {
				console.log(err, "------------------------------------------------------err")
				// t.rollback();
				return res.status(500).send('Something Went Wrong');

		}	

	})

}
const ImportFromExternalLink = async(req, res) => {
	const Link = req.query.link
	var parsed = url.parse(Link);
	if (parsed.protocol in ['https:', 'http:']){
		const fileName  = path.basename(parsed.pathname)
		if (path.parse(fileName).ext in ['.csv', '.xlsx', '.XLSX']){
			const file = fs.createWriteStream(fileName);
			const request = https.get(Link, function(response) {
				response.pipe(file);
				fs.rename("./"+fileName, uploads+"/"+fileName,function (err) {
					if (err) {
						console.log(err, "----------error")
					}
				})
				const filePath = uploads+"/"+fileName
				const newPath = uploaded+"/"+fileName
				//  Upload Order 
				readfile(filePath).then(async(order) =>{
					const t =await sequelize.transaction();
					try {
						for (data of order) {
							const orderDetails = _.pick(data, [
								'customerId',
								'orderSource',
								'orderSourceOrderId',
								'isRushOrder',
								'packageType',
								'deliveryDate',
								'locationNotes',
								'eBaySalesRecordNumber',
								'serialNumber',
								'trackingNumber',
								'disputeStartedOn',
								'isInDispute',
								'siteCode',
								'googleOrderNumber',
								'customerServiceStatus',
								'invoicePrinted',
								'invoicePrintedDate',
								'status',
								'timeOfOrder'
							]);
							const paymentDetails = _.pick(data, [
								'paymentStatus',
								'payementDate',
								'paymentReferenceNumber',
								'paymentMethod',
								'orderCurrency',
								'orderDiscountsTotal',
								'insuranceTotal',
								'subTotal',
								'grandTotal',
								'taxRate',
								'taxTotal',
								'lineTotal',
								'finalValueTotal',
								'postingFeeTotal',
								'payPalFeeTotal',
								'orderSourceTotal',
								'orderId'
							]);
							const shippingDetails = _.pick(data, [
								'shippingTotal',
								'shippingDiscountsTotal',
								'dropShipFeeTotal',
								'shippingDate',
								'shipFirstName',
								'shippingLastName',
								'shipCompanyName',
								'shipAddress1',
								'shipAddress2',
								'shipCity',
								'shipState',
								'shipZipCode',
								'shipCountry',
								'shipPhoneNumber',
								'shippingMethodSelected',
								'companyId',
								'shippingCarrier',
								'shippedBy',
								'shipFromWarehouse',
								'shippingFee',
								'originalShippingCost',
								'adjustedShippingCost',
								'shippingWeightTotalOz',
								'shippingStatus',
								'stationId',
								'orderId'
							]);
							const billingDetails = _.pick(data, [
								'billingTotal',
								'billingDiscountsTotal',
								'billingDate',
								'billingFirstName',
								'billingLastName',
								'billingCompanyName',
								'billingAddress1',
								'billingAddress2',
								'billingCity',
								'billingState',
								'billingZipCode',
								'billingCountry',
								'billingPhoneNumber',
								'billingMethodSelected'
							]);
							const orderItemDetails = _.pick(data, [
								'adjustedUnitPrice',
								'originalUnitPrice',
								'handlingFee',
								'giftWrapCharge',
								'qty',
								'backOrderQty',
								'orderId'
							]);
							const { id } = await Order.create(orderDetails, { transaction: t });
							paymentDetails.orderId = id
							shippingDetails.orderId = id
							billingDetails.orderId = id
							orderItemDetails.orderId = id
							await PaymentDetail.create(paymentDetails, { transaction: t });
							await BillingDetail.create(billingDetails, { transaction: t });
							await ShippingDetail.create(shippingDetails, { transaction: t });
							await ShippingDetail.create(shippingDetails, { transaction: t });
							await OrderItem.create(orderItemDetails, { transaction: t });
							console.log(id)
							}	// End for 

						t.commit();
						// // //  Move file to uploded folder after successfully imported 
						fs.rename(filePath, newPath,function (err) {
							if (err) {
								console.log(err, "----------error")
							}
						})
						return res.status(201).send('Order Imported Successfully');
					} catch (err) {
							console.log(err, "------------------------------------------------------err")
							t.rollback();
							return res.status(500).send('Something Went Wrong');
					}	

				})
			});

		}else{
			
			return res.status(200).send('Invalid file Data .');
		}
	}else{
		return res.status(200).send('Protocol must be https:');
	}
	
}

const OrderFileList = async(req, res)=>{
    fs.readdir(uploads,(err, files) => {
        return res.status(200).json({ files, uploads }) 
    });
}

const DeleteFile = async(req, res)=>{
   
    const filepath = (uploads+"/"+req.query.name)
    fs.unlinkSync(filepath)
    return res.status(200).send('Deleted Successfully.');

}

const SaveFile = async(req,res)=>{
    const newPath = (uploads+"/"+req.file.originalname)
	const oldPath = (uploads+"/"+req.file.filename)
    fs.rename(oldPath, newPath,function (err) {
        if (err) {
            console.log(err, "----------error")
        }
    })

    return res.status(201).send('Add Successfully.')
}
const ImportOrderfile = async(req, res)=>{
	try {

		const filePath = (uploads+"/"+req.file.originalname)
		const rawPath = (uploads+"/"+req.file.filename)
		const newPath = (uploaded+"/"+req.file.originalname)
    	fs.rename(rawPath, filePath,function (err) {
    	    if (err) {
    	        console.log(err, "----------error")
    	    }
    	})
		readfile(filePath).then(async(order) =>{
			const t =await sequelize.transaction();

				for (data of order) {
					const orderDetails = _.pick(data, [
						'customerId',
						'orderSource',
						'orderSourceOrderId',
						'isRushOrder',
						'packageType',
						'deliveryDate',
						'locationNotes',
						'eBaySalesRecordNumber',
						'serialNumber',
						'trackingNumber',
						'disputeStartedOn',
						'isInDispute',
						'siteCode',
						'googleOrderNumber',
						'customerServiceStatus',
						'invoicePrinted',
						'invoicePrintedDate',
						'status',
						'timeOfOrder'
					]);
					const paymentDetails = _.pick(data, [
						'paymentStatus',
						'payementDate',
						'paymentReferenceNumber',
						'paymentMethod',
						'orderCurrency',
						'orderDiscountsTotal',
						'insuranceTotal',
						'subTotal',
						'grandTotal',
						'taxRate',
						'taxTotal',
						'lineTotal',
						'finalValueTotal',
						'postingFeeTotal',
						'payPalFeeTotal',
						'orderSourceTotal',
						'orderId'
					]);
					const shippingDetails = _.pick(data, [
						'shippingTotal',
						'shippingDiscountsTotal',
						'dropShipFeeTotal',
						'shippingDate',
						'shipFirstName',
						'shippingLastName',
						'shipCompanyName',
						'shipAddress1',
						'shipAddress2',
						'shipCity',
						'shipState',
						'shipZipCode',
						'shipCountry',
						'shipPhoneNumber',
						'shippingMethodSelected',
						'companyId',
						'shippingCarrier',
						'shippedBy',
						'shipFromWarehouse',
						'shippingFee',
						'originalShippingCost',
						'adjustedShippingCost',
						'shippingWeightTotalOz',
						'shippingStatus',
						'stationId',
						'orderId'
					]);
					const billingDetails = _.pick(data, [
						'billingTotal',
						'billingDiscountsTotal',
						'billingDate',
						'billingFirstName',
						'billingLastName',
						'billingCompanyName',
						'billingAddress1',
						'billingAddress2',
						'billingCity',
						'billingState',
						'billingZipCode',
						'billingCountry',
						'billingPhoneNumber',
						'billingMethodSelected'
					]);
					const orderItemDetails = _.pick(data, [
						'adjustedUnitPrice',
						'originalUnitPrice',
						'handlingFee',
						'giftWrapCharge',
						'qty',
						'backOrderQty',
						'orderId'
					]);
					const { id } = await Order.create(orderDetails, { transaction: t });
					paymentDetails.orderId = id
					shippingDetails.orderId = id
					billingDetails.orderId = id
					orderItemDetails.orderId = id
					await PaymentDetail.create(paymentDetails, { transaction: t });
					await BillingDetail.create(billingDetails, { transaction: t });
					await ShippingDetail.create(shippingDetails, { transaction: t });
					await ShippingDetail.create(shippingDetails, { transaction: t });
					await OrderItem.create(orderItemDetails, { transaction: t });
					console.log(id)
					}	// End for 

				// t.commit();
				// //  Move file to uploded folder after successfully imported
				fs.rename(filePath, newPath,function (err) {
					if (err) {
						console.log(err, "----------error")
					}
				}) 
					
				return res.status(201).send('Order Imported Successfully');
			})
		}	catch (err) {
			console.log(err, "------------------------------------------------------err")
			// t.rollback();
			return res.status(500).send('Something Went Wrong');
		}		
}
module.exports = {
    Ordersync : Ordersync,
    OrderFileList: OrderFileList,
    DeleteFile:DeleteFile,
    SaveFile:SaveFile,
	ImportOrder:ImportOrder,
	ImportFromExternalLink:ImportFromExternalLink,
	ImportOrderfile:ImportOrderfile
}
