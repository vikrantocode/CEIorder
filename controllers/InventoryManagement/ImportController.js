//? Node Packages
const fs = require('fs');
const csv = require('csvtojson');
const _ = require('lodash-contrib');
//? Helper Methods
const download = require('../helperMethods/download.method');
//? Helper Objects
const sequelize = require('../../config/database');
const { Op, or, QueryTypes } = require('sequelize');

//? Mappers
const dupontMapper = require('../mappers/dupontMapper.json');
const honeywellMapper = require('../mappers/honeywellMapper.json');
const bestartMapper = require('../mappers/bestartMapper.json');
const deltaMapper = require('../mappers/deltaMapper.json');
const deltaCategoryMapper = require('../mappers/deltaCategoryMapper.json');
const bestartCategoryMapper = require('../mappers/bestartCategoryMapper.json');
const dewaltMapper = require('../mappers/dewaltMapper.json');
const dewaltCategoryMapper = require('../mappers/dewaltCategoryMapper.json');
const milwaukeeMapper = require('../mappers/milwaukeeMapper.json');
const milwaukeeCategoryMapper = require('../mappers/milwaukeeCategoryMapper.json');
const tacticalMapper = require('../mappers/511TacticalMapper.json');
const tacticalCategoryMapper = require('../mappers/511TacticalCategoryMapper.json');
const amerexMapper = require('../mappers/amerexMapper.json');
const amerexCategoryMapper = require('../mappers/amerexCategoryMapper.json');
const JPWCategoryMapper = require('../mappers/JPWCategoryMapper.json');
const JPWMapper = require("../mappers/JPWMapper.json");
const CarharttCategoryMapper = require('../mappers/CarharttCategoryMapper.json');
const CarharttMapper =  require('../mappers/CarharttMapper.json');
const AccuformCategoryMapper = require('../mappers/AccuformCategoryMapper.json')
const AccuformMapper = require('../mappers/AccuformMapper.json');
const moenCategoryMapper = require('../mappers/moenCategoryMapper.json');
const moenMapper = require('../mappers/moenMapper.json')


//? Models
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
const Categories = require('../../models/Categories');
const Brand = require('../../models/Brand');
const { VendorProducts } = require('../../models/Vendor');
const { Vendor } = require('../../models/Vendor');
const Variant = require('../../models/Variants');
const ProductVariant = require('../../models/ProductVariant');
const ProductGroup = require('../../models/ProductGroup');
const ProductResource = require('../../models/ProductResource');
const ExtraProductDetail = require('../../models/ExtraProductDetail');

//? Controller to Import Products from Honeywell Vendor.
const importHoneywellProducts = async (req, res) => {
	//? Convert CSV to JSON format.
	const jsonProducts = await csv().fromFile(req.file.path);
	//? Delete the CSV file.
	fs.unlink(req.file.path, (err) => {});
	//? Rename Fields and Perform a bit Modification.
	const data = jsonProducts.map((obj) => {
		const item = _.renameKeys(obj, honeywellMapper);
		let imageNameItemGroup = '';
		let keywords = '';
		for (let i = 1; i <= 12; i++) {
			if (item[`imageNameItemGroup${i + 1}`])
				imageNameItemGroup += item[`imageNameItemGroup${i}`] + ', ';
			imageNameItemGroup += item[`imageNameItemGroup${i}`];
		}
		for (let i = 1; i <= 5; i++) {
			if (`keyword${i + 1}`) keywords += item[`keyword${i}`] + ', ';
			keywords += item[`keyword${i}`];
		}
		if (item.itemNumber) {
			item.itemNumber = item.itemNumber.replace(/-/g, '_');
			item.masterSKU = `HON${item.itemNumber}`;
		}
		item.keywords = keywords.split(', ');
		item.productCategory =
			`${item.description25Char.toLocaleLowerCase()}`.indexOf('mask') === -1
				? [2147]
				: [2154];
		item.imageNameItemGroup = imageNameItemGroup;
		//? Remove the Unnecessary Fields.
		return _.omit(item, [
			'keyword1',
			'keyword2',
			'keyword3',
			'keyword4',
			'keyword5',
			'imageNameItemGroup1',
			'imageNameItemGroup2',
			'imageNameItemGroup3',
			'imageNameItemGroup4',
			'imageNameItemGroup5',
			'imageNameItemGroup6',
			'imageNameItemGroup7',
			'imageNameItemGroup8',
			'imageNameItemGroup9',
			'imageNameItemGroup10',
			'imageNameItemGroup11',
			'imageNameItemGroup12'
		]);
	});
	//? Interact with the Database.
	for (let item of data) {
		const t = await sequelize.transaction();
		try {
			//? Generate SKU if not Present.
			if (item.itemNumber === undefined || item.itemNumber === null) {
				item.itemNumber = Math.random()
					.toString(36)
					.substring(2, 15)
					.toUpperCase();
				item.masterSKU = `HON${item.itemNumber}`;
				item.isArchieve = true;
			}
			//? Checking for Product Already Exists of Not
			const isExist = await BasicProductDetail.count({
				where: { itemNumber: item.itemNumber },
				transaction: t
			});
			if (isExist <= 0) {
				//? Uploading imageNameItem to S3
				if (item.imageNameItem) {
					const response = await download(item.imageNameItem);
					console.log(response.error);
					if (response.error)
						return res
							.status(500)
							.json({ message: 'Unable to Upload Images.' });
					item.imageNameItem = response.Data.key;
				}
				let imageNameItemGroup = [];
				//? Uploading imageNameItemGroup Images to S3
				for (let image of item.imageNameItemGroup.split(', ')) {
					if (image) {
						const response = await download(image);
						console.log(response.error);
						if (response.error)
							return res
								.status(500)
								.json({ message: 'Unable to Upload Images.' });
						imageNameItemGroup.push(response.Data.key);
					}
				}
				item.imageNameItemGroup = imageNameItemGroup.join(', ');

				//? Making Entries in the Database.
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
					{ basicProductDetailId: product.id, vendorId: 61 },
					{ transaction: t }
				);
				const extraFields = [
					'UPC Case',
					'HTS Code',
					'Box Qty',
					'Case Qty',
					'SKU Status'
				];
				//? Making Entries in Extra Details Table
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
				//? If Particular Import was Successful
				await t.commit();
			}
		} catch (error) {
			//? If Particular Import was Failed
			await t.rollback();
			console.log(error);
			return res.status(500).send(`Something Went Wrong!!!`);
		}
	}
	//? If Import was Successful
	return res.status(200).json({ message: 'Products Imported successfully' });
};

