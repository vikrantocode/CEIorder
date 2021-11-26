const { Op, fn, col } = require('sequelize');
const { isArray } = require('lodash-contrib');
const sequelize = require('../../../config/database');
const AdditionalProductDetail = require('../../../models/AdditionalProductDetail');
const BasicProductDetail = require('../../../models/BasicProductDetail');
const Catalog = require('../../../models/Catalog');
const ImageDetail = require('../../../models/ImageDetail');
const Manufacturer = require('../../../models/Manufacturer');
const Measurement = require('../../../models/Measurement');
const PriceAndCost = require('../../../models/PriceAndCost');
const ProductClass = require('../../../models/ProductClass');
const Selling = require('../../../models/Selling');
const UPC = require('../../../models/UPC');
const Usage = require('../../../models/Usage');
const { VendorProducts } = require('../../../models/Vendor');
const Brand = require('../../../models/Brand')
const Product = require('../../../models/Product')

//? Create New Product(s)
const createProduct = async (req, res) => {
	const data = req.body;
	if (isArray(data)) {
		const t = await sequelize.transaction();
		try {
			for (let tempProduct of data) {
				const isExist = await BasicProductDetail.count({
					where: { itemNumber: tempProduct.itemNumber }
				});
				if (!isExist) {
					tempProduct.keywords = [];
					const product = await BasicProductDetail.create(tempProduct, {
						transaction: t
					});
					tempProduct.basicProductDetailId = product.id;
					await AdditionalProductDetail.create(tempProduct, { transaction: t });
					await Catalog.create(tempProduct, { transaction: t });
					await ImageDetail.create(tempProduct, { transaction: t });
					await Manufacturer.create(tempProduct, { transaction: t });
					await Measurement.create(tempProduct, { transaction: t });
					await PriceAndCost.create(tempProduct, { transaction: t });
					await ProductClass.create(tempProduct, { transaction: t });
					await Selling.create(tempProduct, { transaction: t });
					await UPC.create(tempProduct, { transaction: t });
					await Usage.create(tempProduct, { transaction: t });
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
			if (!isExist) {
				const product = await BasicProductDetail.create(req.body, {
					transaction: t
				});
				req.body.basicProductDetailId = product.id;
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

//? List All Products
const getProducts = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const pageSize = parseInt(req.query.pageSize) || 100;
	let newData = []
	try {
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
				{ model: Usage },
				
				

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
		for (let i=0 ; i<data.length; i++){
			let obj = data[i]
			let brandid = obj['brandId'];
			if (brandid && brandid != null){
				const brand = product = await Brand.findOne({
					where: { id:brandid },
				});
				obj["dataValues"]['brandShortName']=brand.brandShortName
			} else{
				obj["dataValues"]['brandShortName'] = null
			}
			
			newData.push(obj)
		}
		
		const count = await BasicProductDetail.count({})
		const { id: lastId } = await BasicProductDetail.findOne({
			attributes: ['id'],
			order: [['id', 'DESC']]
		});
		
		res.status(200).json({
			data:newData,
			count,
			lastId
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send(`Something Went Wrong!!!`);
	}
};

//? Get Specific Product Details
const getProduct = async (req, res) => {
	const id = req.params.id;
	try {
		const product = await BasicProductDetail.findOne({
			where: { id },
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
			]
		});
		if (!product)
			return res
				.status(404)
				.send(`There is No Product Associated with Provided Id`);
		return res.status(200).json(product);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Something Went Wrong!');
	}
};

//? Helper Function to Find difference in Vendors
const sub = (x, y) => {
	myArray = x.filter(function (el) {
		return y.indexOf(el) < 0;
	});
	return myArray;
};

//? Update Product Details
const updateProduct = async (req, res) => {
	var data = req.body;
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
		const vendors = await VendorProducts.findAll({
			attributes: ['vendorId'],
			where: { basicProductDetailId: req.params.id }
		});
		let oldVendors = [];
		oldVendors = vendors.map((vendor) => vendor.vendorId);
		console.log(oldVendors);
		insertVendors = sub(newVendors, oldVendors);
		deleteVendors = sub(oldVendors, newVendors);
	}
	const t = await sequelize.transaction();
	try {
		await BasicProductDetail.update(data, {
			where: { id: req.params.id },
			transaction: t
		});
		insertVendors.forEach(async (vendorId) => {
			await VendorProducts.create(
				{ basicProductDetailId: req.params.id, vendorId },
				{ transaction: t }
			);
		});
		deleteVendors.forEach(async (vendorId) => {
			await VendorProducts.destroy({ where: { vendorId } }, { transaction: t });
		});
		await AdditionalProductDetail.update(data, {
			where: { basicProductDetailId: req.params.id },
			transaction: t
		});
		await Catalog.update(data, {
			where: { basicProductDetailId: req.params.id },
			transaction: t
		});
		await ImageDetail.update(data, {
			where: { basicProductDetailId: req.params.id },
			transaction: t
		});
		await Manufacturer.update(data, {
			where: { basicProductDetailId: req.params.id },
			transaction: t
		});
		await Measurement.update(data, {
			where: { basicProductDetailId: req.params.id },
			transaction: t
		});
		await PriceAndCost.update(data, {
			where: { basicProductDetailId: req.params.id },
			transaction: t
		});
		await ProductClass.update(data, {
			where: { basicProductDetailId: req.params.id },
			transaction: t
		});
		await Selling.update(data, {
			where: { basicProductDetailId: req.params.id },
			transaction: t
		});
		await UPC.update(data, {
			where: { basicProductDetailId: req.params.id },
			transaction: t
		});
		await t.commit();
		res.status(200).json({
			success: 'Product Updated'
		});
	} catch (err) {
		await t.rollback();
		console.log(err);
		res.status(500).json({
			error: 'Something went wrong!'
		});
	}
};

//? Delete Product(s)
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
			console.log(response);
			console.log(oldImgs);
			//? Delete Product Images
			//axios.post(`http://cdn.linqusacorp.com/productimages/delete`, { oldimg : oldImgs }).then(resp => {
			return res.json({
				success: 'Deleted Successfully'
			});
			//})
		});
	} else if (typeof req.query.id == 'object') {
		for (let id of req.query.id) {
			const product = await BasicProductDetail.findOne({
				where: { id },
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
			//? Delete Product Images
			//await axios.post(`http://cdn.linqusacorp.com/productimages/delete`, { oldimg : oldImgs })
		}
		res.json({
			success: 'Deleted Successfully'
		});
	}
};

const getCount = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const pageSize = parseInt(req.query.pageSize) || 100;
	try {
		const data = await BasicProductDetail.count({
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
		const count = await BasicProductDetail.count({});
		res.status(200).json({
			data
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send(`Something Went Wrong!!!`);
	}
};

module.exports = {
	getProducts: getProducts,
	getProduct: getProduct,
	createProduct: createProduct,
	updateProduct: updateProduct,
	deleteProduct: deleteProduct,
	getCount: getCount
};
