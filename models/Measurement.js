const Sequelize = require('sequelize')
const db = require('../config/database')

const Measurement = db.define('measurements', {
    boxPackQuantity : {
        type : Sequelize.INTEGER
    },
    boxPackUnit : {
        type : Sequelize.STRING
    },
    boxDepth : {
        type : Sequelize.STRING
    },
    boxHeight : {
        type : Sequelize.STRING
    },
    boxWidth : {
        type : Sequelize.STRING
    },
    boxExpandedWeight : {
        type : Sequelize.STRING
    },
    cartonPackQuantity : {
        type : Sequelize.INTEGER
    },
    cartonPackUnit : {
        type : Sequelize.STRING
    },
    cartonDepth : {
        type : Sequelize.STRING
    },
    cartonHeight : {
        type : Sequelize.STRING
    },
    cartonWidth : {
        type : Sequelize.STRING
    },
    cartonExpandedWeight : {
        type : Sequelize.STRING
    },
    cartonRoundedWeight : {
        type : Sequelize.STRING
    },
    itemCubicFeet : {
        type : Sequelize.STRING
    },
    itemCubicInches : {
        type : Sequelize.STRING
    },
    itemDepth : {
        type : Sequelize.STRING
    },
    itemHeight : {
        type : Sequelize.STRING
    },
    itemWidth : {
        type : Sequelize.STRING
    },
    itemWeight : {
        type : Sequelize.STRING
    },
    memberPackQty : {
        type : Sequelize.STRING
    },
    memberPackType : {
        type : Sequelize.STRING
    },
    memberBreakPackIndicator : {
        type : Sequelize.STRING
    }
})

// db.sync()
//     .then(() => {
//         console.log('Measurements Table Created Successfully!')
//     })
//     .catch(err => {
//         console.log(err)
//     })

module.exports = Measurement