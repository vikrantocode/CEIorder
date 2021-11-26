const { Op, or, QueryTypes } = require('sequelize');
const mapToDesiredArray = require('./ProductHelper');
const AdditionalProductDetail = require('../../models/AdditionalProductDetail');
const BasicProductDetail = require('../../models/BasicProductDetail');
const Catalog = require('../../models/Catalog');
const ImageDetail = require('../../models/ImageDetail');
const Manufacturer = require('../../models/Manufacturer');
const Measurement = require('../../models/Measurement');
const PriceAndCost = require('../../models/PriceAndCost');
const ProductClass = require('../../models/ProductClass');
const Selling = require('../../models/Selling');
const UPC = require('../../models/UPC');
const Usage = require('../../models/Usage');
const SubVendor = require('../../models/SubVendor');
const sequelize = require('../../config/database');
const csv = require('csvtojson');
const fs = require('fs');
const Categories = require('../../models/Categories');
const Brand = require('../../models/Brand');
const { VendorProducts } = require('../../models/Vendor');
const { Vendor } = require('../../models/Vendor');
const { isArray, isFunction } = require('lodash-contrib');
const _ = require('lodash-contrib');
const dhCategoryMapper = require('../mappers/dhCategoryMapper.json');
const globalMapper = require('../mappers/globalMapper.json');
const krollMapper = require('../mappers/krollMapper.json');
const {
	uploadImages,
	deleteImages,
	uploadImage,
	uploadProductImages
} = require('../AWS/aws.helper');
const download = require('../helperMethods/download.method');
const { normalizeKrollProducts } = require('../helperMethods/krollConverter');
const Variant = require('../../models/Variants');
const ProductVariant = require('../../models/ProductVariant');
const dhMapper = require('../mappers/dhMapper.json');
const krollCategory = require('../mappers/krollCategoryMapper.json');
const ProductGroup = require('../../models/ProductGroup');
const hoshizakiMapper = require('../mappers/hoshizakiMapper.json');
const elkayMapper = require('../mappers/elkayMapper.json');
const globalCategoryMapper = require('../mappers/globalCategoryMapper.json');
const hoshizakiCategoryMapper = require('../mappers/hoshizakiCategoryMapper.json');
const elkayCategoryMapper = require('../mappers/elkayCategoryMapper.json');
const ProductImageBaseUrl = 'http://cdn.linqusacorp.com/productimages/';
const ProductResource = require('../../models/ProductResource');
const ExtraProductDetail = require('../../models/ExtraProductDetail');
const bestartMapper = require('../mappers/bestartMapper.json');
const dewaltCategoryMapper = require('../mappers/dewaltCategoryMapper.json');

// ADDING NEW PRODUCT
const newProduct = async (req, res) => {
	console.log(req.body);
	const data = req.body;
	if (isArray(data)) {
		const t = await sequelize.transaction();
		try {
			let productIds = [];
			for (let tempproduct of data) {
				const isExist = await BasicProductDetail.count({
					where: { itemNumber: tempproduct.itemNumber }
				});
				if (!isExist) {
					tempproduct.keywords = [];
					const product = await BasicProductDetail.create(tempproduct, {
						transaction: t
					});
					tempproduct.basicProductDetailId = product.id;
					productIds.push(product.id);
					await AdditionalProductDetail.create(tempproduct, { transaction: t });
					await Catalog.create(tempproduct, { transaction: t });
					await ImageDetail.create(tempproduct, { transaction: t });
					await Manufacturer.create(tempproduct, { transaction: t });
					await Measurement.create(tempproduct, { transaction: t });
					await PriceAndCost.create(tempproduct, { transaction: t });
					await ProductClass.create(tempproduct, { transaction: t });
					await Selling.create(tempproduct, { transaction: t });
					await UPC.create(tempproduct, { transaction: t });
					await Usage.create(tempproduct, { transaction: t });
				}
			}
			await t.commit();
			const dateTime = new Date().toLocaleString('en-US', {
				timeZone: 'Asia/Kolkata'
			});
			req.io.emit('cei updates', {
				message: 'Product(s) Added',
				data: productIds,
				dateTime
			});
			res.json({
				success: 'Products Added!'
			});
		} catch (err) {
			await t.rollback();
			console.log(err);
			res.status(400).json({
				error: 'Something Went Wrong!'
			});
		}
	} else {
		req.body.keywords = [];
		const t = await sequelize.transaction();
		try {
			const isExist = await BasicProductDetail.count({
				where: { itemNumber: req.body.itemNumber }
			});
			let productId;
			if (!isExist) {
				const product = await BasicProductDetail.create(req.body, {
					transaction: t
				});
				req.body.basicProductDetailId = product.id;
				productId = product.id;
				await AdditionalProductDetail.create(req.body, { transaction: t });
				await Catalog.create(req.body, { transaction: t });
				await ImageDetail.create(req.body, { transaction: t });
				await Manufacturer.create(req.body, { transaction: t });
				await Measurement.create(req.body, { transaction: t });
				await PriceAndCost.create(req.body, { transaction: t });
				await ProductClass.create(req.body, { transaction: t });
				await Selling.create(req.body, { transaction: t });
				await UPC.create(req.body, { transaction: t });
				await Usage.create(req.body, { transaction: t });
			}
			await t.commit();
			const dateTime = new Date().toLocaleString('en-US', {
				timeZone: 'Asia/Kolkata'
			});
			req.io.emit('cei updates', {
				message: 'Product Added',
				data: productId,
				dateTime
			});
			res.json({
				success: 'Product Added!'
			});
		} catch (err) {
			await t.rollback();
			console.log(err);
			res.status(400).json({
				error: 'Something Went Wrong!'
			});
		}
	}
};

// Import Products API Handler
const importProducts = async (req, res) => {
	const jsonProducts = await csv().fromFile(req.file.path);
	const products = mapToDesiredArray(jsonProducts, req.body.vendorId);
	fs.unlink(
		req.file.path,
		async () => {
			// return res.json(products)
			const t = await sequelize.transaction();
			try {
				let productIds = [];
				console.log(`Transaction Start!!!`);
				// Then, we do some calls passing this transaction as an option:
				for (let product of products) {
					const isExist = await BasicProductDetail.count({
						where: { itemNumber: product.itemNumber }
					});
					console.log('Item Number : ' + product.itemNumber);
					console.log('isExist : ' + isExist);
					if (!isExist) {
						const categories = await Categories.findAll({
							where: or(
								{
									category: {
										[Op.iLike]: product.productClassCat1Description
									}
								},
								{
									category: {
										[Op.iLike]: product.productClassCat2Description
									}
								},
								{
									category: {
										[Op.iLike]: product.productClassCat3Description
									}
								},
								{
									category: {
										[Op.iLike]: product.productClassCat4Description
									}
								}
							)
						});
						categories.map((category) => {
							product.productCategory.push(category.id);
						});
						let brand = {};
						if (
							!(
								product.brandShortName ||
								product.brandLongName ||
								product.imageNameBrandLogo
							)
						) {
							console.log(`No Brand Details Provided!!`);
							brand.id = null;
						} else {
							brand = await Brand.findOne({
								where: {
									brandShortName: product.brandShortName,
									brandLongName: product.brandLongName,
									imageNameBrandLogo: product.imageNameBrandLogo
								},
								transaction: t
							});
							if (!brand) {
								console.log(`Creating Brand!!!!`);
								brand = await Brand.create(
									{
										brandShortName: product.brandShortName,
										brandLongName: product.brandLongName,
										imageNameBrandLogo: product.imageNameBrandLogo
									},
									{ transaction: t }
								);
							}
						}
						let vendor = {};
						if (!product.vendorAbbreviation) {
							console.log(`No Vendor Details Provided!!`);
							vendor.id = null;
						} else {
							vendor = await SubVendor.findOne({
								where: {
									vendorAbbreviation: product.vendorAbbreviation,
									vendorShortName: product.vendorShortName,
									vendorPricerPrintName: product.vendorPricerPrintName
								},
								transaction: t
							});
							if (!vendor) {
								console.log(`Creating Vendor!!!!`);
								vendor = await SubVendor.create(
									{
										vendorAbbreviation: product.vendorAbbreviation,
										vendorShortName: product.vendorShortName,
										vendorPricerPrintName: product.vendorPricerPrintName
									},
									{ transaction: t }
								);
							}
							console.log(vendor.id);
						}
						product.brandId = brand.id;
						product.subVendorId = vendor.id;
						console.log(product);
						const { id } = await BasicProductDetail.create(product, {
							transaction: t
						});
						product.basicProductDetailId = id;
						productIds.push(id);
						await AdditionalProductDetail.create(product, { transaction: t });
						await Catalog.create(product, { transaction: t });
						await ImageDetail.create(product, { transaction: t });
						await Manufacturer.create(product, { transaction: t });
						await Measurement.create(product, { transaction: t });
						await PriceAndCost.create(product, { transaction: t });
						await ProductClass.create(product, { transaction: t });
						await Selling.create(product, { transaction: t });
						await UPC.create(product, { transaction: t });
						await Usage.create(product, { transaction: t });
						await VendorProducts.create(
							{ basicProductDetailId: id, vendorId: product.vendorId },
							{ transaction: t }
						);
					}
				}
				// If the execution reaches this line, no errors were thrown.
				// We commit the transaction.
				await t.commit();
				console.log(`Transaction Committed!!!`);
				console.log(`Vendor Alloted!!!`);
				const dateTime = new Date().toLocaleString('en-US', {
					timeZone: 'Asia/Kolkata'
				});
				req.io.emit('cei updates', {
					message: 'Product Imported',
					data: productIds,
					dateTime
				});
				return res
					.status(201)
					.json({ success: 'Products Successfully Added!' });
			} catch (error) {
				// If the execution reaches this line, an error was thrown.
				// We rollback the transaction.
				await t.rollback();
				console.log(`Transaction Aborted`);
				console.log(error);
				return res.status(400).json({ error: 'something went wrong!' });
			}
		},
		(err) => {
			console.log(err);
			return res.status(400).json({ error: err.message });
		}
	);
};

