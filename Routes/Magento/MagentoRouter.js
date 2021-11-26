const express = require('express')
const InventoryRouter = require('./InventoryRouter')
const CustomerRouter = require('./CustomerRouter')
const OrderRouter = require('./OrderRouter')

const router = express.Router()

const information = {
    "Login API" : "post@/api/login :: [email, password]",
    "Authentication Header" : "Header[ X-AUTH-TOKEN : <token> ]",
    "Inventory API Details" : `get@/api/magento/inventory [Authentication Required]`,
    "Orders API Details" : `get@/api/magento/orders/info [Authentication Required]`,
    "Customers API Details" : `get@/api/magento/customers/info [Authentication Required]`,
}

//? Description
router.route('/').get((req, res) => { return res.status(200).json(information) })

//? Inventory Related API Handlers
router.use('/inventory', InventoryRouter)

//? Customer Related API Handlers
router.use('/customers', CustomerRouter)

//? Customer Related API Handlers
router.use('/orders', OrderRouter)

module.exports = router;