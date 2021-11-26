const { OrderGroup, OrderGroupOrder } = require('../../models/OrderGroup');

const getOrderGroups = async (req, res) => {
	try {
		const orderGroups = await OrderGroup.findAll({});
		return res.status(200).send(orderGroups);
	} catch (err) {
		console.log(error);
		return res.status(500).send('Something Went Wrong!');
	}
};

const createOrderGroup = async (req, res) => {
	try {
		const { id } = await OrderGroup.create(req.body);
		if (req.body.orderId) {
			req.body.orderGroupId = id;
			await OrderGroupOrder.create(req.body);
			return res
				.status(200)
				.send('Order Group Created and Assigned Successfully');
		}
		return res.status(200).send('Order Group Created Successfully');
	} catch (error) {
		console.log(error);
		return res.status(500).send('Something Went Wrong!');
	}
};

const assignGroup = async (req, res) => {
	try {
		const orderGroupOrder = await OrderGroupOrder.findOne({ where: req.body });
		if (orderGroupOrder) return res.status(200).send('Already Assigned');
		await OrderGroupOrder.create(req.body);
		return res.status(201).send('Order Assigned to Order Group Successfully');
	} catch (error) {
		console.log(error);
		return res.status(500).send('Something Went Wrong!');
	}
};

const fetchGroups = async (req, res) => {
	try {
		const id = req.params.id;
		const groups = [];
		const orderGroups = await OrderGroupOrder.findAll({
			where: { orderId: id },
			attributes: ['orderGroupId']
		});
		for (orderGroup of orderGroups) {
			const group = await OrderGroup.findOne({
				where: { id: orderGroup.orderGroupId }
			});
			groups.push(group);
		}
		return res.status(200).send(groups);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Something Went Wrong!');
	}
};

const removeFromGroup = async (req, res) => {
	const id = req.params.id;
	try {
		if (req.body.orderGroupId === 'all')
			await OrderGroupOrder.destroy({ where: { orderId: id } });
		else
			await OrderGroupOrder.destroy({
				where: { orderId: id, orderGroupId: req.body.orderGroupId }
			});
		return res.status(200).send('Removed From Group Successfully');
	} catch (error) {
		console.log(error);
		return res.status(500).send('Something Went Wrong!');
	}
};

module.exports = {
	getOrderGroups: getOrderGroups,
	createOrderGroup: createOrderGroup,
	assignGroup: assignGroup,
	fetchGroups: fetchGroups,
	removeFromGroup: removeFromGroup
};