const getDetailedProducts = async (req, res) => {
	const page = req.params.page || 1;
	const perPage = req.query.pageSize || 15;
	const data = await BasicProductDetail.findAll({
		include: [
			{ model: AdditionalProductDetail },
			{ model: Catalog },
			{ model: ImageDetail },
			{ model: Manufacturer },
			{ model: Measurement },
			{ model: PriceAndCost },
			{ model: ProductClass },
			{ model: Selling },
			{ model: UPC },
			{ model: Usage }
		],
		limit: perPage,
		offset: (page - 1) * perPage,
		order: [['id', 'ASC']]
	});
	res.json({
		data: data
	});
};

const getProducts = async (req, res) => {
	var perPage = req.query.pagesize || 15;
	var page = req.params.page || 1;
	let count, products;
	let columnOrder = req.query.orderBy || 'id';
	let orderManner = req.query.orderManner || 'ASC';
	if (req.query.searchItem) {
		const searchItem = req.query.searchItem;
		if (columnOrder.split('.')[0] === 'priceAndCost') {
			products = await sequelize.query(
				`SELECT "basicProductDetails"."id", "basicProductDetails"."itemNumber", "basicProductDetails"."packQuantity", "basicProductDetails"."description25Char", "basicProductDetails"."brandId", "pricesAndCost"."id"
            AS "pricesAndCost.id", 
            "pricesAndCost"."unitOfMeasure" AS "pricesAndCost.unitOfMeasure", 
            "upcs"."UPCRetail" AS "upcs.UPCRetail", 
            "pricesAndCost"."listPrice" AS "pricesAndCost.listPrice", 
            "pricesAndCost"."costColumn1Price" AS "pricesAndCost.costColumn1Price", 
            "imageDetail"."id" AS "imageDetail.id", 
            "imageDetail"."imageNameItem" AS "imageDetail.imageNameItem", 
            "imageDetail"."imageNameProductLit" AS 
            "imageDetail.imageNameProductLit" FROM 
            "basicProductDetails" AS "basicProductDetails" 
            LEFT OUTER JOIN "pricesAndCosts" AS "pricesAndCost" 
            ON "basicProductDetails"."id" = "pricesAndCost"."basicProductDetailId" 
            LEFT OUTER JOIN "imageDetails" AS "imageDetail" 
            ON "basicProductDetails"."id" = "imageDetail"."basicProductDetailId" 
            LEFT OUTER JOIN "upcs" AS "upcs" 
            ON "basicProductDetails"."id" = "upcs"."basicProductDetailId"
            WHERE ("basicProductDetails"."description25Char" ILIKE '%${searchItem}%' OR "basicProductDetails"."itemNumber" ILIKE '%${searchItem}%')
            ORDER BY "pricesAndCost"."${
							columnOrder.split('.')[1]
						}" ${orderManner} LIMIT ${perPage} OFFSET ${(page - 1) * perPage};`,
				{ type: QueryTypes.SELECT }
			);
		} else {
			products = await BasicProductDetail.findAll({
				attributes: [
					'id',
					'itemNumber',
					'packQuantity',
					'description25Char',
					'brandId'
				],
				include: [
					{
						model: PriceAndCost,
						attributes: ['unitOfMeasure', 'listPrice', 'costColumn1Price'],
						required: false
					},
					{
						model: ImageDetail,
						attributes: ['imageNameItem', 'imageNameProductLit'],
						required: false
					},
					{
						model: UPC,
						attributes: ['UPCRetail'],
						required: false
					}
				],
				limit: perPage * 1,
				offset: (page - 1) * perPage,
				where: or(
					{
						description25Char: {
							[Op.iLike]: `%${searchItem}%`
						}
					},
					{
						itemNumber: {
							[Op.iLike]: `%${searchItem}%`
						}
					}
				),
				order: [[`${columnOrder}`, `${orderManner}`]]
			});
		}
		count = await BasicProductDetail.count({
			where: or(
				{
					description25Char: {
						[Op.iLike]: `%${searchItem}%`
					}
				},
				{
					itemNumber: {
						[Op.iLike]: `%${searchItem}%`
					}
				}
			)
		});
	} else {
		if (columnOrder.split('.')[0] === 'priceAndCost') {
			products = await sequelize.query(
				`SELECT "basicProductDetails"."id", "basicProductDetails"."itemNumber", "basicProductDetails"."packQuantity", "basicProductDetails"."description25Char", "basicProductDetails"."brandId", 
            "upcs"."UPCRetail" AS "upcs.UPCRetail", 
            "pricesAndCost"."id" AS "pricesAndCost.id", "pricesAndCost"."unitOfMeasure" AS "pricesAndCost.unitOfMeasure", "pricesAndCost"."listPrice" AS "pricesAndCost.listPrice", "pricesAndCost"."costColumn1Price" AS "pricesAndCost.costColumn1Price", "imageDetail"."id" AS "imageDetail.id", "imageDetail"."imageNameItem" AS "imageDetail.imageNameItem", "imageDetail"."imageNameProductLit" AS "imageDetail.imageNameProductLit" FROM "basicProductDetails" AS "basicProductDetails" LEFT OUTER JOIN "pricesAndCosts" AS "pricesAndCost" ON "basicProductDetails"."id" = "pricesAndCost"."basicProductDetailId"
            LEFT OUTER JOIN "upcs" AS "upcs" 
            ON "basicProductDetails"."id" = "upcs"."basicProductDetailId"
            LEFT OUTER JOIN "imageDetails" AS "imageDetail" ON "basicProductDetails"."id" = "imageDetail"."basicProductDetailId" ORDER BY "pricesAndCost"."${
							columnOrder.split('.')[1]
						}" ${orderManner} LIMIT ${perPage} OFFSET ${(page - 1) * perPage};`,
				{ type: QueryTypes.SELECT }
			);
		} else {
			products = await BasicProductDetail.findAll({
				attributes: [
					'id',
					'itemNumber',
					'packQuantity',
					'description25Char',
					'brandId'
				],
				include: [
					{
						model: PriceAndCost,
						attributes: ['unitOfMeasure', 'listPrice', 'costColumn1Price'],
						required: false
					},
					{
						model: ImageDetail,
						attributes: ['imageNameItem', 'imageNameProductLit'],
						required: false
					},
					{
						model: UPC,
						attributes: ['UPCRetail'],
						required: false
					},
					{
						model: Vendor,
						attributes: ['name'],
						required: false
					}
				],
				limit: perPage * 1,
				offset: (page - 1) * perPage,
				order: [[`${columnOrder}`, `${orderManner}`]]
			});
		}
		count = await BasicProductDetail.count();
	}
	const totalPage = Math.ceil(count / perPage);
	return res.status(200).json({
		data: products,
		totalPage: totalPage,
		totalItem: count
	});
};

//sku search
const skuSearch = async (req, res) => {
	sequelize
		.query(
			`SELECT "id","itemNumber" FROM public."basicProductDetails" WHERE to_tsvector("itemNumber") @@ to_tsquery('${req.query.search}:*')`
		)
		.then((response) => {
			// console.log(response)
			res.json({
				success: true,
				data: response[0]
			});
		})
		.catch((err) => {
			res.json({
				error: 'something went wrong!',
				err: err
			});
		});
};

