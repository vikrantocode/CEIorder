const fs = require('fs');
const csv = require('csvtojson');
const _ = require('lodash-contrib');
const { Op, or } = require('sequelize');
const sequelize = require('../../config/database');
const Order = require('../../models/Order');
const UPC = require('../../models/UPC');
const BasicProductDetail = require('../../models/BasicProductDetail');
const OrderItem = require('../../models/OrderItem');
const PaymentDetail = require('../../models/PaymentDetail');
const ShippingDetail = require('../../models/ShippingDetail');
const BillingDetail = require('../../models/BillingDetail');
const PriceAndCost = require('../../models/PriceAndCost');

const createOrder = async (req, res) => {
	const t = await sequelize.transaction();
	try {
		const { id } = await Order.create(req.body, { transaction: t });
		req.body.orderId = id;
		await PaymentDetail.create(req.body, { transaction: t });
		await BillingDetail.create(req.body, { transaction: t });
		await ShippingDetail.create(req.body, { transaction: t });
		for (let orderItem of req.body.orderItems) {
			orderItem.basicProductDetailId = orderItem.value;
			orderItem.adjustedUnitPrice = orderItem.listPrice;
			orderItem.originalUnitPrice = orderItem.listPrice;
			orderItem.orderId = id;
			await OrderItem.create(orderItem, { transaction: t });
		}
		await t.commit();
		return res.status(200).json('Order Created Successfully.');
	} catch (err) {
		await t.rollback();
		console.log(err);
		return res.status(500).send(`Something Went Wrong!!!`);
	}
};

const getOrders = async (req, res) => {
	const pageSize = req.query.pageSize || 15;
	const page = req.params.page || 1;
	const orderBy = req.query.orderBy || 'id';
	const orderManner = req.query.orderManner || 'ASC';
	const searchItem = req.query.searchItem || '';
	try {
		const orders = await Order.findAll({
			where: or(
				{
					status: {
						[Op.iLike]: `%${searchItem}%`
					}
				},
				{
					orderSource: {
						[Op.iLike]: `%${searchItem}%`
					}
				},
				{
					orderSourceOrderId: {
						[Op.iLike]: `%${searchItem}%`
					}
				},
				sequelize.where(sequelize.cast(sequelize.col('orders.id'), 'varchar'), {
					[Op.iLike]: `%${searchItem}%`
				})
			),
			order: [[`${orderBy}`, `${orderManner}`]],
			limit: pageSize,
			offset: (page - 1) * pageSize
		});
		const count = await Order.count({
			where: or(
				{
					status: {
						[Op.iLike]: `%${searchItem}%`
					}
				},
				{
					orderSource: {
						[Op.iLike]: `%${searchItem}%`
					}
				},
				{
					orderSourceOrderId: {
						[Op.iLike]: `%${searchItem}%`
					}
				},
				sequelize.where(sequelize.cast(sequelize.col('orders.id'), 'varchar'), {
					[Op.iLike]: `%${searchItem}%`
				})
			)
		});
		return res.status(200).json({ orders, count });
	} catch (err) {
		console.log(err);
		return res.status(500).send(`Something Went Wrong!!!`);
	}
};

const getOrder = async (req, res) => {
	const { id } = req.params;
	try {
		const order = await Order.findOne({
			where: { id },
			include: [
				{
					model: PaymentDetail
				},
				{
					model: BillingDetail
				},
				{
					model: ShippingDetail
				},
				{
					model: OrderItem
				}
			]
		});
		const data = _.pick(order, [
			'id',
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
			'timeOfOrder',
			'createdAt',
			'updatedAt',
			'customerId',
			'paymentDetail',
			'shippingDetail',
			'orderItems',
			'billingDetail'
		]);
		const products = [];
		for (let orderItem of order.orderItems) {
			const product = await BasicProductDetail.findOne({
				attributes: ['id', 'itemNumber', 'description25Char'],
				include: [
					{
						model: PriceAndCost,
						attributes: ['unitOfMeasure', 'listPrice', 'costColumn1Price'],
						required: false
					},
					{
						model: UPC,
						attributes: ['UPCRetail'],
						required: false
					}
				],
				where: { id: orderItem.basicProductDetailId }
			});
			const tempOrderItem = {};
			tempOrderItem.orderItemId = orderItem.id;
			tempOrderItem.itemNumber = product.itemNumber;
			tempOrderItem.description25Char = product.description25Char;
			tempOrderItem.costColumn1Price = product.pricesAndCost.costColumn1Price;
			tempOrderItem.listPrice = orderItem.adjustedUnitPrice;
			tempOrderItem.UPCRetail = product.upc.UPCRetail;
			tempOrderItem.value = product.id;
			tempOrderItem.qty = orderItem.qty;
			products.push(tempOrderItem);
		}
		data.products = products;
		if (!order)
			return res
				.status(404)
				.send(`There is No Order Associated with Provided Id.`);
		return res.status(200).json(data);
	} catch (err) {
		console.log(err);
		return res.status(500).send(`Something Went Wrong!!!`);
	}
};

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

