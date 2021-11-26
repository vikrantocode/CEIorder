const fs = require('fs');
const Brand = require('../../models/Brand');
const Sequelize = require('sequelize');
const { fn, col, or, Op, QueryTypes, where, cast } = require('sequelize');
const sequelize = require('../../config/database');
const BasicProductDetail = require('../../models/BasicProductDetail');
const {
	uploadImages,
	deleteImages,
	uploadImage,
	uploadProductImages
} = require('../AWS/aws.helper');
//? To Get All Brands.
const getBrands = async (req, res) => {
	const page = req.params.page || 1;
	const perPage = req.query.pagesize || 15;
	let columnOrder = req.query.orderBy || 'id';
	let orderManner = req.query.orderManner || 'ASC';
	let searchItem = req.query.search || '';
	if (columnOrder === 'productscount') order = 'productscount';
	else order = `p."${columnOrder}"`;
	try {
		const { fn, col, or, Op, QueryTypes, where, cast } = require('sequelize');
		let count,
			orderField,
			results = [];
		console.log(order);
		console.log(order == 'id');
		if (order === 'productscount' || order === 'p."id"') orderField = order;
		else orderField = `LOWER(CAST(${order} AS VARCHAR))`;
		results = await sequelize.query(
			`SELECT p.id, p."brandShortName", p."brandLongName", p."imageNameBrandLogo", count(c) AS "productscount" FROM "brands" p INNER JOIN "basicProductDetails" c ON p.id=c."brandId" WHERE (p."brandShortName" ILIKE '%${searchItem}%' OR p."brandLongName" ILIKE '%${searchItem}%' OR CAST(p."id" AS VARCHAR) ILIKE '%${searchItem}%') GROUP BY p."id" ORDER BY ${orderField} ${orderManner} LIMIT '${perPage}' OFFSET ${
				(page - 1) * perPage
			};`,
			{ type: QueryTypes.SELECT }
		);
		count = await Brand.count({
			where: or(
				{
					brandShortName: {
						[Op.iLike]: `%${searchItem}%`
					}
				},
				{
					brandLongName: {
						[Op.iLike]: `%${searchItem}%`
					}
				},
				sequelize.where(sequelize.cast(sequelize.col('brands.id'), 'varchar'), {
					[Op.iLike]: `%${searchItem}%`
				})
			)
		});
		const totalPage = Math.ceil(count / perPage);
		return res.status(200).json({
			data: results,
			totalPage: totalPage,
			all: count,
			order
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send(`${error.name} : ${error.message}`);
	}
};

const getBrand = async (req, res) => {
	if (req.query.id.length === 0) {
		return res.status(200).json({
			status: true,
			data: [],
			message: 'no id found'
		});
	}

	console.log(req.query.id);
	console.log(req.query.id.length);
	if (req.query.id.length === 1) {
		const id = req.query.id;
		const brand = await Brand.findOne({ where: { id } });
		if (!brand)
			return res
				.status(404)
				.json({ error: 'There is no Brand with the provided Id!!!' });
		return res.status(200).json({
			status: true,
			data: [brand]
		});
	} else if (req.query.id.length > 1) {
		const id = req.query.id.split(',');
		console.log(id);
		const brand = [];
		for (let i of id) {
			if (i) {
				brand.push(await Brand.findOne({ where: { id: i } }));
			}
		}
		return res.status(200).json({
			status: true,
			data: brand
		});
	}
};

//Add new Brand
const addBrand = async (req, res) => {
	if (req.file) {
		uploadImage(req.file, 'productimages', async (obj) => {
			fs.unlink(req.file.path, (err) => {});
			if (obj.err) return res.status(500).Send('Unable to Upload Images.');
			req.body.imageNameBrandLogo = obj.Data.key.substr(
				obj.Data.key.indexOf('/') + 1
				
			);
			Brand.create(req.body).then((response) => {
				res
					.json({
						success: 'Brand added'
					})
					.catch((err) => {
						console.log(err);
						res.json({
							error: 'something went wrong!'
						});
					});
			});
		});
	}
	else{
		Brand.create(req.body).then((response) => {
				res
					.json({
						success: 'Brand added'
					})
					.catch((err) => {
						console.log(err);
						res.json({
							error: 'something went wrong!'
						});
					});
			});
		}
};

//edit Brand
const editBrand = async (req, res) => {
	const brand = await Brand.findOne({ where: { id: req.params.id } });
	if (!brand)
		return res
			.status(404)
			.json({ message: 'There is no Brand with the provided Id!!!' });
	if (req.file) {
		uploadImage(req.file, 'productimages', async (obj) => {
			fs.unlink(req.file.path, (err) => {});
			if (obj.err) return res.status(500).Send('Unable to Upload Images.');
			if (brand.imageNameBrandLogo)
				deleteImages(brand.imageNameBrandLogo, 'productimages', (obj) => {
					if (obj.err) console.log(obj.err);
				});
			req.body.imageNameBrandLogo = obj.Data.key.substr(
				obj.Data.key.indexOf('/') + 1
			);
			await brand.update(req.body);
			return res.status(200).json({ message: 'Brand Updated Successfully' });
		});
	} else {
		await brand.update(req.body);
		return res.status(200).json({ message: 'Brand Updated Successfully' });
	}
};

const deleteBrand = async (req, res) => {
	console.log(req.query.id);
	if (typeof req.query.id == 'string') {
		Brand.destroy({ where: { id: req.query.id } }).then((response) => {
			console.log(response);
			res.json({
				success: 'Brand Deleted Successfully',
				data: response
			});
		});
	} else if (typeof req.query.id == 'object') {
		for (let i of req.query.id) {
			await Brand.destroy({ where: { id: i } });
		}
		res.json({
			success: 'All Brand Deleted Successfully'
		});
	}
};

//? To Get All Brands.
const getAllBrands = async (req, res) => {
	const brands = await Brand.findAll({});
	return res.status(200).json(brands);
};

// GET Brands
const get_brand = async (req, res) => {
	Brand.findAll({})
    .then((response) => {
      // console.log(response)
      res.json({
        data: response,
      });
    })
    .catch((err) => {
      res.json({
        error: "something went wrong!",
      });
    });
};

module.exports = {
	getBrands: getBrands,
	getAllBrands: getAllBrands,
	getBrand: getBrand,
	get_brand: get_brand, 
	addBrand: addBrand,
	editBrand: editBrand,
	deleteBrand: deleteBrand
	
};