//brand search for filter dropdown
const brandSearchfilter = async (req, res) => {
	sequelize
		.query(
			`SELECT "id","brandShortName" FROM public."brands" WHERE to_tsvector("brandShortName") @@ to_tsquery('${req.query.search}:*')`
		)
		.then((response) => {
			// console.log(response)
			res.json({
				success: true,
				data: response[0]
			});
		})
		.catch((err) => {
			res.json({
				error: 'something went wrong!',
				err: err
			});
		});
};

//vendor search for filter dropdown
const vendorSearchfilter = async (req, res) => {
	sequelize
		.query(
			`SELECT "id","name" FROM public."vendors" WHERE to_tsvector("name") @@ to_tsquery('${req.query.search}:*')`
		)
		.then((response) => {
			// console.log(response)
			res.json({
				success: true,
				data: response[0]
			});
		})
		.catch((err) => {
			res.json({
				error: 'something went wrong!',
				err: err
			});
		});
};

// DELETE A PRODUCT
const deleteProduct = async (req, res) => {
	if (typeof req.query.id == 'string') {
		const product = await BasicProductDetail.findOne({
			where: { id: req.query.id },
			include: [
				{
					model: ImageDetail,
					attributes: [
						'imageNameItem',
						'imageNameItemAlt',
						'imageNameLineDrawing',
						'imageNameMSDSPDF',
						'imageNameProductLit',
						'imageNameSKUGroup',
						'imageNameSKUGroupAlt',
						'imageNameSwatches'
					]
				}
			]
		});
		let oldImgs = [];
		const keys = Object.keys(product.imageDetail.dataValues);
		for (let i of keys) {
			if (
				product.imageDetail.dataValues[i] !== '' &&
				product.imageDetail.dataValues[i] !== null &&
				product.imageDetail.dataValues[i] !== undefined
			) {
				const arr = product.imageDetail.dataValues[i].split(', ');
				oldImgs = oldImgs.concat(arr);
			}
		}
		oldImgs = oldImgs.map((e) => ProductImageBaseUrl + e);
		// console.log("Delete : ", oldImgs)
		product.destroy().then((response) => {
			//axios.post(`http://cdn.linqusacorp.com/productimages/delete`, { oldimg : oldImgs }).then(resp => {
			const dateTime = new Date().toLocaleString('en-US', {
				timeZone: 'Asia/Kolkata'
			});
			req.io.emit('cei updates', {
				message: 'Product Deleted',
				data: req.query.id,
				dateTime
			});
			return res.json({
				success: 'Deleted Successfully'
			});
			//})
		});
	} else if (typeof req.query.id == 'object') {
		const productIds = [];
		for (let i of req.query.id) {
			productIds.push(i);
			const product = await BasicProductDetail.findOne({
				where: { id: i },
				include: [
					{
						model: ImageDetail,
						attributes: [
							'imageNameItem',
							'imageNameItemAlt',
							'imageNameLineDrawing',
							'imageNameMSDSPDF',
							'imageNameProductLit',
							'imageNameSKUGroup',
							'imageNameSKUGroupAlt',
							'imageNameSwatches'
						]
					}
				]
			});
			let oldImgs = [];
			const keys = Object.keys(product.imageDetail.dataValues);
			for (let key of keys) {
				if (
					product.imageDetail.dataValues[key] !== '' &&
					product.imageDetail.dataValues[key] !== null &&
					product.imageDetail.dataValues[key] !== undefined
				) {
					const arr = product.imageDetail.dataValues[key].split(', ');
					oldImgs = oldImgs.concat(arr);
				}
			}
			oldImgs = oldImgs.map((e) => ProductImageBaseUrl + e);
			//console.log("Delete : ", oldImgs)
			await product.destroy();
			//await axios.post(`http://cdn.linqusacorp.com/productimages/delete`, { oldimg : oldImgs })
		}
		const dateTime = new Date().toLocaleString('en-US', {
			timeZone: 'Asia/Kolkata'
		});
		req.io.emit('cei updates', {
			message: 'Product(s) Deleted',
			data: productIds,
			dateTime
		});
		res.json({
			success: 'Deleted Successfully'
		});
	}
};

const deleteProductDetails = async (req, res) => {
	if (typeof req.query.id == 'string') {
		const product = await BasicProductDetail.findOne({
			where: { id: req.query.id },
			include: [
				{
					model: ImageDetail,
					attributes: [
						'imageNameItem',
						'imageNameItemAlt',
						'imageNameLineDrawing',
						'imageNameMSDSPDF',
						'imageNameProductLit',
						'imageNameSKUGroup',
						'imageNameSKUGroupAlt',
						'imageNameSwatches'
					]
				}
			]
		});
		console.log(product);
	} else if (typeof req.query.id == 'object') {
		const productIds = [];
		for (let i of req.query.id) {
			productIds.push(i);
			const product = await BasicProductDetail.findOne({
				where: { id: i },
				include: [
					{
						model: ImageDetail,
						attributes: [
							'imageNameItem',
							'imageNameItemAlt',
							'imageNameLineDrawing',
							'imageNameMSDSPDF',
							'imageNameProductLit',
							'imageNameSKUGroup',
							'imageNameSKUGroupAlt',
							'imageNameSwatches'
						]
					}
				]
			});
		}
	}
	return res.status(200).send('Deleted Successfully');
};

// GET PRODUCT DETAILS
const getProductDetails = async (req, res) => {
	let sameProducts = [];

	const data = await BasicProductDetail.findOne({
		where: { id: req.query.id },
		include: [
			{ model: AdditionalProductDetail },
			{ model: Catalog },
			{ model: ImageDetail },
			{ model: Manufacturer },
			{ model: Measurement },
			{ model: PriceAndCost },
			{ model: ProductClass },
			{ model: Selling },
			{ model: UPC },
			{ model: Usage },
			{ model: Vendor }
		]
	});
	const { UPCRetail } = data.upc;
	if (UPCRetail && UPCRetail != 0 && UPCRetail != '00000000') {
		sameProducts = await BasicProductDetail.findAll({
			attributes: ['id', 'description25Char'],
			include: [
				{
					model: UPC,
					attributes: [],
					where: { UPCRetail }
				}
			]
		});
	}
	res.json({
		data,
		sameProducts
	});
};
const sub = (x, y) => {
	myArray = x.filter(function (el) {
		return y.indexOf(el) < 0;
	});
	return myArray;
};

// EDIT PRODUCT
const editProduct = async (req, res) => {
	if (!(req.body && req.files))
		return res.status(200).send('Successfully Updated');
	let data = req.body;
	const files = Object.keys(req.files);
	for (let key of files) {
		uploadImages(req.files[key], 'productimages', async (obj) => {
			if (obj.err) return res.status(500).Send('Unable to Upload Images.');
			const arr = [];
			for (let i of obj.Data) {
				i.Key = i.key.split('/')[1];
				arr.push(i.Key);
			}
			data = { ...data, [key]: arr.join(', ') };
			if (key === files[files.length - 1]) {
				if (data.keywords) {
					data.keywords = data.keywords.split(',').map(String);
				}
				if (data.packageIncludes) {
					data.packageIncludes = data.packageIncludes.split(',').map(String);
				}
				if (data.productCategory) {
					data.productCategory = data.productCategory.split(',').map(Number);
				}
				if (data.packageIncludes === '' || data.packageIncludes === ' ') {
					data.packageIncludes = [];
				}
				if (data.keywords === '' || data.keywords === ' ') {
					data.keywords = [];
				}
				if (data.productCategory === '' || data.productCategory === ' ') {
					data.productCategory = [];
				}
				let insertVendors = [],
					deleteVendors = [];
				if (data.vendors) {
					let newVendors = [];
					newVendors = data.vendors.map((vendor) => {
						return vendor.value;
					});
					console.log(newVendors);
					const vendors = await VendorProducts.findAll({
						attributes: ['vendorId'],
						where: { basicProductDetailId: req.query.id }
					});
					let oldVendors = [];
					oldVendors = vendors.map((vendor) => vendor.vendorId);
					console.log(oldVendors);
					insertVendors = sub(newVendors, oldVendors);
					deleteVendors = sub(oldVendors, newVendors);
				}
				const t = await sequelize.transaction();
				try {
					const product = await BasicProductDetail.findOne({
						where: { id: req.query.id },
						include: [
							{
								model: ImageDetail
							}
						],
						transaction: t
					});
					await product.update(data, {
						transaction: t
					});
					await BasicProductDetail.update(data, {
						where: { id: req.query.id },
						transaction: t
					});
					insertVendors.forEach(async (vendorId) => {
						await VendorProducts.create(
							{ basicProductDetailId: req.query.id, vendorId },
							{ transaction: t }
						);
					});
					deleteVendors.forEach(async (vendorId) => {
						await VendorProducts.destroy(
							{ where: { vendorId } },
							{ transaction: t }
						);
					});
					await AdditionalProductDetail.update(data, {
						where: { basicProductDetailId: req.query.id },
						transaction: t
					});
					await Catalog.update(data, {
						where: { basicProductDetailId: req.query.id },
						transaction: t
					});
					await ImageDetail.update(data, {
						where: { basicProductDetailId: req.query.id },
						transaction: t
					});
					await Manufacturer.update(data, {
						where: { basicProductDetailId: req.query.id },
						transaction: t
					});
					await Measurement.update(data, {
						where: { basicProductDetailId: req.query.id },
						transaction: t
					});
					await PriceAndCost.update(data, {
						where: { basicProductDetailId: req.query.id },
						transaction: t
					});
					await ProductClass.update(data, {
						where: { basicProductDetailId: req.query.id },
						transaction: t
					});
					await Selling.update(data, {
						where: { basicProductDetailId: req.query.id },
						transaction: t
					});
					await UPC.update(data, {
						where: { basicProductDetailId: req.query.id },
						transaction: t
					});
					await t.commit();
					const dateTime = new Date().toLocaleString('en-US', {
						timeZone: 'Asia/Kolkata'
					});
					req.io.emit('cei updates', {
						message: 'Product Edited',
						data: req.query.id,
						dateTime
					});
					for (let file of files) {
						const images = product.imageDetail[file].split(', ');
						if (images.length)
							deleteImages(images, 'image-test', (obj) => {
								console.log(obj);
							});
					}
					res.json({
						success: 'Updated'
					});
				} catch (err) {
					await t.rollback();
					console.log(err);
					res.status(500).json({
						error: 'Something went wrong'
					});
				}
			}
		});
	}
};