//? API Handler to Import Orders from CSV File. (**importOrders**)
// const importOrders = async (req, res) => {
// 	const jsonOrders = await csv().fromFile(req.file.path);
// 	const orders = renameToDesiredFormat(jsonOrders)
// 	fs.unlink(req.file.path, async () => {
// 		const t = await sequelize.transaction();
// 		try {
// 			for (order of orders) {
// 				const postItemNumber = order.ProductID.substr(
// 					order.ProductID.indexOf('-') + 1
// 				);
// 				const itemNumber = postItemNumber.substr(
// 					0,
// 					postItemNumber.indexOf('-')
// 				);
// 				const res = await BasicProductDetail.findOne({
// 					attributes: ['id'],
// 					where: {
// 						itemNumber: {
// 							[Op.iLike]: `%${itemNumber}%`
// 						}
// 					},
// 					order: [['id', 'ASC']]
// 				});
// 				const isOrderExist = await Order.count({
// 					where: { id: order.orderId }
// 				});
// 				if (!isOrderExist) {
// 					const orderDetails = _.pick(order, [
// 						'customerId',
// 						'orderSource',
// 						'orderSourceOrderId',
// 						'isRushOrder',
// 						'packageType',
// 						'deliveryDate',
// 						'locationNotes',
// 						'eBaySalesRecordNumber',
// 						'serialNumber',
// 						'trackingNumber',
// 						'disputeStartedOn',
// 						'isInDispute',
// 						'siteCode',
// 						'googleOrderNumber',
// 						'customerServiceStatus',
// 						'invoicePrinted',
// 						'invoicePrintedDate',
// 						'status',
// 						'timeOfOrder'
// 					]);
// 					const paymentDetails = _.pick(order, [
// 						'paymentStatus',
// 						'payementDate',
// 						'paymentReferenceNumber',
// 						'paymentMethod',
// 						'orderCurrency',
// 						'orderDiscountsTotal',
// 						'insuranceTotal',
// 						'subTotal',
// 						'grandTotal',
// 						'taxRate',
// 						'taxTotal',
// 						'lineTotal',
// 						'finalValueTotal',
// 						'postingFeeTotal',
// 						'payPalFeeTotal',
// 						'orderSourceTotal',
// 						'orderId'
// 					]);
// 					const shippingDetails = _.pick(order, [
// 						'shippingTotal',
// 						'shippingDiscountsTotal',
// 						'dropShipFeeTotal',
// 						'shippingDate',
// 						'shipFirstName',
// 						'shippingLastName',
// 						'shipCompanyName',
// 						'shipAddress1',
// 						'shipAddress2',
// 						'shipCity',
// 						'shipState',
// 						'shipZipCode',
// 						'shipCountry',
// 						'shipPhoneNumber',
// 						'shippingMethodSelected',
// 						'companyId',
// 						'shippingCarrier',
// 						'shippedBy',
// 						'shipFromWarehouse',
// 						'shippingFee',
// 						'originalShippingCost',
// 						'adjustedShippingCost',
// 						'shippingWeightTotalOz',
// 						'shippingStatus',
// 						'stationId',
// 						'orderId'
// 					]);
// 					const billingDetails = _.pick(order, [
// 						'billingTotal',
// 						'billingDiscountsTotal',
// 						'billingDate',
// 						'billingFirstName',
// 						'billingLastName',
// 						'billingCompanyName',
// 						'billingAddress1',
// 						'billingAddress2',
// 						'billingCity',
// 						'billingState',
// 						'billingZipCode',
// 						'billingCountry',
// 						'billingPhoneNumber',
// 						'billingMethodSelected',
// 						'orderId',
// 					]);
// 					const orderItemDetails = _.pick(order, [
// 						'adjustedUnitPrice',
// 						'originalUnitPrice',
// 						'handlingFee',
// 						'giftWrapCharge',
// 						'qty',
// 						'backOrderQty',
// 						'orderId'
// 					]);
// 					orderDetails.id = order.orderId;
// 					await Order.create(orderDetails, { transaction: t });
// 					await PaymentDetail.create(paymentDetails, { transaction: t });
// 					await ShippingDetail.create(shippingDetails, { transaction: t });
// 					await BillingDetail.create(billingDetails, { transaction: t });
// 				}
// 				console.log(res);
// 				if (res === null) continue;
// 				const isOrderItemExist = await OrderItem.count({
// 					where: { id: order.orderItemId }
// 				});
// 				if (isOrderItemExist) continue;
// 				const orderItemDetails = _.pick(order, [
// 					'adjustedUnitPrice',
// 					'originalUnitPrice',
// 					'handlingFee',
// 					'giftWrapCharge',
// 					'backOrderQty',
// 					'qty',
// 					'orderId'
// 				]);
// 				orderItemDetails.id = order.orderItemId;
// 				orderItemDetails.basicProductDetailId = res.id;
// 				await OrderItem.create(orderItemDetails, { transaction: t });
// 			}
// 			await t.commit();
// 			return res.status(201).send('Order Imported Successfully');
// 		} catch (error) {
// 			console.log(error);
// 			await t.rollback();
// 			return res.status(500).json({ error: error, data: orders });
// 		}
// 	});
	