//? Controller to Import Products from Dupont Vendor.
const importDupontProducts = async (req, res) => {
	//? Convert CSV to JSON format.
	const jsonProducts = await csv().fromFile(req.file.path);
	//? Delete the CSV file.
	fs.unlink(req.file.path, (err) => {});
	const data = jsonProducts.map((obj) => {
		const item = _.renameKeys(obj, dupontMapper);
		item.keywords = [];
		if (item.listPrice)
			item.listPrice = item.listPrice.substr(item.listPrice.indexOf('$') + 1);
		if (item.costColumn1Price)
			item.costColumn1Price = item.costColumn1Price.substr(
				item.costColumn1Price.indexOf('$') + 1
			);
		item.unitOfMeasure = 'USD';
		item.masterSKU = `DUP${item.itemNumber}`;
		item.productCategory = [2147];
		item.vendorCategory = 'Work Safety Protective Gear';
		const extraFields = ['OPTION CODE', 'CERTIFICATION', 'MTO/MTS'];
		let extraFieldIndex = 0;
		for (let extraField of extraFields) {
			if (item[extraField]) {
				item[`extraFieldName${extraFieldIndex}`] = extraField;
				item[`extraFieldValue${extraFieldIndex}`] = item[extraField];
				extraFieldIndex++;
			}
			delete item[extraField];
		}
		item.extraFieldIndex = extraFieldIndex;
		return item;
	});
	const t = await sequelize.transaction();
	try {
		for (let item of data) {
			//? Generate SKU if not Present.
			if (item.itemNumber === undefined || item.itemNumber === null) {
				item.itemNumber = Math.random()
					.toString(36)
					.substring(2, 15)
					.toUpperCase();
				item.masterSKU = `DUP${item.itemNumber}`;
				item.isArchieve = true;
			}
			const isExist = await BasicProductDetail.count({
				where: { itemNumber: item.itemNumber },
				transaction: t
			});
			//? Checking for Product Already Exists of Not
			if (isExist <= 0) {
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
							brandShortName: item.brandShortName
						},
						{ transaction: t }
					);
				}
				item.brandId = brand.id;
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
					{ basicProductDetailId: product.id, vendorId: 63 },
					{ transaction: t }
				);
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
				if (item.size) {
					const newVariant = {};
					const variant = await Variant.findOne({
						where: { name: 'size' },
						attributes: ['id']
					});
					if (!variant) {
						const { id: variantId } = await Variant.create(
							{ name: 'size' },
							{ attributes: ['id'] }
						);
						newVariant.variantId = variantId;
					} else {
						newVariant.variantId = variant.id;
					}
					newVariant.variantValue = item.size;
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
};

//? Helper method to Filter Unique Elements
function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

//? Controller to Import Products from BEstart Vendor.
const importBEstarProducts = async (req, res) => {
	//? Convert CSV to JSON format.
	const jsonProducts = await csv().fromFile(req.file.path);
	//? Delete the CSV file.
	fs.unlink(req.file.path, (err) => {});
	const data = jsonProducts.map((obj) => {
		const item = _.renameKeys(obj, bestartMapper);
		item.unitOfMeasure = 'USD';
		if (item.itemNumber) item.itemNumber = item.itemNumber.replace(/-/g, '_');
		if (item.listPrice)
			item.listPrice = item.listPrice.substr(item.listPrice.indexOf('$') + 1);
		if (item.costColumn1Price)
			item.costColumn1Price = item.costColumn1Price.substr(
				item.costColumn1Price.indexOf('$') + 1
			);
		const extraFields = [
			'Collection Portfolio',
			'LTL/Fedex',
			'Warranty',
			'Number of boxes',
			'categoryFR',
			'Box 1 Lenght',
			'Box 1 Width',
			'Box 1 Height',
			'Box 1 Weight',
			'Box 2 Lenght',
			'Box 2 Width',
			'Box 2 Height',
			'Box 2 Weight',
			'Box 3 Lenght',
			'Box 3 Width',
			'Box 3 Height',
			'Box 3 Weight',
			'Box 4 Lenght',
			'Box 4 Width',
			'Box 4 Height',
			'Box 4 Weight',
			'Box 5 Lenght',
			'Box 5 Width',
			'Box 5 Height',
			'Box 5 Weight',
			'Box 6 Lenght',
			'Box 6 Width',
			'Box 6 Height',
			'Box 6 Weight',
			'Box 7 Lenght',
			'Box 7 Width',
			'Box 7 Height',
			'Box 7 Weight',
			'Box 8 Lenght',
			'Box 8 Width',
			'Box 8 Height',
			'Box 8 Weight',
			'Box 9 Lenght',
			'Box 9 Width',
			'Box 9 Height',
			'Box 9 Weight',
			'Box 10 Lenght',
			'Box 10 Width',
			'Box 10 Height',
			'Box 10 Weight',
			'Box 11 Lenght',
			'Box 11 Width',
			'Box 11 Height',
			'Box 11 Weight',
			'Box 12 Lenght',
			'Box 12 Width',
			'Box 12 Height',
			'Box 12 Weight',
			'Box 13 Lenght',
			'Box 13 Width',
			'Box 13 Height',
			'Box 13 Weight',
			'Box 14 Lenght',
			'Box 14 Width',
			'Box 14 Height',
			'Box 14 Weight'
		];
		let vendorCategory = '';
		let categories = [];
		for (i = 1; i <= 2; i++) {
			if (item[`category${i}`]) {
				if (item[`category${i + 1}`])
					vendorCategory += item[`category${i}`] + ', ';
				else vendorCategory += item[`category${i}`];
				if (
					bestartCategoryMapper[item[`category${i}`]] ||
					bestartCategoryMapper[item[`category${i}`]] != undefined
				)
					categories = categories.concat(
						bestartCategoryMapper[item[`category${i}`]]
					);
			}
		}
		item.productCategory = categories.filter(onlyUnique);
		item.vendorCategory = vendorCategory;
		let extraFieldIndex = 0;
		for (let extraField of extraFields) {
			if (item[extraField]) {
				item[`extraFieldName${extraFieldIndex}`] = extraField;
				item[`extraFieldValue${extraFieldIndex}`] = item[extraField];
				extraFieldIndex++;
			}
			delete item[extraField];
		}
		item.extraFieldIndex = extraFieldIndex;
		let keywords = '';
		for (let i = 1; i <= 15; i++) {
			if (item[`keyword${i}`]) {
				if (item[`keyword${i + 1}`]) keywords += item[`keyword${i}`] + ', ';
				else keywords += item[`keyword${i}`];
			}
			delete item[`keyword${i}`];
		}
		if (!(keywords == '')) item.keywords = keywords.split(', ');
		else item.keywords = [];
		return _.omit(item, [
			'Product name FR',
			'Romance FR',
			'Color FR',
			'Catégorie meuble FR',
			'Key Feature FR 1',
			'Key Feature FR 2',
			'Key Feature FR 3',
			'Key Feature FR 4',
			'Key Feature FR 5',
			'Key Feature FR 6',
			'Key Feature FR 7',
			'Key Feature FR 8',
			'Key Feature FR 9',
			'Key Feature FR 10',
			'Key Feature FR 11',
			'Key Feature FR 12',
			'Key Feature FR 13',
			'Key Feature FR 14',
			'Key Feature FR 15'
		]);
	});
	for (let item of data) {
		const t = await sequelize.transaction();
		try {
			//? Generate SKU if not Present.
			if (item.itemNumber === undefined || item.itemNumber === null) {
				item.itemNumber = Math.random()
					.toString(36)
					.substring(2, 15)
					.toUpperCase();
				item.isArchieve = true;
			}
			item.masterSKU = `BES${item.itemNumber}`;
			const isExist = await BasicProductDetail.count({
				where: { itemNumber: item.itemNumber },
				transaction: t
			});
			//? Checking for Product Already Exists of Not
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
				if (item.imageNameSwatches) {
					const response = await download(item.imageNameSwatches);
					console.log(response.error);
					if (response.error)
						return res
							.status(500)
							.json({ message: 'Unable to Upload Images.' });
					item.imageNameSwatches = response.Data.key;
				}
				for (let i = 1; i <= 11; i++) {
					if (item[`imageNameGroup${i}`]) {
						const response = await download(item[`imageNameGroup${i}`]);
						console.log(response.error);
						if (response.error)
							return res
								.status(500)
								.json({ message: 'Unable to Upload Images.' });
						if (item[`imageNameGroup${i + 1}`])
							imageNameItemAlt += response.Data.key + ', ';
						else imageNameItemAlt += response.Data.key;
					}
					delete item[`imageNameGroup${i}`];
				}
				item.imageNameItemAlt = imageNameItemAlt;
				let brand = await Brand.findOne({
					where: {
						brandShortName: item.brandShortName
					},
					transaction: t
				});
				if (!brand) {
					brand = await Brand.create(
						{
							brandShortName: item.brandShortName
						},
						{ transaction: t }
					);
				}
				item.brandId = brand.id;
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
					{ basicProductDetailId: product.id, vendorId: 64 },
					{ transaction: t }
				);
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
			}
			await t.commit();
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: 'Something went wrong' });
		}
	}
	return res.status(200).json({ message: 'Products Imported Successfully' });
};