const searchProduct = async (req, res) => {
	const queryString = req.query.searchItem;
	const pageSize = 15;
	const page = req.query.page || 1;
	console.log(queryString);
	const products = await BasicProductDetail.findAll({
		order: [['id', 'DESC']],
		attributes: ['id', 'itemNumber', 'packQuantity', 'description25Char'],
		include: [
			{
				model: PriceAndCost,
				attributes: ['unitOfMeasure', 'listPrice', 'costColumn1Price'],
				required: false
			},
			{
				model: ImageDetail,
				attributes: ['imageNameItem', 'imageNameProductLit'],
				required: false
			}
		],
		where: or(
			{
				description25Char: {
					[Op.iLike]: `%${queryString}%`
				}
			},
			{
				itemNumber: {
					[Op.iLike]: `${queryString}%`
				}
			}
		),
		offset: (page - 1) * pageSize,
		limit: pageSize
	});
	const totalCount = await BasicProductDetail.count({
		where: or(
			{
				description25Char: {
					[Op.iLike]: `%${queryString}%`
				}
			},
			{
				itemNumber: {
					[Op.iLike]: `${queryString}%`
				}
			}
		)
	});
	if (!products.length)
		return res
			.status(404)
			.json({ error: 'There is No Match for related Search' });
	return res
		.status(200)
		.json({ products, totalCount, success: 'Results are fetched!!!' });
};

//? Helper Function to Get Index of Character
const findAllIndices = (string, element) => {
	const indices = [];
	for (let i = 0; i < string.length; i++) {
		if (string[i] === element) indices.push(i);
	}
	return indices.reverse();
};

//? Normalize product
const normalizeProduct = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const pageSize = parseInt(req.query.pageSize) || 2;
	const t = await sequelize.transaction();
	try {
		const data = await BasicProductDetail.findAll({
			attributes: ['id', 'description25Char'],
			include: [
				{
					model: AdditionalProductDetail,
					attributes: ['description125Character']
				}
			],
			where: {
				id: {
					[Op.between]: [
						(page - 1) * pageSize,
						(page - 1) * pageSize + pageSize
					]
				}
			},
			order: [['id', 'ASC']]
		});
		const products = data.map((elem) => {
			let obj = {};
			obj.id = elem.id;
			obj.description25Char = elem.description25Char;
			obj.description125Character =
				elem.additionalProductDetail.description125Character;
			return obj;
		});
		if (!products.length) {
			await t.commit();
			return res.status(404).send('No Product Found.');
		}
		const fields = Object.keys(products[0]).filter((field) => field !== 'id');
		const finalArray = products.map((elem) => {
			fields.map((field) => {
				const commaIndices = findAllIndices(elem[field], ',');
				commaIndices.forEach((index) => {
					if (!(elem[field][index + 1] === ' ')) {
						elem[field] =
							elem[field].slice(0, index + 1) +
							' ' +
							elem[field].slice(index + 1);
					}
				});
				elem[field] = elem[field].replace(/""+/g, '"');
				elem[field] = elem[field].replace(/  +/g, ' ');
			});
			return elem;
		});
		for (let elem of finalArray) {
			await BasicProductDetail.update(
				{ description25Char: elem.description25Char },
				{ where: { id: elem.id }, transaction: t }
			);
			await AdditionalProductDetail.update(
				{ description125Character: elem.description125Character },
				{ where: { basicProductDetailId: elem.id }, transaction: t }
			);
		}
		await t.commit();
		return res.status(200).json(finalArray);
	} catch (error) {
		await t.rollback();
		console.log(error);
		return res.status(500).send('Something Went Wrong!');
	}
};

const mapCategories = async (req, res) => {
	const map = await csv().fromFile(req.file.path);
	fs.unlink(req.file.path, async () => {
		let result = {};
		for (item of map) {
			const { id } = await Categories.findOne({
				where: { googleCategoryId: item.id },
				attributes: ['id']
			});
			result = { ...result, [item.category]: [id] };
		}
		return res.status(200).json({ result });
	});
};

const mapTrueProducts = async (req, res) => {
	const jsonProducts = await csv().fromFile(req.file.path);
	fs.unlink(req.file.path, async () => {
		const result = [];
		for (prod of jsonProducts) {
			const data = await BasicProductDetail.update(
				{ productCategory: prod.productCategory.split(', ') },
				{
					where: { itemNumber: prod.itemNumber }
				}
			);
			result.push(data);
		}
		return res.status(200).json({ message: 'Mapped Successfully.' });
	});
};

const exportProducts = async (req, res) => {
	let { exportValue, initialId } = req.query;
	if (!initialId) initialId = 1;
	initialId = parseInt(initialId);
	let products = [];
	try {
		if (exportValue === 'all') {
			products = await BasicProductDetail.findAll({
				attributes: [
					'id',
					'itemNumber',
					'description25Char',
					'vendorId',
					'productCategory',
					'vendorCategory'
				],
				include: [
					{
						model: AdditionalProductDetail,
						attributes: ['description125Character']
					},
					{
						model: ImageDetail,
						attributes: ['imageNameItem']
					}
				],
				order: [['id', `ASC`]]
			});
		} else {
			exportValue = parseInt(exportValue);
			products = await BasicProductDetail.findAll({
				attributes: [
					'id',
					'itemNumber',
					'description25Char',
					'vendorId',
					'productCategory',
					'vendorCategory'
				],
				include: [
					{
						model: AdditionalProductDetail,
						attributes: ['description125Character']
					},
					{
						model: ImageDetail,
						attributes: ['imageNameItem']
					}
				],
				where: {
					id: {
						[Op.between]: [initialId, initialId + exportValue - 1]
					}
				},
				order: [['id', `ASC`]]
			});
		}
		products = products.map((product) =>
			_.pick(product, [
				'id',
				'itemNumber',
				'description25Char',
				'vendorId',
				'productCategory',
				'additionalProductDetail',
				'imageDetail',
				'vendorCategory'
			])
		);
		const data = [];
		for (product of products) {
			const categories = [];
			const vendors = [];
			for (id of product.productCategory) {
				if (![9999, 9998].includes(id)) {
					const category = await Categories.findOne({
						attributes: ['category'],
						where: { id }
					});
					categories.push(category.category);
				}
			}
			const vendorIds = await VendorProducts.findAll({
				attributes: ['vendorId'],
				where: { basicProductDetailId: product.id }
			});
			for (vendorId of vendorIds) {
				const vendor = await Vendor.findOne({
					where: { id: vendorId.vendorId },
					attributes: ['name']
				});
				vendors.push(vendor.name);
			}
			data.push({ ...product, categories, vendors });
		}
		products = data.map((item) => {
			item.imageName = item.imageDetail.imageNameItem;
			item.description = item.additionalProductDetail.description125Character;
			item.categories = item.categories.join(',');
			item.vendors = item.vendors.join(',');
			item.sku = item.itemNumber;
			item.name = item.description25Char;
			product = _.omit(item, [
				'productCategory',
				'additionalProductDetail',
				'imageDetail',
				'itemNumber',
				'description25Char',
				'imageNameItem',
				'description125Character'
			]);
			return product;
		});
		return res.status(200).json({ products });
	} catch (err) {
		console.log(err);
		return res.status(500).send('Something Went Wrong!');
	}
};