// };

const importOrders = async (req, res) => {
	const jsonOrders = await csv().fromFile(req.file.path);
	const orders = renameToDesiredFormat(jsonOrders)
	fs.unlink(req.file.path, async () => {
		const t = await sequelize.transaction();
		try {
			let previousOrderId = null
			let previouscustomerId = null
			for (order of orders) {
			if (!previouscustomerId && previouscustomerId!=order.customerId){
				const orderDetails = _.pick(order, [
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
					'timeOfOrder',
					'finalSale',
				]);
				const paymentDetails = _.pick(order, [
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
				const shippingDetails = _.pick(order, [
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
				const billingDetails = _.pick(order, [
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
					'billingMethodSelected',
					'orderId',
				]);
				const orderItemDetails = _.pick(order, [
					'adjustedUnitPrice',
					'originalUnitPrice',
					'handlingFee',
					'giftWrapCharge',
					'qty',
					'backOrderQty',
					'basicProductDetailId',
					'orderId'
				]);
				const { id } = await Order.create(orderDetails, { transaction: t });
				paymentDetails.orderId = id;
				shippingDetails.orderId = id;
				billingDetails.orderId = id;
				orderItemDetails.orderId = id;
				await PaymentDetail.create(paymentDetails, { transaction: t });
				await BillingDetail.create(billingDetails, { transaction: t });
				await ShippingDetail.create(shippingDetails, { transaction: t });
				await OrderItem.create(orderItemDetails, { transaction: t });
				previousOrderId = id
				previouscustomerId = orderDetails.customerId
			} else{
				const orderItemDetails = _.pick(order, [
					'adjustedUnitPrice',
					'originalUnitPrice',
					'handlingFee',
					'giftWrapCharge',
					'qty',
					'backOrderQty',
					'basicProductDetailId',
					'orderId'
				]);
				orderItemDetails.orderId = previousOrderId;
				await OrderItem.create(orderItemDetails, { transaction: t });
			}
				}
			await t.commit();
			return res.status(201).send('Order Imported Successfully');
		}catch (error) {
			console.log(error);
			await t.rollback();
			return res.status(500).json({ error: error, data: orders });
		}
	});
	
};

const sub = (x, y) => {
	myArray = x.filter(function (el) {
		return y.indexOf(el) < 0;
	});
	return myArray;
};

const updateOrder = async (req, res) => {
	const id = parseInt(req.params.id);
	console.log(req.body);
	const t = await sequelize.transaction();
	try {
		await Order.update(req.body, {
			where: { id },
			transaction: t
		});
		await PaymentDetail.update(req.body, {
			where: { orderId: id },
			transaction: t
		});
		await ShippingDetail.update(req.body, {
			where: { orderId: id },
			transaction: t
		});
		await BillingDetail.update(req.body, {
			where: { orderId: id },
			transaction: t
		});
		if (req.body.orderItems.length > 0) {
			let newOrderItemIds = req.body.orderItems
				.filter((item) => item.orderItemId)
				.map((item) => item.orderItemId);
			console.log('new' + newOrderItemIds);
			const ids = await OrderItem.findAll({
				attributes: ['id'],
				where: { orderId: req.params.id }
			});
			console.log('old' + ids);
			let oldOrderItemIds = ids.map((item) => item.id);
			let deleteOrderItems = sub(oldOrderItemIds, newOrderItemIds);
			deleteOrderItems.forEach(async (id) => {
				await OrderItem.destroy({
					where: {
						id
					},
					transaction: t
				});
			});
			console.log('delete', deleteOrderItems);
			for (let orderItem of req.body.orderItems) {
				orderItem.orderId = req.params.id;
				orderItem.originalUnitPrice = orderItem.listPrice;
				orderItem.adjustedUnitPrice = orderItem.listPrice;
				orderItem.basicProductDetailId = orderItem.value;
				if (orderItem.orderItemId) {
					await OrderItem.update(orderItem, {
						where: { id: orderItem.orderItemId },
						transaction: t
					});
				} else {
					await OrderItem.create(orderItem, {
						transaction: t
					});
				}
			}
		}
		await t.commit();
		return res.status(200).json('Order Updated Successfully.');
	} catch (err) {
		await t.rollback();
		console.log(err);
		return res.status(500).send(`Something Went Wrong!!!`);
	}
};

const deleteOrder = async (req, res) => {
	const t = await sequelize.transaction();
	try {
		if (typeof req.query.id == 'string') {
			await Order.destroy({
				where: { id: parseInt(req.query.id) },
				transaction: t
			});
			await PaymentDetail.destroy({
				where: { orderId: parseInt(req.query.id) },
				transaction: t
			});
			await ShippingDetail.destroy({
				where: { orderId: parseInt(req.query.id) },
				transaction: t
			});
			await OrderItem.destroy({
				where: { orderId: parseInt(req.query.id) },
				transaction: t
			});
		} else if (typeof req.query.id == 'object') {
			for (let id of req.query.id) {
				await Order.destroy({
					where: { id: id },
					transaction: t
				});
				await PaymentDetail.destroy({
					where: { orderId: id },
					transaction: t
				});
				await ShippingDetail.destroy({
					where: { orderId: id },
					transaction: t
				});
				await OrderItem.destroy({
					where: { orderId: id },
					transaction: t
				});
			}
		}
		await t.commit();
		return res.status(200).send('Deleted Successfully.');
	} catch (error) {
		await t.rollback();
		console.log(error);
		return res.status(500).send('Something Went Wrong!!!');
	}
};

const duplicateOrder = async (req, res) => {
	const order = await Order.findOne({
		include: [
			{
				model: PaymentDetail,
				attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
			},
			{
				model: ShippingDetail,
				attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
			},
			{
				model: BillingDetail,
				attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
			},
			{
				model: OrderItem,
				attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'orderId'] }
			}
		],
		where: { id: req.params.id }
	});
	let orderData = _.pick(order, [
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
	let paymentData = _.pick(order, ['paymentDetail']).paymentDetail;
	let shippingData = _.pick(order, ['shippingDetail']).shippingDetail;
	let billingData = _.pick(order, ['billingDetail']).billingDetail;
	let orderItems = _.pick(order, ['orderItems']).orderItems;
	const t = await sequelize.transaction();
	let orderId;
	try {
		const { id } = await Order.create(orderData, { transaction: t });
		paymentData = { ...paymentData, orderId: id };
		shippingData = { ...shippingData, orderId: id };
		billingData = { ...billingData, orderId: id };
		await PaymentDetail.create(paymentData, { transaction: t });
		await ShippingDetail.create(shippingData, { transaction: t });
		await BillingDetail.create(billingData, { transaction: t });
		orderId = id;
		for (let orderItem of orderItems) {
			const orderItemData = {};
			orderItemData.adjustedUnitPrice = orderItem.adjustedUnitPrice;
			orderItemData.originalUnitPrice = orderItem.originalUnitPrice;
			orderItemData.handlingFee = orderItem.handlingFee;
			orderItemData.giftWrapCharge = orderItem.giftWrapCharge;
			orderItemData.backOrderQty = orderItem.backOrderQty;
			orderItemData.qty = orderItem.qty;
			orderItemData.basicProductDetailId = orderItem.basicProductDetailId;
			orderItemData.orderId = id;
			await OrderItem.create(orderItemData, { transaction: t });
		}
		await t.commit();
		return res.status(200).json({ id: orderId });
	} catch (err) {
		await t.rollback();
		console.log(err);
		return res.status(500).send(`Something Went Wrong!!!`);
	}
};

const splitOrder = async (req, res) => {
	const orderId = req.params.id;
	const order = await Order.findOne({
		where: { id: orderId },
		attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
		include: [
			{
				model: PaymentDetail,
				attributes: {
					exclude: [
						'id',
						'grandTotal',
						'subTotal',
						'taxTotal',
						'createdAt',
						'updatedAt',
						'orderId'
					]
				}
			},
			{
				model: ShippingDetail,
				attributes: {
					exclude: ['id', 'shippingTotal', 'createdAt', 'updatedAt', 'orderId']
				}
			},
			{
				model: BillingDetail,
				attributes: {
					exclude: ['id', 'createdAt', 'updatedAt', 'orderId']
				}
			}
		]
	});
	let orderData = _.pick(order, [
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
	const paymentDetails = _.pick(order.paymentDetail, [
		'paymentStatus',
		'payementDate',
		'paymentReferenceNumber',
		'paymentMethod',
		'orderCurrency',
		'orderDiscountsTotal',
		'insuranceTotal',
		'taxRate',
		'lineTotal',
		'finalValueTotal',
		'postingFeeTotal',
		'payPalFeeTotal',
		'orderSourceTotal'
	]);
	const shippingDetails = _.pick(order.shippingDetail, [
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
		'stationId'
	]);
	const billingDetails = _.pick(order.billingDetail, [
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
	const { id } = await Order.create(orderData);
	shippingDetails.orderId = id;
	shippingDetails.shippingTotal = req.body.newOrder.shipCost;
	billingDetails.orderId = id;
	paymentDetails.orderId = id;
	paymentDetails.grandTotal = req.body.newOrder.total;
	paymentDetails.subTotal = req.body.newOrder.subTotal;
	paymentDetails.taxTotal = req.body.newOrder.totalTax;
	await ShippingDetail.create(shippingDetails);
	await BillingDetail.create(billingDetails);
	await PaymentDetail.create(paymentDetails);
	for (let item of req.body.items) {
		await OrderItem.update(
			{ orderId: id },
			{ where: { id: item.orderItemId } }
		);
	}
	await Order.update(req.body.oldOrder, { where: { id: orderId } });
	return res.status(200).send('Order Splitted Successfully.');
};

const replaceOrder = async (req, res) => {
	const orderId = req.params.id;
	const order = await Order.findOne({
		where: { id: orderId },
		attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
		include: [
			{
				model: PaymentDetail,
				attributes: {
					exclude: [
						'id',
						'grandTotal',
						'subTotal',
						'taxTotal',
						'createdAt',
						'updatedAt',
						'orderId'
					]
				}
			},
			{
				model: ShippingDetail,
				attributes: {
					exclude: ['id', 'shippingTotal', 'createdAt', 'updatedAt', 'orderId']
				}
			},
			{
				model: BillingDetail,
				attributes: {
					exclude: ['id', 'createdAt', 'updatedAt', 'orderId']
				}
			}
		]
	});
	let orderData = _.pick(order, [
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
	const paymentDetails = _.pick(order.paymentDetail, [
		'paymentStatus',
		'payementDate',
		'paymentReferenceNumber',
		'paymentMethod',
		'orderCurrency',
		'orderDiscountsTotal',
		'insuranceTotal',
		'taxRate',
		'lineTotal',
		'finalValueTotal',
		'postingFeeTotal',
		'payPalFeeTotal',
		'orderSourceTotal'
	]);
	const shippingDetails = _.pick(order.shippingDetail, [
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
		'stationId'
	]);
	const billingDetails = _.pick(order.billingDetail, [
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
	const t = await sequelize.transaction();
	try {
		const { id } = await Order.create(orderData);
		shippingDetails.orderId = id;
		shippingDetails.shippingTotal = req.body.shippingCost;
		billingDetails.orderId = id;
		paymentDetails.orderId = id;
		paymentDetails.grandTotal = req.body.grandTotal;
		paymentDetails.subTotal = req.body.subtotal;
		paymentDetails.taxTotal = req.body.taxTotal;
		await ShippingDetail.create(shippingDetails, { transaction: t });
		await BillingDetail.create(billingDetails, { transaction: t });
		await PaymentDetail.create(paymentDetails, { transaction: t });
		for (let orderItem of req.body.orderItems) {
			orderItem.basicProductDetailId = orderItem.value;
			orderItem.adjustedUnitPrice = orderItem.listPrice;
			orderItem.originalUnitPrice = orderItem.listPrice;
			orderItem.orderId = id;
			await OrderItem.create(orderItem, { transaction: t });
		}
		await ShippingDetail.update(
			{ shippingStatus: 'Replaced' },
			{ where: { orderId }, transaction: t }
		);
		await t.commit();
		return res
			.status(200)
			.json({ message: 'Order Replaced Successfully', id: id });
	} catch (err) {
		console.log(err);
		await t.rollback();
		return res.status(500).send(`Something Went Wrong!!!`);
	}
};

module.exports = {
	importOrders: importOrders,
	getOrders: getOrders,
	getOrder: getOrder,
	createOrder: createOrder,
	updateOrder: updateOrder,
	deleteOrder: deleteOrder,
	duplicateOrder: duplicateOrder,
	splitOrder: splitOrder,
	replaceOrder: replaceOrder
};
