//? Load Modules
const { isArray } = require('lodash-contrib')
const sequelize = require('../../../config/database')
const Order = require('../../../models/Order')
const PaymentDetail = require('../../../models/PaymentDetail')
const ShippingDetail = require('../../../models/ShippingDetail')
const OrderItem = require('../../../models/OrderItem')

//? List All Orders
const getOrders = async (req, res) => {
    try {
        const page = req.query.page || 1
        const pageSize = req.query.pageSize || 30
        const orders = await Order.findAll({
            include : [
                {
                    model : PaymentDetail
                },
                {
                    model : ShippingDetail
                },
                {
                    model : OrderItem
                }
            ],
            limit : pageSize,
            offset : (page - 1) * pageSize
        })
        const count = await Order.count({})
        return res.status(200).json({ data : orders, count})
    } catch (error) {
        console.log(error)
        return res.status(500).send(`Something Went Wrong!!!`)
    }
}

//? Get Order Details
const getOrder = async (req, res) => {
    try {
        const { id } = req.params
        const order = await Order.findOne({
            include : [
                {
                    model : PaymentDetail
                },
                {
                    model : ShippingDetail
                },
                {
                    model : OrderItem
                }
            ],
            where: { id }
        })
        if(!order) return res.status(404).send(`There is No Order Associated with Provided Id`)
        return res.status(200).json(order)
    } catch (error) {
        console.log(error)
        return res.status(500).send(`Something Went Wrong!!!`)
    }
}

//? Create New Order(s)
const createOrder = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        if(isArray(req.body)){
            for(let order of req.body){
                const { id } = await Order.create(order, { transaction : t })
                order.orderId = id
                await PaymentDetail.create(order, { transaction : t })
                await ShippingDetail.create(order, { transaction : t })
                for(let orderItem of order.orderItems){
                    orderItem.orderId = id
                    await OrderItem.create(orderItem, { transaction : t })
                }
            }
            await t.commit();
            return res.status(200).json('Orders Created Successfully.')
        } else {
            const { id } = await Order.create(req.body, { transaction : t })
            req.body.orderId = id
            await PaymentDetail.create(req.body, { transaction : t })
            await ShippingDetail.create(req.body, { transaction : t })
            for(let orderItem of req.body.orderItems){
                orderItem.orderId = id
                await OrderItem.create(orderItem, { transaction : t })
            }
            await t.commit();
            return res.status(200).json('Order Created Successfully.')
        }
    } catch (err) {
        await t.rollback()
        console.log(err)
        return res.status(500).send(`Something Went Wrong!!!`)
    }
}


//? Helper Function to Find difference in Order Items
const sub = (x,y) => x.filter(el =>  y.indexOf(el) < 0)

//?  Update Orders Details
const updateOrder = async (req, res) => {
    const id = parseInt(req.params.id)
    const t = await sequelize.transaction();
    try {
        await Order.update(req.body, { 
            where : { id },
            transaction : t 
        })
        await PaymentDetail.update(req.body, { 
            where : { orderId : id },
            transaction : t 
        })
        await ShippingDetail.update(req.body, { 
            where : { orderId : id },
            transaction : t 
        })
        let newOrderItemIds = (req.body.orderItems.filter(item => item.id)).map(item => item.id)
        const ids = await OrderItem.findAll({
            attributes : [ 'id' ],
            where : { orderId : req.params.id }
        })
        let oldOrderItemIds = ids.map(item => item.id)
        let deleteOrderItems = sub(oldOrderItemIds, newOrderItemIds)
        deleteOrderItems.forEach(async id => {
            await OrderItem.destroy({ where: {
                    id
                },
                transaction  : t
            })
        })
        for(let orderItem of req.body.orderItems){
            orderItem.orderId = req.params.id
            if(orderItem.id){
                await OrderItem.update(orderItem, { 
                    where : { id : orderItem.id },
                    transaction : t 
                })
            } else {
                await OrderItem.create(orderItem, { 
                    transaction : t 
                })
            }
        }
        await t.commit();
        return res.status(200).json('Order Updated Successfully.')
    } catch (err) {
        await t.rollback()
        console.log(err)
        return res.status(500).send(`Something Went Wrong!!!`)
    }
}

//? Delete Order Details
const deleteOrder = async (req, res) => {
    const t = await sequelize.transaction()
    try {
        if (typeof (req.query.id) == 'string') {
            await Order.destroy({ 
                where: { id : parseInt(req.query.id) },
                transaction  : t
            })
            await PaymentDetail.destroy({ 
                where: { orderId : parseInt(req.query.id) },
                transaction  : t
            })
            await ShippingDetail.destroy({ 
                where: { orderId : parseInt(req.query.id) },
                transaction  : t
            })
            await OrderItem.destroy({ 
                where: { orderId : parseInt(req.query.id) },
                transaction  : t
            })
        }
        else if (typeof (req.query.id) == 'object') {
            for (let id of req.query.id) {
                await Order.destroy({ 
                    where: { id : id },
                    transaction  : t
                })
                await PaymentDetail.destroy({ 
                    where: { orderId : id },
                    transaction  : t
                })
                await ShippingDetail.destroy({ 
                    where: { orderId : id },
                    transaction  : t
                })
                await OrderItem.destroy({ 
                    where: { orderId : id },
                    transaction  : t
                })
            }
        }
        await t.commit();
        return res.status(200).send('Deleted Successfully.')    
    } catch (error) {
        await t.rollback();
        console.log(error);
        return res.status(500).send('Something Went Wrong!!!')
    }
}

//? Exports
module.exports = {
    getOrders : getOrders,
    getOrder : getOrder,
    createOrder : createOrder,
    updateOrder : updateOrder,
    deleteOrder : deleteOrder
}