const searchProductMinimal = async (req, res) => {
	const searchItem = req.query.searchItem;
	const products = await BasicProductDetail.findAll({
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
		limit: 20,
		where: or(
			{
				description25Char: {
					[Op.iLike]: `%${searchItem}%`
				}
			},
			{
				itemNumber: {
					[Op.iLike]: `%${searchItem}%`
				}
			}
		),
		order: [['id', 'ASC']]
	});
	return res.status(200).json(products);
};

const importDHProducts = async (req, res) => {
	const result = await csv({
		output: 'json',
		delimiter: '|',
		headers: [
			'stockStatus',
			'qtyAvailable',
			'rebateFlag',
			'rebateEndDate',
			'itemNumber',
			'manfItemNumber',
			'upc',
			'subCategoryCode',
			'vendorName',
			'unitCost',
			'rebateAmount',
			'handlingCharge',
			'freight',
			'shipVia',
			'weight',
			'shortDescription',
			'longDescription'
		]
	}).fromFile(req.file.path);
	fs.unlink(req.file.path, async () => {});

	for (let product of result) {
		if (dhCategoryMapper[product.subCategoryCode]) {
			product.category = `${dhCategoryMapper[product.subCategoryCode]}`.split(
				', '
			);
			product.category = product.category.map((item) => parseInt(item));
		} else {
			product.category = [];
		}
	}
	const data = result.map((obj) => {
		return _.pick(
			_.mapKeys(obj, function (value, key) {
				return dhMapper[key];
			}),
			[
				'packQuantity',
				'rebateFlag',
				'rebateEndDate',
				'itemNumber',
				'manufacturerPartNumber',
				'UPCRetail',
				'vendorCategory',
				'subVendorName',
				'listPrice',
				'rebateAmount',
				'handlingCharge',
				'freightPrice',
				'itemWeight',
				'description25Char',
				'description125Character',
				'productCategory'
			]
		);
	});
	const t = await sequelize.transaction();
	try {
		for (let tempproduct of data) {
			tempproduct.keywords = [];
			if (tempproduct.rebateEndDate === '?') tempproduct.rebateEndDate = null;
			const isExist = await BasicProductDetail.count({
				where: { itemNumber: tempproduct.itemNumber }
			});
			if (!isExist) {
				const subVendor = await SubVendor.findOne({
					attributes: ['id'],
					where: { vendorPricerPrintName: tempproduct.subVendorName }
				});
				if (subVendor) {
					tempproduct.subVendorId = subVendor.id;
				} else {
					const sVendor = await SubVendor.create({
						vendorAbbreviation: tempproduct.subVendorName,
						vendorShortName: tempproduct.subVendorName,
						vendorPricerPrintName: tempproduct.subVendorName
					});
					tempproduct.subVendorId = sVendor.id;
				}
				const product = await BasicProductDetail.create(tempproduct, {
					transaction: t
				});
				tempproduct.basicProductDetailId = product.id;
				await AdditionalProductDetail.create(tempproduct, { transaction: t });
				await Catalog.create(tempproduct, { transaction: t });
				await ImageDetail.create(tempproduct, { transaction: t });
				await Manufacturer.create(tempproduct, { transaction: t });
				await Measurement.create(tempproduct, { transaction: t });
				await PriceAndCost.create(tempproduct, { transaction: t });
				await ProductClass.create(tempproduct, { transaction: t });
				await Selling.create(tempproduct, { transaction: t });
				await UPC.create(tempproduct, { transaction: t });
				await Usage.create(tempproduct, { transaction: t });
				await VendorProducts.create(
					{ basicProductDetailId: product.id, vendorId: 19 },
					{ transaction: t }
				);
			}
		}
		await t.commit();
		res.json({
			success: 'Products Added!'
		});
	} catch (err) {
		await t.rollback();
		console.log(err);
		res.status(400).json({
			error: err
		});
	}
};

const importGlobalProducts = async (req, res) => {
	const jsonProducts = await csv().fromFile(req.file.path);
	fs.unlink(req.file.path, (err) => {});
	const data = jsonProducts.map((obj) => {
		return _.mapKeys(obj, function (value, key) {
			return globalMapper[key];
		});
	});
	let features = '';
	for (let obj of data) {
		['feature1', 'feature2', 'feature3', 'feature4', 'feature5'].map((key) => {
			console.log(obj[key]);
			if (obj[key]) {
				if (features)
					features = features + ', ' + obj[key] + ' : ' + obj[`${key}Value`];
				else features = obj[key] + ' : ' + obj[`${key}Value`];
			}
			if (features) obj['keywords'] = features.split(', ');
			else obj['keywords'] = [];
		});
		let vendorCategory = '';
		let categories = [];
		for (i = 1; i <= 3; i++)
			if (obj[`category${i}`]) {
				if (obj[`category${i + 1}`])
					vendorCategory += obj[`category${i}`] + ', ';
				else vendorCategory += obj[`category${i}`];
				if (
					globalCategoryMapper[obj[`category${i}`]] ||
					globalCategoryMapper[obj[`category${i}`]] != undefined
				)
					categories = categories.concat(
						globalCategoryMapper[obj[`category${i}`]]
					);
			}
		obj.productCategory = categories;
		obj.vendorCategory = vendorCategory;
	}
	const t = await sequelize.transaction();
	try {
		for (let item of data) {
			const isExist = await BasicProductDetail.count({
				where: { itemNumber: item.itemNumber },
				transaction: t
			});
			console.log('Item Number : ', item.itemNumber + 'Number : ' + isExist);
			if (isExist <= 0) {
				if (item.prop65Indicator === '') item.prop65Indicator = false;
				if (item.packQuantity === '') item.packQuantity = 0;
				const { id: brandId } = await Brand.create(
					{ brandShortName: item.brandShortName },
					{
						attributes: ['id'],
						transaction: t
					}
				);
				item.brandId = brandId;
				const product = await BasicProductDetail.create(item, {
					transaction: t
				});
				item.basicProductDetailId = product.id;
				await AdditionalProductDetail.create(item, { transaction: t });
				await Catalog.create(item, { transaction: t });
				await ImageDetail.create(item, { transaction: t });
				await Manufacturer.create(item, { transaction: t });
				await Measurement.create(item, { transaction: t });
				await PriceAndCost.create(item, { transaction: t });
				await ProductClass.create(item, { transaction: t });
				await Selling.create(item, { transaction: t });
				await UPC.create(item, { transaction: t });
				await Usage.create(item, { transaction: t });
				await VendorProducts.create(
					{ basicProductDetailId: product.id, vendorId: 58 },
					{ transaction: t }
				);
				if (item.color) {
					const newVariant = {};
					const variant = await Variant.findOne({
						where: { name: 'color' },
						attributes: ['id']
					});
					if (!variant) {
						const { id: variantId } = await Variant.create(
							{ name: 'color' },
							{ attributes: ['id'] }
						);
						newVariant.variantId = variantId;
					} else {
						newVariant.variantId = variant.id;
					}
					newVariant.variantValue = item.color;
					newVariant.basicProductDetailId = product.id;
					await ProductVariant.create(newVariant, { transaction: t });
				}
				if (item.material) {
					const newVariant = {};
					const variant = await Variant.findOne({
						where: { name: 'material' },
						attributes: ['id']
					});
					if (!variant) {
						const { id: variantId } = await Variant.create(
							{ name: 'material' },
							{ attributes: ['id'] }
						);
						newVariant.variantId = variantId;
					} else {
						newVariant.variantId = variant.id;
					}
					newVariant.variantValue = item.material;
					newVariant.basicProductDetailId = product.id;
					await ProductVariant.create(newVariant, { transaction: t });
				}
			}
		}
		await t.commit();
		return res.status(200).json({ message: 'Products Imported Successfully' });
	} catch (error) {
		await t.rollback();
		console.log(error);
		return res.status(500).send('Something Went Wrong!');
	}
	return res.status(200).json({ data, jsonProducts });
};

