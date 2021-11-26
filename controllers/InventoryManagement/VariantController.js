const { Variant } = require('../../models/Variants');

// NEW-VARIANT
const newVariant = async (req, res) => {
	var status;
	console.log(req.body);
	if (req.body.status === 'Active') {
		status = true;
	} else {
		status = false;
	}
	// for (i of req.body.categories) {
	Variant.create({
		categories: req.body.categories,
		variant: req.body.variant,
		status: status,
		attributes: req.body.attributes
	})
		.then((response) => {
			res.json({
				success: 'Variant Added!'
			});
		})
		.catch((err) => {
			console.log(err);
		});
	// }
};
// GET VARIANTS
const getVariants = async (req, res) => {
	var perPage = 8;
	var page = req.params.page || 1;
	var required = [];
	const all = await Variant.findAll({});
	console.log(req.query);
	if (req.query.search) {
		var data = await Variant.findAll({
			limit: perPage * 1,
			offset: (page - 1) * perPage,
			where: { variant: req.query.search }
		});
		for (let i of data) {
			required.push(i.dataValues);
		}

		var totalPage = Math.ceil(all.length / perPage);
		console.log(totalPage);

		res.json({
			data: required,
			totalPage: totalPage
		});
	} else if (req.query.sortby) {
		console.log('sorty');
		if (req.query.sortby == 'variant') {
			var data = await Variant.findAll({
				limit: perPage * 1,
				offset: (page - 1) * perPage,
				order: [['variant', 'ASC']]
			});
			for (let i of data) {
				required.push(i.dataValues);
			}

			var totalPage = Math.ceil(all.length / perPage);
			console.log(totalPage);

			res.json({
				data: required,
				totalPage: totalPage
			});
		}
	} else {
		var data = await Variant.findAll({
			limit: perPage * 1,
			offset: (page - 1) * perPage
		});
		for (let i of data) {
			required.push(i.dataValues);
		}
		// for (j of required) {
		//     var categoryData;
		//     console.log(j.categoryId)
		//     categoryData = await category.findOne({ where: { id: j.categoryId } })
		//     j.category = categoryData.dataValues
		// }
		var totalPage = Math.ceil(all.length / perPage);
		console.log(totalPage);

		res.json({
			data: required,
			totalPage: totalPage
		});
	}
};

// DELETE VARIANTS
const deletevariant = async (req, res) => {
	// console.log(req.query)
	if (typeof req.query.id == 'string') {
		Variant.destroy({ where: { id: req.query.id } }).then((response) => {
			console.log(response);
			res.json({
				success: 'Deleted Successfully'
			});
		});
	} else if (typeof req.query.id == 'object') {
		for (let i of req.query.id) {
			await Variant.destroy({ where: { id: i } });
		}
		res.json({
			success: 'Deleted Successfully'
		});
	}
};
const activatevariant = async (req, res) => {
	console.log(req.query);
	for (let i of req.query.id) {
		await Variant.update({ status: true }, { where: { id: i } });
	}
	res.json({
		success: 'Status Changed'
	});
};
// deactivate
const deactivateVariant = async (req, res) => {
	console.log(req.query);
	for (let i of req.query.id) {
		await Variant.update({ status: false }, { where: { id: i } });
	}
	res.json({
		success: 'Status Changed'
	});
};
// GET VARIANT DETAILS
const variantDetails = async (req, res) => {
	console.log(req.query);
	const details = await Variant.findOne({ where: { id: req.query.id } });
	console.log(details);
	res.json({
		data: details
	});
};
// EDIT VARIANT
const editVariant = async (req, res) => {
	console.log(req.query);
	console.log(req.body);
	Variant.update(req.body, { where: { id: req.query.id } }).then((response) => {
		res.json({
			success: 'Successfully Updated!'
		});
	});
};

module.exports = {
	newVariant: newVariant,
	getVariants: getVariants,
	deletevariant: deletevariant,
	activatevariant: activatevariant,
	deactivateVariant: deactivateVariant,
	variantDetails: variantDetails,
	editVariant: editVariant
};