//? Controller to Import Products from Dewalt Vendor.
const importDewaltProducts = async (req, res) => {
	//? Convert CSV to JSON format.
	const jsonProducts = await csv().fromFile(req.file.path);
	//? Delete the CSV file.
	fs.unlink(req.file.path, (err) => {});
	const data = jsonProducts.map((obj) => {
		let item = _.renameKeys(obj, dewaltMapper);
		item.itemNumber = `DEW${item.itemNumber}`;
		item.masterSKU = `DEW${item.itemNumber}`;
		let vendorCategory = '';
		let categories = [];
		for (i = 1; i <= 2; i++) {
			if (item[`category${i}`]) {
				if (item[`category${i + 1}`])
					vendorCategory += item[`category${i}`] + ', ';
				else vendorCategory += item[`category${i}`];
				if (
					dewaltCategoryMapper[item[`category${i}`]] ||
					dewaltCategoryMapper[item[`category${i}`]] != undefined
				)
					categories = categories.concat(
						dewaltCategoryMapper[item[`category${i}`]]
					);
			}
		}
		item.productCategory = categories.filter(onlyUnique);
		item.vendorCategory = vendorCategory;
		item.keywords = [];
		const extraFields = [
			'Product Code',
			'SBU',
			'Date of Status Change',
			'Division',
			'Application Tool',
			'MOQ',
			'MTO',
			'Commodity Code',
			'Each Volume',
			'Master PackUPC Code',
			'Master Pack Qty',
			'Master Pack Length',
			'Master Pack Width',
			'Master Pack Height',
			'Master Pack Gross Weight',
			'Master Pack Volume',
			'Case UPC Code',
			'Case Qty',
			'Case Length',
			'Case Width',
			'Case Height',
			'Case Gross Weight',
			'Case Volume',
			'Pallet UPC Code',
			'Pallet Qty',
			'Pallet Length',
			'Pallet Width',
			'Pallet Height',
			'Pallet Gross Weight',
			'Pallet Volume',
			'PalletUnits',
			'PalletLayers',
			'Industry List',
			'Gold / 45% Off List',
			'List 4 Tariff  EFF 2-1-20',
			'List 4 - % Increase 2/1/20'
		];
		let extraFieldIndex = 0;
		for (let extraField of extraFields) {
			if (item[extraField]) {
				item[`extraFieldName${extraFieldIndex}`] = extraField;
				item[`extraFieldValue${extraFieldIndex}`] = item[extraField];
				extraFieldIndex++;
			}
			delete item[extraField];
		}
		item.extraFieldIndex = extraFieldIndex;
		return item;
	});
	for (let item of data) {
		const t = await sequelize.transaction();
		try {
			const isExist = await BasicProductDetail.count({
				where: { itemNumber: item.itemNumber },
				transaction: t
			});
			//? Checking for Product Already Exists of Not
			if (isExist <= 0) {
				let brand = await Brand.findOne({
					where: {
						brandShortName: item.brandShortName
					},
					transaction: t
				});
				if (!brand) {
					brand = await Brand.create(
						{
							brandShortName: item.brandShortName
						},
						{ transaction: t }
					);
				}
				item.brandId = brand.id;
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
					{ basicProductDetailId: product.id, vendorId: 62 },
					{ transaction: t }
				);
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
			}
			await t.commit();
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: 'Something went wrong' });
		}
	}
	return res.status(200).json({ message: 'Products Imported Successfully' });
};

const importMilwaukeeProducts = async (req, res) => {
	//? Convert CSV to JSON format.
	const jsonProducts = await csv().fromFile(req.file.path);
	//? Delete the CSV file.
	fs.unlink(req.file.path, (err) => {});
	const data = jsonProducts.map((obj) => {
		let item = _.renameKeys(obj, milwaukeeMapper);
		item.itemNumber = item.itemNumber.replace(/-/g, '_');
		item.masterSKU = `MIL${item.itemNumber}`;
		let vendorCategory = '';
		let categories = [];
		for (i = 1; i <= 3; i++) {
			if (item[`category${i}`]) {
				if (item[`category${i + 1}`])
					vendorCategory += item[`category${i}`] + ', ';
				else vendorCategory += item[`category${i}`];
				if (
					milwaukeeCategoryMapper[item[`category${i}`]] ||
					milwaukeeCategoryMapper[item[`category${i}`]] != undefined
				)
					categories = categories.concat(
						milwaukeeCategoryMapper[item[`category${i}`]]
					);
			}
			delete item[`category${i}`];
		}
		item.productCategory = categories.filter(onlyUnique);
		item.vendorCategory = vendorCategory;
		item.brandId = 1411;
		item.keywords = [];
		if (item.packQuantity == 'B') item.packQuantity = 1;
		item.unitOfMeasure = 'USD';
		if (item.listPrice) item.listPrice = item.listPrice.replace('$ ', '');
		if (item.costColumn1Price)
			item.costColumn1Price = item.costColumn1Price.replace('$ ', '');
		const extraFields = [
			'Inner Pack UPC',
			'Inner Pack Length',
			'Inner Pack Width',
			'Inner Pack Height',
			'Inner Pack Weight',
			'Inner Pack Quantity',
			'Master Pack UPC',
			'Master Pack Length',
			'Master Pack Width',
			'Master Pack Height',
			'Master Pack Weight',
			'Master Pack Quantity',
			'Business Unit',
			'Harmonized Tariff'
		];
		delete item['50% Off Price'];
		delete item['AX Item Number'];
		let extraFieldIndex = 0;
		for (let extraField of extraFields) {
			if (item[extraField] && item[extraField] != 'N/A') {
				item[`extraFieldName${extraFieldIndex}`] = extraField;
				item[`extraFieldValue${extraFieldIndex}`] = item[extraField];
				extraFieldIndex++;
			}
			delete item[extraField];
		}
		item.extraFieldIndex = extraFieldIndex;
		return item;
	});
	for (let item of data) {
		const t = await sequelize.transaction();
		try {
			const isExist = await BasicProductDetail.count({
				where: { itemNumber: item.itemNumber },
				transaction: t
			});
			//? Checking for Product Already Exists of Not
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
					{ basicProductDetailId: product.id, vendorId: 65 },
					{ transaction: t }
				);
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
			}
			await t.commit();
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: 'Something went wrong' });
		}
	}
	return res.status(200).json({ message: 'Products Imported Successfully' });
};