const importKrollProducts = async (req, res) => {
	const jsonProducts = await normalizeKrollProducts(req.file.path);
	if (jsonProducts.err)
		return res.status(500).json({ message: 'Unable to Import' });
	let data = jsonProducts.data.map((obj) => {
		return _.mapKeys(obj, function (value, key) {
			return krollMapper[key];
		});
	});
	const result = [];
	for (let obj of data) {
		if (obj.category1 && obj.category2) {
			obj = {
				productCategory: [
					parseInt(krollCategory[obj.category1]),
					parseInt(krollCategory[obj.category2])
				].filter((item) => item),
				...obj
			};
			obj.vendorCategory = obj.category1 + ', ' + obj.category2;
		} else if (obj.category1) {
			obj = {
				productCategory: [parseInt(krollCategory[obj.category1])].filter(
					(item) => item
				),
				...obj
			};
			obj.vendorCategory = obj.category1;
		} else if (obj.category2) {
			obj = {
				productCategory: [parseInt(krollCategory[obj.category2])].filter(
					(item) => item
				),
				...obj
			};
			obj.vendorCategory = obj.obj.category2;
		}
		obj.itemNumber = obj.itemNumber.replace(/-/g, '_');
		obj.masterSKU = 'KRO' + obj.itemNumber;
		result.push(obj);
	}
	// const r = await insertProduct(req.body.product);
	// return res.status(200).json({ r });
	const t = await sequelize.transaction();
	try {
		for (let item of result) {
			item.keywords = [];
			const group = await ProductGroup.findOne(
				{
					name: item.productGroup
				},
				{
					transaction: t
				}
			);
			if (!group) {
				const { id } = await ProductGroup.create(
					{ name: item.productGroup },
					{ transaction: t }
				);
				item.productGroupId = id;
			} else {
				item.productGroupId = group.id;
			}
			const isExist = await BasicProductDetail.count({
				where: { itemNumber: item.itemNumber },
				transaction: t
			});
			console.log('Item Number : ', item.itemNumber + 'Number : ' + isExist);
			if (isExist <= 0) {
				const product = await BasicProductDetail.create(item, {
					transaction: t
				});
				item.basicProductDetailId = product.id;
				let createdProductId = product.id;
				await AdditionalProductDetail.create(item, { transaction: t });
				await Catalog.create(item, { transaction: t });
				await ImageDetail.create(item, { transaction: t });
				await Manufacturer.create(item, { transaction: t });
				await Measurement.create(item, { transaction: t });
				await PriceAndCost.create(item, { transaction: t });
				await ProductClass.create(item, { transaction: t });
				await Selling.create(item, { transaction: t });
				await UPC.create(item, { transaction: t });
				await Usage.create(item, { transaction: t });
				await VendorProducts.create(
					{ basicProductDetailId: product.id, vendorId: 30 },
					{ transaction: t }
				);
				for (let i = 1; i <= 10; i++) {
					console.log('Ran ', i);
					if (!item[`choice${i}`].length) break;
					const variant = await Variant.findOne({
						where: { name: item[`choice${i}`] }
					});
					if (variant) {
						const productVariant = await ProductVariant.findOne({
							where: {
								variantId: variant.id,
								basicProductDetailId: createdProductId,
								variantValue: item[`option${i}`]
							},
							transaction: t
						});
						if (!productVariant) {
							await ProductVariant.create(
								{
									variantId: variant.id,
									basicProductDetailId: createdProductId,
									variantValue: item[`option${i}`]
								},
								{ transaction: t }
							);
						}
					} else {
						const newVariant = await Variant.create(
							{ name: item[`choice${i}`] },
							{ transaction: t }
						);
						await ProductVariant.create(
							{
								variantId: newVariant.id,
								basicProductDetailId: createdProductId,
								variantValue: item[`option${i}`]
							},
							{ transaction: t }
						);
					}
				}
			}
		}
		await t.commit();
		return res.status(200).json({ message: 'Products Imported successfully' });
	} catch (error) {
		await t.rollback();
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong' });
	}
};

const fetchandUploadImage = async (req, res) => {
	download(
		'https://images.globalindustrial.com/images/275x275/RUT_2326838.jpg',
		(obj) => {
			if (obj.err)
				return res.status(500).json({ message: 'Image is not Uploaded.' });
			return res.status(200).json({ message: 'Image has been Uploaded.' });
		}
	);
};

const finalFilter = async (req, res) => {
	var perPage = req.query.pagesize || 15;
	var page = req.params.page || 1;
	let query = `SELECT "basicProductDetails"."id", "basicProductDetails"."itemNumber", "basicProductDetails"."packQuantity", "basicProductDetails"."description25Char", "basicProductDetails"."brandId", "pricesAndCost"."unitOfMeasure" AS "pricesAndCost.unitOfMeasure", "upcs"."UPCRetail" AS "upcs.UPCRetail", "pricesAndCost"."listPrice" AS "pricesAndCost.listPrice", "pricesAndCost"."costColumn1Price" AS "pricesAndCost.costColumn1Price",  "imageDetail"."imageNameItem" AS "imageDetail.imageNameItem"  FROM "basicProductDetails" AS "basicProductDetails" INNER JOIN "pricesAndCosts" AS "pricesAndCost" ON "basicProductDetails"."id" = "pricesAndCost"."basicProductDetailId" INNER JOIN "imageDetails" AS "imageDetail" ON "basicProductDetails"."id" = "imageDetail"."basicProductDetailId" INNER JOIN "upcs" AS "upcs" ON "basicProductDetails"."id" = "upcs"."basicProductDetailId" `;
	if (req.body.vendor.length)
		query =
			query +
			`INNER JOIN "vendorProducts" ON "basicProductDetails"."id" = "vendorProducts"."basicProductDetailId" `;
	query += `WHERE `;
	if (req.body.itemNumber.length) {
		let itemNumbers = '(';
		for (let i = 0; i < req.body.itemNumber.length; i++) {
			itemNumbers = itemNumbers + "'" + req.body.itemNumber[i] + "'";
			if (i != req.body.itemNumber.length - 1) itemNumbers += ',';
		}
		itemNumbers += ')';
		console.log(itemNumbers);
		query = query + `"basicProductDetails"."itemNumber" IN ${itemNumbers} `;
	}
	if (req.body.brandId.length) {
		if (req.body.itemNumber.length)
			query =
				query + `AND "basicProductDetails"."brandId" IN (${req.body.brandId}) `;
		else query += `"basicProductDetails"."brandId" IN (${req.body.brandId}) `;
	}
	if (req.body.productCategory.length) {
		if (req.body.itemNumber.length || req.body.brandId.length) {
			for (let id of req.body.productCategory) {
				query += `AND ${id} =  ANY ("basicProductDetails"."productCategory") `;
			}
		} else {
			for (let i = 0; i <= req.body.productCategory.length; i++) {
				if (i == 0)
					query += `${req.body.productCategory[i]} =  ANY ("basicProductDetails"."productCategory") `;
				query += `AND ${req.body.productCategory[i]} =  ANY ("basicProductDetails"."productCategory") `;
			}
		}
	}
	if (req.body.vendor.length) {
		if (
			req.body.itemNumber.length ||
			req.body.brandId.length ||
			req.body.productCategory.length
		) {
			query += `AND "vendorProducts"."vendorId" IN (${req.body.vendor}) `;
		} else {
			query += `"vendorProducts"."vendorId" IN (${req.body.vendor}) `;
		}
	}
	let countQuery = query;
	countQuery = countQuery.replace(
		`"basicProductDetails"."id", "basicProductDetails"."itemNumber", "basicProductDetails"."packQuantity", "basicProductDetails"."description25Char", "basicProductDetails"."brandId", "pricesAndCost"."unitOfMeasure" AS "pricesAndCost.unitOfMeasure", "upcs"."UPCRetail" AS "upcs.UPCRetail", "pricesAndCost"."listPrice" AS "pricesAndCost.listPrice", "pricesAndCost"."costColumn1Price" AS "pricesAndCost.costColumn1Price",  "imageDetail"."imageNameItem" AS "imageDetail.imageNameItem"`,
		`count("basicProductDetails"."id")`
	);
	query += `ORDER BY "basicProductDetails".id DESC LIMIT ${perPage} OFFSET ${
		perPage * (page - 1)
	}`;
	const result = await sequelize.query(query, { type: QueryTypes.SELECT });
	const count = await sequelize.query(countQuery, {
		type: QueryTypes.SELECT
	});
	const totalItem = count[0]['count'];
	const totalPage = totalItem / perPage;
	return res
		.status(200)
		.json({ data: result, totalPage: totalPage, totalItem: totalItem });
};

