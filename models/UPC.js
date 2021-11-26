const Sequelize = require('sequelize')
const db = require('../config/database')

const UPC = db.define('upcs', {
    UPCRetail : {
        type : Sequelize.STRING
    },
    UPCItemGTIN : {
        type : Sequelize.STRING
    },
    UPCBoxGTIN : {
        type : Sequelize.STRING
    },
    UPCCartonGTIN : {
        type : Sequelize.STRING
    },
    UPSIndicator : {
        type : Sequelize.BOOLEAN
    }
})

// db.sync()
//     .then(() => {
//         console.log('UPCs Table Created Successfully!')
//     })
//     .catch(err => {
//         console.log(err)
//     })

module.exports = UPC