const importDeltaProducts = async (req, res) => {
	//? Convert CSV to JSON format.
	const jsonProducts = await csv().fromFile(req.file.path);
	//? Delete the CSV file.
	fs.unlink(req.file.path, (err) => {});
	const data = jsonProducts.map((obj) => {
		let item = _.renameKeys(obj, deltaMapper);
		item.masterSKU = `DEL${item.itemNumber}`;
		item.unitOfMeasure = 'USD';
		item.keywords = [];
		for (let i = 1; i <= 7; i++) {
			if (item[`keyword${i}`]) item.keywords.push(item[`keyword${i}`]);
			delete item[`keyword${i}`];
		}
		item.productCategory = deltaCategoryMapper[item.category];
		delete item.category;
		if (!item.prop65Indicator || !(item.prop65Indicator == 'T'))
			item.prop65Indicator = false;
		else item.prop65Indicator = true;
		const extraFields = [
			'Function',
			'Sub-Function',
			'Functional Series',
			'Series',
			'Finish',
			'Attribute',
			'Handle',
			'Break Case Allowed',
			'Footprint Code',
			'Full Cases Per Tier',
			'Full Pallet Quantity',
			'I2 Of 5 Code',
			'Master Carton Cubic Feet',
			'Number Of Tiers',
			'Focus Product',
			'Product Launch Year',
			'Available To Order Date',
			'Available To Ship Date',
			'Prod Obsolete Date',
			'Direct Replacement',
			'Recommended Replacement',
			'Prod Brand Cd',
			'Lead Free Compliant',
			'Type Cd',
			'Marketing Group Code',
			'Exclusive Customer Item',
			'Watersense',
			'GPM',
			'CalGreen',
			'CEC Certified',
			'Pricing Category',
			'MAP Enforced',
			'Minimum Advertised Price',
			'MAP Discount off List Price',
			'Minimum Advertised Price Effective',
			'In Delta Price Book',
			'In Brizo Price Book',
			'Harmonized Tariff Code'
		];
		const resourceFields = [
			'Handle References',
			'Default Rough Recommendation',
			'Product Detail Page',
			'Parts Diagram',
			'Maintenance & Installation',
			'SpecSheet'
		];
		let resourceIndex = 0;
		let extraFieldIndex = 0;
		for (let resourceField of resourceFields) {
			if (item[resourceField]) {
				item[`resourceName${resourceIndex}`] = resourceField;
				item[`resourceLink${resourceIndex}`] = item[resourceField];
				resourceIndex++;
			}
			delete item[resourceField];
		}
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
		return item;
	});
	for (let item of data) {
		const t = await sequelize.transaction();
		try {
			const isExist = await BasicProductDetail.count({
				where: { itemNumber: item.itemNumber },
				transaction: t
			});
			//? Checking for Product Already Exists of Not
			if (isExist <= 0) {
				if (item.imageNameItem) {
					const response = await download(item.imageNameItem);
					console.log(response.error);
					if (response.error)
						return res
							.status(500)
							.json({ message: 'Unable to Upload Images.' });
					item.imageNameItem = response.Data.key;
				}
				if (item.imageNameSKUGroup) {
					const response = await download(item.imageNameSKUGroup);
					console.log(response.error);
					if (response.error)
						return res
							.status(500)
							.json({ message: 'Unable to Upload Images.' });
					item.imageNameSKUGroup = response.Data.key;
				}
				if (item.imageThumbnailURL) {
					const response = await download(item.imageThumbnailURL);
					console.log(response.error);
					if (response.error)
						return res
							.status(500)
							.json({ message: 'Unable to Upload Images.' });
					item.imageThumbnailURL = response.Data.key;
				}
				if (item.imageNameItemAlt && item.imageNameItemAlt != '') {
					const images = item.imageNameItemAlt.split(';');
					let imageNameItemAlt = '';
					for (let i = 1; i < images.length; i++) {
						if (images[i]) {
							const response = await download(images[i]);
							console.log(response.error);
							if (response.error)
								return res
									.status(500)
									.json({ message: 'Unable to Upload Images.' });
							if (images[i + 1]) imageNameItemAlt += response.Data.key + ', ';
							else imageNameItemAlt += response.Data.key;
						}
					}
					item.imageNameItemAlt = imageNameItemAlt;
				}
				if (item.imageNameSKUGroup && item.imageNameSKUGroup != '') {
					const images = item.imageNameSKUGroup.split(';');
					let imageNameSKUGroup = '';
					for (let i = 1; i < images.length; i++) {
						if (images[i]) {
							const response = await download(images[i]);
							console.log(response.error);
							if (response.error)
								return res
									.status(500)
									.json({ message: 'Unable to Upload Images.' });
							if (images[i + 1]) imageNameSKUGroup += response.Data.key + ', ';
							else imageNameSKUGroup += response.Data.key;
						}
					}
					item.imageNameSKUGroup = imageNameSKUGroup;
				}
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
					{ basicProductDetailId: product.id, vendorId: 21 },
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
			}
			await t.commit();
		} catch (error) {
			await t.rollback();
			console.log(error);
			return res.status(500).send(`Something Went Wrong!!!`);
		}
	}
	return res.status(200).json({ message: 'Products Imported Successfully' });
};