const importHoshizakiProducts = async (req, res) => {
	const jsonProducts = await csv().fromFile(req.file.path);
	fs.unlink(req.file.path, (err) => {});
	let data = jsonProducts.map((obj) => {
		return _.mapKeys(obj, function (value, key) {
			return hoshizakiMapper[key];
		});
	});
	data = data.map((obj) => {
		obj.itemNumber = obj.itemNumber.replace(/-/g, '_');
		let vendorCategory = '';
		let imageNameItemGroup = '';
		for (let i = 1; i <= 7; i++) {
			if (obj[`category${i}`]) {
				if (obj[`category${i + 1}`])
					vendorCategory += obj[`category${i}`] + ', ';
				else vendorCategory += obj[`category${i}`];
			}
		}
		for (let i = 1; i <= 9; i++) {
			if (obj[`imageNameItemGroup${i}`]) {
				if (obj[`imageNameItemGroup${i + 1}`])
					imageNameItemGroup += obj[`imageNameItemGroup${i}`] + ', ';
				else imageNameItemGroup += obj[`imageNameItemGroup${i}`];
			}
		}
		obj.productCategory =
			hoshizakiCategoryMapper[obj.category1 + ', ' + obj.category2];
		obj.vendorCategory = vendorCategory;
		obj.imageNameItemAlt = imageNameItemGroup;
		obj.masterSKU = `HOS${obj.itemNumber}`;
		obj = _.omit(obj, [
			'category1',
			'category2',
			'category3',
			'category4',
			'category5',
			'category6',
			'category7',
			'imageNameItemGroup1',
			'imageNameItemGroup2',
			'imageNameItemGroup3',
			'imageNameItemGroup4',
			'imageNameItemGroup5',
			'imageNameItemGroup6',
			'imageNameItemGroup7',
			'imageNameItemGroup8',
			'imageNameItemGroup9',
			'undefined'
		]);
		if (!obj.listPrice || obj.listPrice == 'N/A') {
			obj.listPrice = 0;
		}
		if (obj.keywords) {
			obj.keywords = obj.keywords.split(', ');
		} else {
			obj.keywords = [];
		}
		return obj;
	});
	const t = await sequelize.transaction();
	try {
		for (let item of data) {
			const isExist = await BasicProductDetail.count({
				where: { itemNumber: item.itemNumber },
				transaction: t
			});
			if (isExist <= 0) {
				const product = await BasicProductDetail.create(item, {
					transaction: t
				});
				item.basicProductDetailId = product.id;
				await AdditionalProductDetail.create(item, { transaction: t });
				await Catalog.create(item, { transaction: t });
				await ImageDetail.create(item, { transaction: t });
				await Manufacturer.create(item, { transaction: t });
				await Measurement.create(item, { transaction: t });
				await PriceAndCost.create(item, { transaction: t });
				await ProductClass.create(item, { transaction: t });
				await Selling.create(item, { transaction: t });
				await UPC.create(item, { transaction: t });
				await Usage.create(item, { transaction: t });
				await VendorProducts.create(
					{ basicProductDetailId: product.id, vendorId: 59 },
					{ transaction: t }
				);
				//? Product Resources.
				for (let i = 1; i <= 11; i++) {
					if (item[`resourceLabel${i}`]) {
						await ProductResource.create(
							{
								name: item[`resourceLabel${i}`],
								link: item[`resourceFilename${i}`],
								basicProductDetailId: product.id
							},
							{ transaction: t }
						);
					}
				}
				for (let i = 1; i <= 5; i++) {
					if (item[`videoTitle${i}`]) {
						await ProductResource.create(
							{
								name: item[`videoTitle${i}`],
								link: item[`videoLink${i}`],
								basicProductDetailId: product.id
							},
							{ transaction: t }
						);
					}
				}
				if (item.technicalManual) {
					await ProductResource.create(
						{
							name: 'Technical Manual',
							link: item.technicalManual,
							basicProductDetailId: product.id
						},
						{ transaction: t }
					);
				}
				if (item.quickReference) {
					await ProductResource.create(
						{
							name: 'Quick Reference',
							link: item.quickReference,
							basicProductDetailId: product.id
						},
						{ transaction: t }
					);
				}
				//? Extra Product Details
				const extraFields = [
					'status',
					'tags',
					'postStatus',
					'tracking',
					'HSTariffCode',
					'amps',
					'kWh',
					'menuOrder',
					'indTopseller',
					'indHealthcare',
					'indCstore',
					'indFoodservice',
					'indLodging',
					'indInstitutions',
					'indSupermarket',
					'indOffice',
					'categorySlugs1',
					'categorySlugs2'
				];
				for (let i = 1; i <= 27; i++) {
					if (item[`property${i}`]) {
						await ExtraProductDetail.create(
							{
								property: item[`property${i}`],
								value: item[`value${i}`],
								basicProductDetailId: product.id
							},
							{ transaction: t }
						);
					}
				}
				for (let field of extraFields) {
					if (item[field]) {
						await ExtraProductDetail.create(
							{
								property: field,
								value: item[field],
								basicProductDetailId: product.id
							},
							{ transaction: t }
						);
					}
				}
			}
		}
		await t.commit();
		return res.status(200).json({ message: 'Products Imported Successfully' });
	} catch (error) {
		await t.rollback();
		console.log(error);
		return res.status(500).send(`Something Went Wrong!!!`);
	}
};

