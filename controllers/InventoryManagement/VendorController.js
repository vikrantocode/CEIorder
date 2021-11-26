const { fn, col, or, Op, QueryTypes, where, cast } = require('sequelize');
const sequelize = require('../../config/database');
const BasicProductDetail = require('../../models/BasicProductDetail');
const ImageDetail = require('../../models/ImageDetail');
const PriceAndCost = require('../../models/PriceAndCost');
const { Vendor, VendorProducts } = require('../../models/Vendor');
const VendorAddress = require('../../models/VendorAddress');
const Warehouse = require('../../models/Warehouse');

const addVendor = async (req, res) => {
	const { productIds } = req.body;
	const t = await sequelize.transaction();
	try {
		const { id: vendorId } = await Vendor.create(req.body, { transaction: t });
		req.body.vendorId = vendorId;
		await VendorAddress.create(req.body, { transaction: t });
		for (let basicProductDetailId of productIds) {
			await VendorProducts.create(
				{ vendorId, basicProductDetailId },
				{ transaction: t }
			);
		}
		await t.commit();
		return res.status(201).json({ success: `Vendor Added Successfully!!!` });
	} catch (error) {
		await t.rollback();
		console.log(error);
		return res.status(400).json({ error: `Something Went Wrong` });
	}
};

const getVendors = async (req, res) => {
	const page = req.params.page || 1;
	const perPage = req.query.pageSize || 15;
	let columnOrder = req.query.orderBy || 'id';
	let orderManner = req.query.orderManner || 'ASC';
	let searchItem = req.query.searchItem;
	if (columnOrder === 'productscount') order = 'productscount';
	else order = `p."${columnOrder}"`;
	try {
		let count,
			orderField,
			results = [],
			vendorDetails = [];
		if (order === 'productscount') orderField = order;
		else orderField = `LOWER(CAST(${order} AS VARCHAR))`;
		results = await sequelize.query(
			`SELECT p.id, p.name, p.email, count(c) AS "productscount" FROM "vendors" p 
            LEFT JOIN "vendorProducts" c ON p.id=c."vendorId"
            WHERE (p."name" ILIKE '%${searchItem}%' OR 
                   p."alias" ILIKE '%${searchItem}%' OR 
                   p."email" ILIKE '%${searchItem}%' OR 
                   CAST(p."id" AS VARCHAR) ILIKE '%${searchItem}%') 
            GROUP BY p."id"
                   ORDER BY ${orderField} ${orderManner} 
                   LIMIT '${perPage}' 
                   OFFSET ${(page - 1) * perPage};
            `,
			{ type: QueryTypes.SELECT }
		);
		count = await Vendor.count({
			where: or(
				{
					name: {
						[Op.iLike]: `%${searchItem}%`
					}
				},
				{
					alias: {
						[Op.iLike]: `%${searchItem}%`
					}
				},
				{
					email: {
						[Op.iLike]: `%${searchItem}%`
					}
				},
				sequelize.where(
					sequelize.cast(sequelize.col('vendors.id'), 'varchar'),
					{ [Op.iLike]: `%${searchItem}%` }
				)
			)
		});
		for (let result of results) {
			const brand = await sequelize.query(
				`SELECT COUNT(DISTINCT "brandId") FROM "basicProductDetails" 
				WHERE id IN (SELECT "basicProductDetailId" FROM "vendorProducts" 
				WHERE "vendorId" = '${result.id}');`,
				{ type: QueryTypes.SELECT }
			);
			result.brandCount = brand[0].count;
			vendorDetails.push(result);
			console.log(vendorDetails);
		}
		const totalPage = Math.ceil(count / perPage);
		return res.status(200).json({
			data: vendorDetails,
			totalPage: totalPage,
			all: count
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send(`${error.name} : ${error.message}`);
	}
};

const getVendor = async (req, res) => {
	const id = parseInt(req.params.id);
	const vendor = await Vendor.findOne({
		include: [
			{
				model: VendorAddress
			},
			{
				model: Warehouse
			}
		],
		where: { id }
	});
	const products = await vendor.getBasicProductDetails({
		attributes: [
			'id',
			'description25Char',
			'brandId',
			'itemNumber',
			'packQuantity'
		],
		include: [
			{
				model: ImageDetail,
				attributes: ['imageNameItem']
			},
			{
				model: PriceAndCost,
				attributes: ['listPrice', 'costColumn1Price']
			}
		],
		order: [['id', 'DESC']],
		limit: 30,
		offset: 0
	});
	const productIds = await vendor.getBasicProductDetails({
		attributes: ['id']
	});
	if (!vendor)
		return res
			.status(404)
			.json({ error: 'There is no Vendor with the Provided Id.' });
	const productCount = await BasicProductDetail.count({
		where: { vendorId: id }
	});
	return res.status(200).json({ vendor, productCount, products, productIds });
};

const deleteVendor = async (req, res) => {
	if (typeof req.query.id == 'string') {
		const vendor = await Vendor.findOne({
			where: { id: req.query.id }
		});
		await vendor.destroy();
		return res.status(200).json({ success: 'Vendor Deleted Successfully!!!' });
	} else if (typeof req.query.id == 'object') {
		for (let i of req.query.id) {
			const vendor = await Vendor.findOne({
				where: { id: i }
			});
			await vendor.destroy();
		}
		res.status(200).json({
			success: 'Vendors Deleted Successfully!!!'
		});
	}
};

const sub = (x, y) => {
	myArray = x.filter(function (el) {
		return y.indexOf(el) < 0;
	});
	return myArray;
};

const editVendor = async (req, res) => {
	const { productIds: newProductIds } = req.body;
	const vendor = await Vendor.findOne({
		where: { id: req.query.id }
	});
	const oldProductIds = await vendor.getBasicProductDetails({
		attributes: ['id']
	});
	const insertProducts = sub(newProductIds, oldProductIds);
	const deleteProducts = sub(oldProductIds, newProductIds);
	const t = await sequelize.transaction();
	try {
		insertProducts.forEach(async (basicProductDetailId) => {
			await VendorProducts.create(
				{ vendorId: req.query.id, basicProductDetailId },
				{ transaction: t }
			);
		});
		deleteProducts.forEach(async (basicProductDetailId) => {
			await VendorProducts.destroy({
				where: { vendorId: req.query.id, basicProductDetailId },
				transaction: t
			});
		});
		await Vendor.update(req.body, {
			where: { id: req.query.id },
			transaction: t
		});
		await VendorAddress.update(req.body, {
			where: { vendorId: req.query.id },
			transaction: t
		});
		await t.commit();
		res.status(200).json({
			success: 'Updated'
		});
	} catch (error) {
		await t.rollback();
		console.log(error);
		res.json({
			error: 'Something went wrong'
		});
	}
};

const getAllVendors = async (req, res) => {
	try {
		const vendors = await Vendor.findAll({});
		return res.status(200).json(vendors);
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: `Something Went Wrong!!!` });
	}
};

