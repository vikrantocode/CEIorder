const Sequelize = require('sequelize')
const db = require('../config/database')
// const BasicProductDetails = require('./BasicProductDetail')

const Manufacturer = db.define('manufacturers', {
    manufacturerShortName : {
        type : Sequelize.STRING
    },
    manufacturerLongName : {
        type : Sequelize.STRING
    },
    manufacturerPartNumber : {
        type : Sequelize.STRING
    },
    manufacturerUrl : {
        type : Sequelize.STRING
    }
})

// Manufacturer.hasMany(BasicProductDetails, { as : 'Manufactures' })

// db.sync()
//     .then(() => {
//         console.log('Manufacturers Table Created Successfully!')
//     })
//     .catch(err => {
//         console.log(err)
//     })

module.exports = Manufacturer