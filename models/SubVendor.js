const Sequelize = require('sequelize')
const db = require('../config/database')
const BasicProductDetail = require('./BasicProductDetail')

const SubVendor = db.define('subVendors', {
    vendorAbbreviation : {
        type : Sequelize.STRING
    },
	vendorShortName : {
        type : Sequelize.STRING
    },
    vendorPricerPrintName : {
        type : Sequelize.STRING
    }
})

SubVendor.hasMany(BasicProductDetail, { onDelete : 'cascade'})

db.sync()
    .then(() => {
        console.log('Sub Vendors Table Created Successfully!')
    })
    .catch(err => {
        console.log(err)
    })

module.exports = SubVendor