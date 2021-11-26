//? Load Modules
const express = require('express')
const auth = require('../../middlewares/auth.middleware')
const MagentoCustomerController = require('../../controllers/MagentoControllers/CustomerManagement/CustomerController')

//? Router
const router = express.Router()

//? Information
const information = {
    "Customer Lists" : "get@/api/magento/customers?page&pageSize",
    "Customer Details" : "get@/api/magento/customers/:id",
    "Create Customer(s)" : "post@/api/magento/customers {Customer Properties / Array of Properties}",
    "Update Customer Details" : "put@/api/magento/customers/:id { All Customer Properties / Need to Update Properties}",
    "Delete Customer(s)" : "delete@/api/magento/customers?id { id : id/[id(s)]}"
}

//? Description
router.route('/info').get(auth, (req, res) => { return res.status(200).json(information) })

//? Customer APIs 
router.route('/').get(auth, MagentoCustomerController.getCustomers)
router.route('/').post(auth, MagentoCustomerController.createCustomer)
router.route('/:id').get(auth, MagentoCustomerController.getCustomer)
router.route('/:id').put(auth, MagentoCustomerController.updateCustomer)
router.route('/').delete(auth, MagentoCustomerController.deleteCustomer)

//? Exports
module.exports = router;