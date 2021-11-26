//? Load Modules
const express = require('express')
const auth = require('../../middlewares/auth.middleware')
const MagentoOrderController = require('../../controllers/MagentoControllers/OrderManagement/OrderController')

//? Router
const router = express.Router()

//? Information
const information = {
    "Order Lists" : "get@/api/magento/orders?page&pageSize",
    "Order Details" : "get@/api/magento/orders/:id",
    "Create Order(s)" : "post@/api/magento/orders {Order Properties / Array of Properties}",
    "Update Order Details" : "put@/api/magento/orders/:id { All Order Properties / Need to Update Properties}",
    "Delete Order(s)" : "delete@/api/magento/orders?id { id : id/[id(s)]}"
}

//? Description
router.route('/info').get(auth, (req, res) => { return res.status(200).json(information) })

//? Order APIs 
router.route('/').get(auth, MagentoOrderController.getOrders)
router.route('/').post(auth, MagentoOrderController.createOrder)
router.route('/:id').get(auth, MagentoOrderController.getOrder)
router.route('/:id').put(auth, MagentoOrderController.updateOrder)
router.route('/').delete(auth, MagentoOrderController.deleteOrder)

//? Exports
module.exports = router;