const Sequelize = require('sequelize')
const db = require('../config/database')

const VendorAddress = db.define('vendorAddresses', {
    billingFirstName : {
        type : Sequelize.STRING
    },
    billingLastName : {
        type : Sequelize.STRING
    },
    billingBusiness : {
        type : Sequelize.STRING
    },
    billingCountry : {
        type : Sequelize.STRING
    },
    billingAddress : {
        type : Sequelize.STRING
    },
    billingZipCode : {
        type : Sequelize.STRING
    },
    billingCity : {
        type : Sequelize.STRING
    },
    billingState : {
        type : Sequelize.STRING
    },
    billingPhone : {
        type : Sequelize.STRING
    },
    billingFax : {
        type : Sequelize.STRING
    },
    shippingFirstName : {
        type : Sequelize.STRING
    },
    shippingLastName : {
        type : Sequelize.STRING
    },
    shippingBusiness : {
        type : Sequelize.STRING
    },
    shippingCountry : {
        type : Sequelize.STRING
    },
    shippingAddress : {
        type : Sequelize.STRING
    },
    shippingZipCode : {
        type : Sequelize.STRING
    },
    shippingCity : {
        type : Sequelize.STRING
    },
    shippingState : {
        type : Sequelize.STRING
    },
    shippingPhone : {
        type : Sequelize.STRING
    },
    shippingFax : {
        type : Sequelize.STRING
    }
})

db.sync()
    .then(() => {
        console.log('Vendor Addresses Table Created Successfully!')
    })
    .catch(err => {
        console.log(err)
    })

module.exports = VendorAddress