const getMinimalVendor = async (req, res) => {
	const id = parseInt(req.query.id);
	console.log(id);
	const vendor = await Vendor.findOne({ where: { id } });
	console.log(vendor);
	if (!vendor)
		return res
			.status(404)
			.json({ error: 'There is no Vendor with the provided Id!!!' });
	return res.status(200).json({
		status: true,
		data: vendor
	});
};

const getVendorProducts = async (req, res) => {
	const vendorId = parseInt(req.params.vendorId);
	const vendor = await Vendor.findOne({ where: { id: vendorId } });
	const page = parseInt(req.query.page) || 1;
	const products = await vendor.getBasicProductDetails({
		attributes: [
			'id',
			'description25Char',
			'brandId',
			'itemNumber',
			'packQuantity'
		],
		include: [
			{
				model: ImageDetail,
				attributes: ['imageNameItem']
			},
			{
				model: PriceAndCost,
				attributes: ['listPrice', 'costColumn1Price']
			}
		],
		order: [['id', 'DESC']],
		limit: 30,
		offset: (page - 1) * 30
	});
	return res.status(200).json(products);
};

const getVendorBrands = async (req, res) => {
	const vendorId = req.params.vendorId;
	const page = req.query.page || 1;
	const perPage = req.query.pageSize || 15;
	let columnOrder = req.query.orderBy || 'id';
	let orderManner = req.query.orderManner || 'ASC';
	let searchItem = req.query.searchItem || '';
	let order = columnOrder;
	const result = await sequelize.query(
		`SELECT * FROM "brands" WHERE id IN
		(SELECT DISTINCT "brandId" FROM "basicProductDetails" WHERE id IN
		(SELECT "basicProductDetailId" FROM "vendorProducts" WHERE "vendorId" = '${vendorId}'))
		AND ("brandShortName" ILIKE '%${searchItem}%' OR "brandLongName" ILIKE '%${searchItem}%' OR CAST(id AS VARCHAR) ILIKE '%${searchItem}%')
		ORDER BY "${order}" ${orderManner}
		LIMIT ${perPage} OFFSET ${(page - 1) * perPage};`,
		{ type: QueryTypes.SELECT }
	);
	const count = await sequelize.query(
		`SELECT count(id) FROM "brands" WHERE id IN
		(SELECT DISTINCT "brandId" FROM "basicProductDetails" WHERE id IN
		(SELECT "basicProductDetailId" FROM "vendorProducts" WHERE "vendorId" = '${vendorId}'))
		AND ("brandShortName" ILIKE '%${searchItem}%' OR "brandLongName" ILIKE '%${searchItem}%' OR CAST(id AS VARCHAR) ILIKE '%${searchItem}%');`,
		{ type: QueryTypes.SELECT }
	);
	return res.status(200).json({
		message: 'Brands Fetched Successfully',
		data: result,
		pageCount: Math.ceil(count[0].count / perPage),
		count: count[0].count
	});
};

module.exports = {
	addVendor: addVendor,
	getVendor: getVendor,
	getVendors: getVendors,
	deleteVendor: deleteVendor,
	editVendor: editVendor,
	getAllVendors: getAllVendors,
	getMinimalVendor: getMinimalVendor,
	getVendorProducts: getVendorProducts,
	getVendorBrands: getVendorBrands
};