const import511TacticalProducts = async (req, res) => {
	//? Convert CSV to JSON format.
	const jsonProducts = await csv().fromFile(req.file.path);
	//? Delete the CSV file.
	fs.unlink(req.file.path, (err) => {});
	const data = jsonProducts.map((obj) => {
		let item = _.renameKeys(obj, tacticalMapper);
		item.productCategory = tacticalCategoryMapper[item['vendorCategory']];
		item.itemNumber = item.itemNumber.replace(/-/g, '_');
		item.masterSKU = `TAC${item.itemNumber}`;
		item.keywords = [];
		if (item.listPrice)
			item.listPrice = item.listPrice.substr(item.listPrice.indexOf('$') + 2);
		if (item.costColumn1Price)
			item.costColumn1Price = item.costColumn1Price.substr(
				item.costColumn1Price.indexOf('$') + 2
			);
		if (item.MAPPPrice)
			item.MAPPPrice = item.MAPPPrice.substr(item.MAPPPrice.indexOf('$') + 2);
		if (item.MSRP) item.MSRP = item.MSRP.substr(item.MSRP.indexOf('$') + 2);
		const extraFields = [
			'Item Gender',
			'Item Market',
			'Item Division ID',
			'Item Status',
			'Item Life Cycle',
			'Item Final Season',
			'Item Color ID',
			'Item Color Name',
			'Item Size ID',
			'Item Dimension ID',
			'Item Wholesale Price',
			'Net Wholesale with NBI',
			'Dealer Margin %',
			'Item Material Name',
			'Item HTS Codes',
			'Item Schedule B',
			'Item Department ID',
			'Item Division ID2',
			'Item Class ID',
			'Item Unit',
			'Item Adopted Season',
			'Item Catalog Description',
			'Item Dimension Name',
			'Item Berry Compliant',
			'Item Group ID',
			'Item GSA/TAA Compliant',
			'Item Short Description'
		];
		let extraFieldIndex = 0;
		for (let extraField of extraFields) {
			if (item[extraField]) {
				item[`extraFieldName${extraFieldIndex}`] = extraField;
				item[`extraFieldValue${extraFieldIndex}`] = item[extraField];
				extraFieldIndex++;
			}
			delete item[extraField];
		}
		item.extraFieldIndex = extraFieldIndex;
		return item;
	});
	for (let item of data) {
		const t = await sequelize.transaction();
		try {
			const isExist = await BasicProductDetail.count({
				where: { itemNumber: item.itemNumber },
				transaction: t
			});
			//? Checking for Product Already Exists of Not
			if (isExist <= 0) {
				if (item.brandShortName) {
					let brand = await Brand.findOne({
						where: {
							brandShortName: item.brandShortName
						},
						transaction: t
					});
					if (!brand) {
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
				}
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
					{ basicProductDetailId: product.id, vendorId: 67 },
					{ transaction: t }
				);
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
				// Introduce Variant
				if (item.Style) {
					const newVariant = {};
					const variant = await Variant.findOne({
						where: { name: 'style' },
						attributes: ['id']
					});
					if (!variant) {
						const { id: variantId } = await Variant.create(
							{ name: 'style' },
							{ attributes: ['id'] }
						);
						newVariant.variantId = variantId;
					} else {
						newVariant.variantId = variant.id;
					}
					newVariant.variantValue = item.Style;
					newVariant.basicProductDetailId = product.id;
					newVariant.listPrice = item.listPrice;
					newVariant.costColumn1Price = item.costColumn1Price;
					await ProductVariant.create(newVariant, { transaction: t });
				}
			} else {
				const product = await BasicProductDetail.findOne({
					where: { itemNumber: item.itemNumber },
					attributes: ['id']
				});
				// Introduce Variant
				if (item.Style) {
					const newVariant = {};
					const variant = await Variant.findOne({
						where: { name: 'style' },
						attributes: ['id']
					});
					if (!variant) {
						const { id: variantId } = await Variant.create(
							{ name: 'style' },
							{ attributes: ['id'] }
						);
						newVariant.variantId = variantId;
					} else {
						newVariant.variantId = variant.id;
					}
					newVariant.variantValue = item.Style;
					newVariant.basicProductDetailId = product.id;
					newVariant.listPrice = item.listPrice;
					newVariant.costColumn1Price = item.costColumn1Price;
					await ProductVariant.create(newVariant, { transaction: t });
				}
			}
			await t.commit();
		} catch (error) {
			await t.rollback();
			console.log(error);
			return res.status(500).send(`Something Went Wrong!!!`);
		}
	}
	return res.status(200).json({ data });
};

//? Controller to Import Products from Amerex Fire Vendor.
const importAmerexProducts = async (req, res) => {
	//? Convert CSV to JSON format.
	const jsonProducts = await csv().fromFile(req.file.path);
	//? Delete the CSV file.
	fs.unlink(req.file.path, (err) => {});
	let data = jsonProducts.map((obj) => {
		const item = _.renameKeys(obj, amerexMapper);
		//let imageNameItemGroup = '';
		let keywords = '';
		if (item.listPrice)
			item.listPrice = item.listPrice.substr(item.listPrice.indexOf('$') + 1);
		if (item.itemNumber) {
			//item.itemNumber = item.itemNumber.replace(/-/g, '_');
			item.masterSKU = `AME${item.itemNumber}`;
		} else {
			if (item.itemNumber === undefined || item.itemNumber === null) {
				item.itemNumber = Math.random()
					.toString(36)
					.substring(2, 15)
					.toUpperCase(); 
				item.masterSKU = `AME${item.itemNumber}`;
				item.isArchieve = true;
			}
		}
		item.keywords = [];
		item.unitOfMeasure = 'USD';
		item.vendorCategory
		//item.productId
		item.category = amerexCategoryMapper[item.vendorCategory]
		const extraFields = ['Unit Rating','Product Number']
		let extraFieldIndex = 0;
		for (let extraField of extraFields) {
			if (item[extraField]) {
				item[`extraFieldName${extraFieldIndex}`] = extraField;
				item[`extraFieldValue${extraFieldIndex}`] = item[extraField];
				extraFieldIndex++;
			}
			delete item[extraField];
		}
		item.extraFieldIndex = extraFieldIndex;
		console.log(item);
		return item;
	});
	for(let item of data){
		const t = await sequelize.transaction();
		   try {
			   const isExist = await BasicProductDetail.count({
				   where: { itemNumber: item.itemNumber },
				   transaction: t
			   });
			 
		   //? Checking for Product Already Exists of Not
		   if (isExist <= 0) {
			if (item.imageNameItem) {
				const response = await download(item.imageNameItem);
				console.log(response.error);
				if (response.error)
					return res
						.status(500)
						.json({ message: 'Unable to Upload Images.' });
				item.imageNameItem = response.Data.key;
			}
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
				   { basicProductDetailId: product.id, vendorId: 66 },
				   { transaction: t }
			   );
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
			   	// product group section
		let group = await ProductGroup.count({
			where: { name:{ [Op.iLike]: item.Group } },
			transaction: t
		});
		if (!group) {
			console.log(`Creating group!!!!`);
			group = await ProductGroup.create(
				{
					name: item.Group
				},
				{ transaction: t }
			);
		}

		//item.imageNameItemGroup = imageNameItemGroup;
		//? Remove the Unnecessary Fields.
		 _.omit(item, [
			'Unit Rating'
		]);
		   }

		   await t.commit();
		   } catch (error) {
			   console.log(`${error}================================================================================`);
		   return res.status(500).json({ message: 'Something went wrong', error: error });
		   }
	   }

	//console.log(data);
	return res.status(200).json({
		// data:data,
		message:'json object Amerex'
	})
};

