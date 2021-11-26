const Sequelize = require('sequelize')
const db = require('../config/database')

const Catalog = db.define('catalogs', {
    catalogCode1 : {
        type : Sequelize.STRING
    },
    catalogName1 : {
        type : Sequelize.STRING
    },
    catalogPage1CurrentYear : {
        type : Sequelize.STRING
    },
    catalogPage1NextYear : {
        type : Sequelize.STRING
    },
    catalogPage1PriorYear : {
        type : Sequelize.STRING
    },
    catalogUnit1 : {
        type : Sequelize.STRING
    },
    catalogCode2 : {
        type : Sequelize.STRING
    },
    catalogName2 : {
        type : Sequelize.STRING
    },
    catalogPage2CurrentYear : {
        type : Sequelize.STRING
    },
    catalogPage2NextYear : {
        type : Sequelize.STRING
    },
    catalogPage2PriorYear : {
        type : Sequelize.STRING
    },
    catalogUnit2 : {
        type : Sequelize.STRING
    },
    catalogCode3 : {
        type : Sequelize.STRING
    },
    catalogName3 : {
        type : Sequelize.STRING
    },
    catalogPage3CurrentYear : {
        type : Sequelize.STRING
    },
    catalogPage3NextYear : {
        type : Sequelize.STRING
    },
    catalogPage3PriorYear : {
        type : Sequelize.STRING
    },
    catalogUnit3 : {
        type : Sequelize.STRING
    }
})

// db
//     .sync()
//     .then(()=>{
//         console.log("Catalogs Table created succesfully!")
//     })
//     .catch((err)=>{console.log(err)});

module.exports = Catalog