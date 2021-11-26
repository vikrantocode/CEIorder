const Sequelize = require('sequelize')
const db = require('../config/database')

const ProductClass = db.define('productClasses', {
    productClassCode : {
        type: Sequelize.STRING
    },
    productClassDescription : {
        type : Sequelize.STRING
    },
    productClassCat1Code : {
        type : Sequelize.STRING
    },
    productClassCat1Description : {
        type : Sequelize.STRING
    },
    productClassCat2Code : {
        type : Sequelize.STRING
    },
    productClassCat2Description : {
        type : Sequelize.STRING
    },
    productClassCat3Code : {
        type : Sequelize.STRING
    },
    productClassCat3Description : {
        type : Sequelize.STRING
    },
    productClassCat4Code : {
        type : Sequelize.STRING
    },
    productClassCat4Description : {
        type : Sequelize.STRING
    },
    classCode : {
        type : Sequelize.STRING
    },
    subClassCode : {
        type : Sequelize.STRING
    }
})

// db
// .sync().then(()=>{
//     console.log("Product Classes Table created succesfully!")
// }).catch((err)=>{console.log(err)});

module.exports = ProductClass