//? Controller to Import Products from JWP Vendor.

const importJPWProducts = async (req, res) => {
	//? Convert CSV to JSON format.
	const jsonProducts = await csv().fromFile(req.file.path);
	//? Delete the CSV file.
	fs.unlink(req.file.path, (err) => {});
	let data = jsonProducts.map((obj) => {
		const item = _.renameKeys(obj, JPWMapper);

		let vendorCategory = '';
		let categories = [];
		for (i = 1; i <= 4; i++) {
			if (item[`category${i}`]) {
				if (item[`category${i + 1}`])
					vendorCategory += item[`category${i}`] + ', ';
				else vendorCategory += item[`category${i}`];
				if (
					JPWCategoryMapper[item[`category${i}`]] ||
					JPWCategoryMapper[item[`category${i}`]] != undefined
				)
					categories = categories.concat(
						JPWCategoryMapper[item[`category${i}`]]
					);
			}
		}
		
		item.productCategory = categories.filter(onlyUnique);
		item.vendorCategory = vendorCategory;
		
		let keywords = '';
		if (item.listPrice)
			item.listPrice = item.listPrice.substr(item.listPrice.indexOf('$') + 1);
		if (item.itemNumber) {
			//item.itemNumber = item.itemNumber.replace(/-/g, '_');
			item.masterSKU = `JPW${item.itemNumber}`;
		} else {
			if (item.itemNumber === undefined || item.itemNumber === null) {
				item.itemNumber = Math.random()
					.toString(36)
					.substring(2, 15)
					.toUpperCase(); 
				item.masterSKU = `JPW${item.itemNumber}`;
				item.isArchieve = true;
			}
		}

		for (let i = 1; i <= 10; i++) {
			if (`keyword${i + 1}`) keywords += item[`keyword${i}`] + '#';
			keywords += item[`keyword${i}`];
		}
		item.keywords = keywords.split('#');

		item.unitOfMeasure = 'USD';

		item.productId
		
		const extraFields = [
			"SAP Owner",
			"SAP Division",
			"Cutting Blade Length (In.)",
			"Overall Dimensions (H x W x D) (In.)",
			"Net Weight (Lbs.)",
			"Sheet Capacity (Mild Steel) (In.)",
			"Shearing Length Capacity (In.)",
			"Mild Steel Capacity (Gauge)",
			"Front Gauge Capacity (In.)",
			"Ready For Web (US)",
			"Strokes Per Minute (Full Length)",
			"Max. Soft. Alloy Capacity (Gauge)",
			"Flat Capacity (Mild Steel) (In.)",
			"Air Consumption (CFM)",
			"Round Capacity (Mild Steel) (In.)",
			"Microsite URL",
			"Web Promo Code",
			"SAP Replacement Stock Number",
			"Easy2 URL",
			"SAP Material Group",
			"SAP Rounding Profile",
			"New Product",
			"Web Description",
			"Web Meta Description",
			"Web Meta Keywords",
			"Flat Capacity (Mild Steel) (In.)",
			"Price Book",
			"SAP DChain Status",
			"Prop 65",
			"SAP Net Weight",
		];
		let extraFieldIndex = 0;
		for (let extraField of extraFields) {
			if (item[extraField]) {
				item[`extraFieldName${extraFieldIndex}`] = extraField;
				item[`extraFieldValue${extraFieldIndex}`] = item[extraField];
				extraFieldIndex++;
			}
			delete item[extraField];
		}
		item.extraFieldIndex = extraFieldIndex;
		console.log(item);
		return item;
	});
	for(let item of data){
		const t = await sequelize.transaction();
		   try {
			   const isExist = await BasicProductDetail.count({
				   where: { itemNumber: item.itemNumber },
				   transaction: t
			   });
			 
		   //? Checking for Product Already Exists of Not
		   if (isExist <= 0) {
			    
			if (item.brandShortName) {
					let brand = await Brand.findOne({
						where: {
							brandShortName: item.brandShortName
						},
						transaction: t
					});
					if (!brand) {
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
				}
			if (item.imageNameItem) {
				const response = await download(item.imageNameItem);
				console.log(response.error);
				if (response.error)
					// item.imageNameItem = brand.imageNameBrandLogo;
					return res
						.status(500)
						.json({ message: 'Unable to Upload Images.' });
				item.imageNameItem = response.Data.key;
			}else{
				// let brand = await Brand.findOne({
				// 	where: {
				// 		brandShortName: item.brandShortName
				// 	},
				// 	transaction: t
				// });
				if (item.brandShortName) {
					let brand = await Brand.findOne({
						where: {
							brandShortName: item.brandShortName
						},
						transaction: t
					});
					item.imageNameItem = brand.imageNameBrandLogo;
				}
			}
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
				   { basicProductDetailId: product.id, vendorId: 68 },
				   { transaction: t }
			   );
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
			   	// product group section
		let group = await ProductGroup.count({
			where: { name:{ [Op.iLike]: item.Group } },
			transaction: t
		});
		if (!group) {
			console.log(`Creating group!!!!`);
			group = await ProductGroup.create(
				{
					name: item.Group
				},
				{ transaction: t }
			);
		}

		//item.imageNameItemGroup = imageNameItemGroup;
		//? Remove the Unnecessary Fields.
		//  _.omit(item, [
		// 	''
		// ]);
		   }

		   await t.commit();
		   } catch (error) {
			   console.log(`${error}================================================================================`);
		   return res.status(500).json({ message: 'Something went wrong', error: error });
		   }
	   }

	//console.log(data);
	return res.status(200).json({
		data:data,
		message:'json object JPW'
	})
};

//? Controller to Import Products from Carhartt Vendor.