const importElkayProducts = async (req, res) => {
	const jsonProducts = await csv().fromFile(req.file.path);
	fs.unlink(req.file.path, (err) => {});
	let data = jsonProducts.map((obj) => {
		const item = _.mapKeys(obj, function (value, key) {
			return elkayMapper[key];
		});
		item.itemNumber = item.itemNumber.replace(/-/g, '_');
		item.masterSKU = `ELK${item.itemNumber}`;
		const resourceFields = [
			'productVideoInstallation1',
			'productVideoInstallation2',
			'productVideoInstallation3',
			'product_video_marketing1',
			'product_video_marketing2',
			'product_video_marketing3',
			'product_video_marketing4',
			'productVideoLong1',
			'productVideoLong2',
			'productVideoLong3',
			'specificationSheet',
			'filterPerformanceDataSheet',
			'installationInstructions1',
			'installationInstructions2',
			'installationInstructions3',
			'installationInstructions4',
			'installationInstructions5'
		];
		const extraFields = [
			'productStyle',
			'unitWeight',
			'unitDimensions',
			'unitVolume',
			'shippingDimensions',
			'itemWeightWithoutPackaging',
			'productDimensions',
			'kitComponents',
			'shipsInMultipleCartons',
			'longDescription80Char',
			'badge2',
			'badge3',
			'badge4',
			'badge5',
			'infographic2',
			'infographic3',
			'infographic4',
			'infographic5',
			'infographic6',
			'infographic7',
			'marketingCopy',
			'warranty1',
			'warranty2',
			'warranty3',
			'specialNote',
			'careAndCleaning1',
			'careAndCleaning2',
			'careAndCleaning3',
			'marketingMaterialType',
			'marketingFinishName',
			'includedWithProduct',
			'upsellOrRecommended',
			'buyAmericanActCompliant',
			'ada',
			'madeInUsaCompliant',
			'builtInTheUsa',
			'installationTypeSinks',
			'mountingHardwareIncluded',
			'templateIncluded',
			'recommendedInstHardware',
			'sinkPackages',
			'roomDesignation',
			'numberOfBowls',
			'bowl1Length',
			'bowl1Width',
			'bowl1Depth',
			'drainSizeBowl1',
			'drainPlacementBowl1',
			'bowl2Length',
			'bowl2Width',
			'bowl2Depth',
			'drainSizeBowl2',
			'drainPlacementBowl2',
			'bowl3Length',
			'bowl3Width',
			'bowl3Depth',
			'drainSizeBowl3',
			'drainPlacementBowl3',
			'sounDeadening',
			'faucetHoleConfigOfSink',
			'minimumCabinetSize',
			'countertopCutOutDim',
			'cutoutTemplate1',
			'cutoutTemplate2',
			'cutoutTemplate3',
			'cutoutTemplate4',
			'featuresSinks',
			'includedAccessory1',
			'includedAccessory2',
			'includedAccessory3',
			'includedAccessory4',
			'optionalSoapDispenser',
			'optionalSinkMate1',
			'optionalBottomGrid1',
			'optionalBottomGrid2',
			'optionalColander1',
			'optionalCuttingBoard1',
			'optionalCuttingBoard2',
			'optionalCuttingBoard3',
			'optionalCuttingBoard4',
			'optionalCuttingBoard5',
			'optionalCuttingBoard6',
			'optionalCuttingBoard7',
			'optionalCuttingBoard8',
			'optionalRinsingBasket1',
			'optionalRinsingBasket2',
			'optionalRinsingBasket3',
			'optionalRinsingBasket4',
			'optionalRinsingBasket5',
			'optionalDrain1',
			'optionalDrain2',
			'optionalDrain3',
			'optionalFaucet1',
			'optionalFaucet2',
			'optionalFaucet3',
			'optionalFaucet4',
			'optionalFaucet5',
			'optionalFaucet6',
			'gauge',
			'installationType',
			'numberFaucetHolesRequired',
			'gpm',
			'faucetDeckClearance',
			'spoutHeight',
			'spoutReach',
			'spoutType',
			'sprayType',
			'valveType',
			'faucetValveConnection',
			'numberOfHandlesLevers',
			'handleType',
			'featuresFaucets',
			'accessoryFitsBowlSize',
			'faucetMaterial',
			'baseMaterial',
			'optionalAccessory1',
			'optionalAccessory2',
			'optionalAccessory3',
			'optionalAccessory4',
			'accessoryType',
			'installationLocation',
			'bubblerStyle',
			'chillingOptions',
			'mountTypeDrinkingWater',
			'numberOfStations',
			'voltage',
			'ratedWatts',
			'fullLoadAmps',
			'featuresDrinkingWaterProds',
			'activationType',
			'productComplianceSinks',
			'productComplianceAccessories',
			'productComplianceFaucets',
			'productComplianceDrinkWater',
			'productComplianceFoodservice',
			'certifyingAgency',
			'domainName',
			'badge1',
			'infographic1',
			'searchEngineOptimization',
			'obsoleteDate',
			'listPriceName',
			'associateMultiplier',
			'associatePrice',
			'authorizedMultiplier',
			'authorizedPrice',
			'subClassification',
			'productLeadTime',
			'sinkDepth',
			'minOderQtyForPricing',
			'residentialSalesStatus',
			'commercialSalesStatus',
			'familyOrBaseGroup'
		];
		let resourceIndex = 0;
		let extraFieldIndex = 0;
		for (let resourceField of resourceFields) {
			if (item[resourceField]) {
				item[`resourceName${resourceIndex}`] = resourceField;
				item[`resourceLink${resourceIndex}`] = item[resourceField];
				resourceIndex++;
			}
		}
		item.resourceIndex = resourceIndex;
		for (let extraField of extraFields) {
			if (item[extraField]) {
				item[`extraFieldName${extraFieldIndex}`] = extraField;
				item[`extraFieldValue${extraFieldIndex}`] = item[extraField];
				extraFieldIndex++;
			}
			delete item[extraField];
		}
		item.resourceIndex = resourceIndex;
		item.extraFieldIndex = extraFieldIndex;
		item.keywords = [];
		if (item.listPrice) {
			item.listPrice = item.listPrice.replace('$', '');
			item.unitOfMeasure = 'USD';
		}
		item.vendorCategory = item.category;
		item.productCategory = elkayCategoryMapper[item.category];
		const fields = Object.keys(item);
		const filteredObj = {};
		for (field of fields) {
			if (item[field]) filteredObj[field] = item[field];
		}
		return filteredObj;
	});

	for (let item of data) {
		const t = await sequelize.transaction();
		try {
			if (item.itemNumber === undefined || item.itemNumber === null) {
				item.itemNumber = Math.random()
					.toString(36)
					.substring(2, 15)
					.toUpperCase();
				item.masterSKU = `ELK${item.itemNumber}`;
				item.isArchieve = true;
			}
			const isExist = await BasicProductDetail.count({
				where: { itemNumber: item.itemNumber },
				transaction: t
			});
			if (isExist <= 0) {
				let imageNameItemAlt = '';
				if (item.imageNameItem) {
					const response = await download(item.imageNameItem);
					console.log(response.error);
					if (response.error)
						return res
							.status(500)
							.json({ message: 'Unable to Upload Images.' });
					item.imageNameItem = response.Data.key;
				}
				for (let i = 1; i < 20; i++) {
					if (item[`imageNameItemAlt${i}`]) {
						const response = await download(item[`imageNameItemAlt${i}`]);
						console.log(response.error);
						if (response.error)
							return res
								.status(500)
								.json({ message: 'Unable to Upload Images.' });
						if (item[`imageNameItemAlt${i + 1}`])
							imageNameItemAlt += response.Data.key + ', ';
						else imageNameItemAlt += response.Data.key;
					}
					delete item[`imageNameItemAlt${i}`];
				}
				item.imageNameItemAlt = imageNameItemAlt;
				let brand = await Brand.findOne({
					where: {
						brandShortName: item.brandShortName
					},
					transaction: t
				});
				if (!brand) {
					console.log(`Creating Brand!!!!`);
					brand = await Brand.create(
						{
							brandShortName: item.brandShortName,
							brandLongName: item.brandShortName,
							imageNameBrandLogo: item.imageNameBrandLogo
						},
						{ transaction: t }
					);
				}
				item.brandId = brand.id;
				console.log(item);
				const product = await BasicProductDetail.create(item, {
					transaction: t
				});
				item.basicProductDetailId = product.id;
				await AdditionalProductDetail.create(item, { transaction: t });
				await Catalog.create(item, { transaction: t });
				await ImageDetail.create(item, { transaction: t });
				await Manufacturer.create(item, { transaction: t });
				await Measurement.create(item, { transaction: t });
				await PriceAndCost.create(item, { transaction: t });
				await ProductClass.create(item, { transaction: t });
				await Selling.create(item, { transaction: t });
				await UPC.create(item, { transaction: t });
				await Usage.create(item, { transaction: t });
				await VendorProducts.create(
					{ basicProductDetailId: product.id, vendorId: 60 },
					{ transaction: t }
				);
				//? Product Resources.
				for (let i = 0; i <= item.resourceIndex; i++) {
					if (item[`resourceLabel${i}`]) {
						await ProductResource.create(
							{
								name: item[`resourceName${i}`],
								link: item[`resourceLink${i}`],
								basicProductDetailId: product.id
							},
							{ transaction: t }
						);
					}
				}
				//? Extra Details
				for (let i = 0; i <= item.extraFieldIndex; i++) {
					if (item[`extraFieldName${i}`]) {
						await ExtraProductDetail.create(
							{
								property: item[`extraFieldName${i}`],
								value: item[`extraFieldValue${i}`],
								basicProductDetailId: product.id
							},
							{ transaction: t }
						);
					}
				}
				await t.commit();
			}
		} catch (error) {
			await t.rollback();
			console.log(error);
			return res.status(500).send(`Something Went Wrong!!!`);
		}
	}
	return res.status(200).json({ message: 'Products Imported successfully' });
};

function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

//? Assign Vendor Products
const assignVendorCategories = async (req, res) => {
	const jsonProducts = await csv().fromFile(req.file.path);
	fs.unlink(req.file.path, (err) => {});
	let obj = {};
	for (let item of jsonProducts) obj[item["Product Category"]] = [];
	return res.status(200).json(obj);
};

// SELECT * FROM public."basicProductDetails" AS A INNER JOIN public."productVariants" AS B ON A.id = B."basicProductDetailId"
// INNER JOIN public.variants AS C ON C.id = B."variantId" ORDER BY A.id DESC LIMIT 10;

module.exports = {
	newProduct: newProduct,
	deleteProduct: deleteProduct,
	getProductDetails: getProductDetails,
	editProduct: editProduct,
	filterProduct: finalFilter,
	//filterdata:filterdata,
	skuSearch: skuSearch,
	brandSearchfilter: brandSearchfilter,
	vendorSearchfilter: vendorSearchfilter,
	importProducts: importProducts,
	searchProduct: searchProduct,
	getProducts: getProducts,
	getDetailedProducts: getDetailedProducts,
	normalizeProduct: normalizeProduct,
	mapCategories: mapCategories,
	mapTrueProducts: mapTrueProducts,
	exportProducts: exportProducts,
	searchProductMinimal: searchProductMinimal,
	assignVendorCategories: assignVendorCategories,
	importDHProducts: importDHProducts,
	deleteProductDetails: deleteProductDetails,
	importGlobalProducts: importGlobalProducts,
	fetchImage: fetchandUploadImage,
	importKrollProducts: importKrollProducts,
	importHoshizakiProducts: importHoshizakiProducts,
	importElkayProducts: importElkayProducts
};