const importCarharttProducts = async (req, res) => {
	//? Convert CSV to JSON format.
	const jsonProducts = await csv().fromFile(req.file.path);
	//? Delete the CSV file.
	fs.unlink(req.file.path, (err) => {});
	let data = jsonProducts.map((obj) => {
		const item = _.renameKeys(obj, CarharttMapper);

		
		let categories =item["category"];
		
		item.vendorCategory =categories;
		item.productCategory = CarharttCategoryMapper[item.vendorCategory];
		
		if (item.listPrice)
			item.listPrice = item.listPrice.substr(item.listPrice.indexOf('$') + 1);
		if (item.costColumn1Price)
			item.costColumn1Price = item.costColumn1Price.substr(
				item.costColumn1Price.indexOf('$') + 1
			);
			if (item.MAPPPrice)
			item.MAPPPrice = item.MAPPPrice.substr(
				item.MAPPPrice.indexOf('$') + 1
			);
		
		item.unitOfMeasure = 'USD';
			
		if (item.itemNumber) {
			item.masterSKU = `CAR${item.itemNumber}`;
		} else {
			if (item.itemNumber === undefined || item.itemNumber === null) {
				item.itemNumber = Math.random()
					.toString(36)
					.substring(2, 15)
					.toUpperCase(); 
				item.masterSKU = `CAR${item.itemNumber}`;
				item.isArchieve = true;
			}
		}

		item.keywords = [];
				
		const extraFields = [];		
		let extraFieldIndex = 0;
		for (let extraField of extraFields) {
			if (item[extraField]) {
				item[`extraFieldName${extraFieldIndex}`] = extraField;
				item[`extraFieldValue${extraFieldIndex}`] = item[extraField];
				extraFieldIndex++;
			}
			delete item[extraField];
		}
		item.extraFieldIndex = extraFieldIndex;
		console.log(item);
		return item;
	});
	for(let item of data){
		const t = await sequelize.transaction();
		   try {
			   const isExist = await BasicProductDetail.count({
				   where: { itemNumber: item.itemNumber },
				   transaction: t
			   });
			 
		   //? Checking for Product Already Exists of Not
		   if (isExist <= 0) {
			    
			
				let brand = await Brand.findOne({
					where: {
						brandShortName: "Carhartt"
					},
					transaction: t
				});
				if (!brand) {
					brand = await Brand.create(
						{
							brandShortName: "Carhartt",
							brandLongName: "Carhartt",
							imageNameBrandLogo: ""
						},
						{ transaction: t }
					);
				}
				item.brandId = brand.id;
			

			if (item.imageNameItem) {
				const response = await download(item.imageNameItem);
				console.log(response.error);
				if (response.error)

					return res
						.status(500)
						.json({ message: 'Unable to Upload Images.' });
				item.imageNameItem = response.Data.key;
			}else{
				
				let brand = await Brand.findOne({
					where: {
						brandShortName: "Carhartt"
					},
					transaction: t
				});
				item.imageNameItem = brand.imageNameBrandLogo;
				
			}
			
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
				   { basicProductDetailId: product.id, vendorId: 70 },
				   { transaction: t }
			   );
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
			if (item.size) {
				const newVariant = {};
				const variant = await Variant.findOne({
					where: { name: 'size' },
					attributes: ['id']
				});
				if (!variant) {
					const { id: variantId } = await Variant.create(
						{ name: 'size' },
						{ attributes: ['id'] }
					);
					newVariant.variantId = variantId;
				} else {
					newVariant.variantId = variant.id;
				}
				newVariant.variantValue = item.size;
				newVariant.basicProductDetailId = product.id;
				await ProductVariant.create(newVariant, { transaction: t });
			}
			   
		   }

		   await t.commit();
		   } catch (error) {
			   console.log(`${error}================================================================================`);
		   return res.status(500).json({ message: 'Something went wrong', error: error });
		   }
	   }

	//console.log(data);
	return res.status(200).json({
		data:data,
		message:'json object Carhartt'
	})
};

//? Controller to Import Products from Accuform Vendor.

const importAccuformProducts = async (req, res) => {
	//? Convert CSV to JSON format.
	const jsonProducts = await csv().fromFile(req.file.path);
	//? Delete the CSV file.
	fs.unlink(req.file.path, (err) => {});
	let data = jsonProducts.map((obj) => {
		const item = _.renameKeys(obj, AccuformMapper);

		
		let categories =item["category"];
		
		item.vendorCategory =categories;
		item.productCategory = AccuformCategoryMapper[item.vendorCategory];
		
		if (item.listPrice)
			item.listPrice = item.listPrice.substr(item.listPrice.indexOf('$') + 1);
		if (item.itemNumber) {
			item.masterSKU = `ACC${item.itemNumber}`;
		} else {
			if (item.itemNumber === undefined || item.itemNumber === null) {
				item.itemNumber = Math.random()
					.toString(36)
					.substring(2, 15)
					.toUpperCase(); 
				item.masterSKU = `ACC${item.itemNumber}`;
				item.isArchieve = true;
			}
		}

		item.keywords = [];
				
		const extraFields = [
			
			"HEADER / PRODUCT FAMILY",
			"MINIMUM SALES QTY",
			"CALIFORNIA PROPOSITION 65 SHORT WARNING (Effective Date 1/1/2021)"
		];		
		let extraFieldIndex = 0;
		for (let extraField of extraFields) {
			if (item[extraField]) {
				item[`extraFieldName${extraFieldIndex}`] = extraField;
				item[`extraFieldValue${extraFieldIndex}`] = item[extraField];
				extraFieldIndex++;
			}
			delete item[extraField];
		}
		item.extraFieldIndex = extraFieldIndex;
		console.log(item);
		return item;
	});
	for(let item of data){
		const t = await sequelize.transaction();
		   try {
			   const isExist = await BasicProductDetail.count({
				   where: { itemNumber: item.itemNumber },
				   transaction: t
			   });
			 
		   //? Checking for Product Already Exists of Not
		   if (isExist <= 0) {
			    
			
				let brand = await Brand.findOne({
					where: {
						brandShortName: "Accuform"
					},
					transaction: t
				});
				if (!brand) {
					brand = await Brand.create(
						{
							brandShortName: "Accuform",
							brandLongName: "Accuform®",
							imageNameBrandLogo: ""
						},
						{ transaction: t }
					);
				}
				item.brandId = brand.id;
			

			if (item.imageNameItem) {
				const response = await download(item.imageNameItem);
				console.log(response.error);
				if (response.error)

					return res
						.status(500)
						.json({ message: 'Unable to Upload Images.' });
				item.imageNameItem = response.Data.key;
			}else{
				
				let brand = await Brand.findOne({
					where: {
						brandShortName: "Accuform"
					},
					transaction: t
				});
				item.imageNameItem = brand.imageNameBrandLogo;
				
			}
			
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
				   { basicProductDetailId: product.id, vendorId: 69 },
				   { transaction: t }
			   );
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
			   

			   	// product group section
		let group = await ProductGroup.count({
			where: { name:{ [Op.iLike]: item.Group } },
			transaction: t
		});
		if (!group) {
			console.log(`Creating group!!!!`);
			group = await ProductGroup.create(
				{
					name: item.Group
				},
				{ transaction: t }
			);
			if (item.size) {
				const newVariant = {};
				const variant = await Variant.findOne({
					where: { name: 'size' },
					attributes: ['id']
				});
				if (!variant) {
					const { id: variantId } = await Variant.create(
						{ name: 'size' },
						{ attributes: ['id'] }
					);
					newVariant.variantId = variantId;
				} else {
					newVariant.variantId = variant.id;
				}
				newVariant.variantValue = item.size;
				newVariant.basicProductDetailId = product.id;
				await ProductVariant.create(newVariant, { transaction: t });
			}
		}

		//item.imageNameItemGroup = imageNameItemGroup;
		//? Remove the Unnecessary Fields.
		//  _.omit(item, [
		// 	''
		// ]);
		   }

		   await t.commit();
		   } catch (error) {
			   console.log(`${error}================================================================================`);
		   return res.status(500).json({ message: 'Something went wrong', error: error });
		   }
	   }

	//console.log(data);
	return res.status(200).json({
		data:data,
		message:'json object Accuform'
	})
};

//? Controller to Import Products from Moen Vendor.

const importMoenProducts = async (req, res) => {
	//? Convert CSV to JSON format.
	const jsonProducts = await csv().fromFile(req.file.path);
	//? Delete the CSV file.
	fs.unlink(req.file.path, (err) => {});
	let data = jsonProducts.map((obj) => {
		const item = _.renameKeys(obj, moenMapper);

		let categories =item["category"];
		
		item.vendorCategory =categories;
		item.productCategory = moenCategoryMapper[item.vendorCategory];
		
		if (item.listPrice)
			item.listPrice = item.listPrice.substr(item.listPrice.indexOf('$') + 1);
		if (item.costColumn1Price)
			item.costColumn1Price = item.costColumn1Price.substr(
				item.costColumn1Price.indexOf('$') + 1
			);
			
		
		item.unitOfMeasure = 'USD';
			
		if (item.itemNumber) {
			item.masterSKU = `MOE${item.itemNumber}`;
		} else {
			if (item.itemNumber === undefined || item.itemNumber === null) {
				item.itemNumber = Math.random()
					.toString(36)
					.substring(2, 15)
					.toUpperCase(); 
				item.masterSKU = `MOE${item.itemNumber}`;
				item.isArchieve = true;
			}
		}

		let keywords = '';
		for (let i = 1; i <= 10; i++) {
			if (item[`keyword${i}`]) {
				if (item[`keyword${i + 1}`]) keywords += item[`keyword${i}`] + '# ';
				else keywords += item[`keyword${i}`];
			}
			delete item[`keyword${i}`];
		}
		if (!(keywords == '')) item.keywords = keywords.split('# ');
		else item.keywords = [];
				
		const extraFields = [
			"Master Carton UPC",
			"Tier Quantity",
			"Tier Length",
			"Tier Width",
			"Tier Height",
			"Tier Volume",
			"Tier Weight",
			"Pallet Quantity",
			"Pallet Length",
			"Pallet Width",
			"Pallet Height",
			"Pallet Volume",
			"Pallet Weight",
			"Launch Date",
			"Distribution Chain Status",
			"Distribution Chain Status Description",
			"Online Catalog URL",
			"Spec PDF URL",
			"Product Collection",
			"Direct Replacement Sku(s)",
			"PMI Code",
			"PMI Description",
			"Quality Part Type",
			"Handles",
			"Price Type"
		];		
		let extraFieldIndex = 0;
		for (let extraField of extraFields) {
			if (item[extraField]) {
				item[`extraFieldName${extraFieldIndex}`] = extraField;
				item[`extraFieldValue${extraFieldIndex}`] = item[extraField];
				extraFieldIndex++;
			}
			delete item[extraField];
		}
		item.extraFieldIndex = extraFieldIndex;
		console.log(item);
		return item;
	});
	for(let item of data){
		const t = await sequelize.transaction();
		   try {
			   const isExist = await BasicProductDetail.count({
				   where: { itemNumber: item.itemNumber },
				   transaction: t
			   });
			 
		   //? Checking for Product Already Exists of Not
		   if (isExist <= 0) {
			    
				let brand = await Brand.findOne({
					where: {
						brandShortName: "MOEN"
					},
					transaction: t
				});
				if (!brand) {
					brand = await Brand.create(
						{
							brandShortName: "MOEN",
							brandLongName: "MOEN",
							imageNameBrandLogo: ""
						},
						{ transaction: t }
					);
				}
				item.brandId = brand.id;
			

			if (item.imageNameItem) {
				const response = await download(item.imageNameItem);
				console.log(response.error);
				if (response.error)

					return res
						.status(500)
						.json({ message: 'Unable to Upload Images.' });
				item.imageNameItem = response.Data.key;
			}else{
				
				let brand = await Brand.findOne({
					where: {
						brandShortName: "MOEN"
					},
					transaction: t
				});
				item.imageNameItem = brand.imageNameBrandLogo;
				
			}
			
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
				   { basicProductDetailId: product.id, vendorId: 71 },
				   { transaction: t }
			   );
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
				   
		   }

		   await t.commit();
		   } catch (error) {
			   console.log(`${error}================================================================================`);
		   return res.status(500).json({ message: 'Something went wrong', error: error });
		   }
	   }

	//console.log(data);
	return res.status(200).json({
		data:data,
		message:'json object Moen'
	})
};

//? Controller to Update Products BrandId from TrueValue Vendor.
const updateTrueValueProducts = async (req, res) => {
	//? Convert CSV to JSON format.
	const jsonProducts = await csv().fromFile(req.file.path);
	//? Delete the CSV file.
	fs.unlink(req.file.path, (err) => {});
	for(let item of jsonProducts){
		const t = await sequelize.transaction();
		   try {
			   const product = await BasicProductDetail.findOne({
				   where: { itemNumber: item.item_nbr },
				   transaction: t
			   });
			console.log(product, "+++++++++++++++++product+++++++++++++++++++++++++++++++++++++++++++=")
			if (product){
				// get brand
				let brand = null
				if ( product.brandId!= null) {

						// get brand detail
						brand = await Brand.findOne({
							where: {
								id: product.brandId
							},
							transaction: t
						});
						
						
					}else{
                        // Create brand
                        brand = await Brand.findOne({
                            where: {
                                brandShortName: {
                                    [Op.iLike]: `${item.vendor_name}`
                                }
                            },
                            transaction: t
                        });

                        }// end else
                    if (brand == null){
                        brand = await Brand.create(
                        {
                        brandShortName: item.vendor_name,
                        brandLongName: item.vendor_name,
                        mageNameBrandLogo: ""
                            },
                            { transaction: t }
                        );
                    } //end if
						
						
						// data to update
						let fieldToUpdate = {
							brandId: brand.id,

						};
										
						// update product Detail
						await BasicProductDetail.update(fieldToUpdate, {
							where: { id: product.id },
							transaction: t
						});

					
					await t.commit();
				}
		   } catch (error) {
			   console.log(`${error}================================================================================`);
		   return res.status(500).json({ message: 'Something went wrong', error: error });
		   }
	   }
	
	return res.status(200).json({
		
		message:'Updated successfully'
	})
};



module.exports = {
	importHoneywellProducts,
	importDupontProducts,
	importBEstarProducts,
	importDewaltProducts,
	importMilwaukeeProducts,
	importDeltaProducts,
	import511TacticalProducts,
	importAmerexProducts,
	importJPWProducts,
	importCarharttProducts,
	importAccuformProducts,
	importMoenProducts,
	updateTrueValueProducts,
};
