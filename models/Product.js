const Sequelize = require('sequelize')
const db = require('../config/database');
const Note = require('./Note')
const Product = db.define('products', {
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    SKU:{
        type:Sequelize.INTEGER
    },
    company:{
        type:Sequelize.STRING
    },
    image:{
        type:Sequelize.STRING,
        defaultValue:"https://res.cloudinary.com/nikitaocode/image/upload/v1610533300/cart_vaj8qb.png"
    },
    supplier:{
        type:Sequelize.STRING
    },
    productType:{
        type:Sequelize.STRING
    },
    buyer:{
        type:Sequelize.STRING
    },
    brand:{
        type:Sequelize.STRING
    },
    status:{
        type:Sequelize.BOOLEAN
    },
    description:{
        type:Sequelize.STRING
    },
    // initialStock:{
    //     type:Sequelize.STRING
    // },
    // initialPrice:{
    //     type:Sequelize.STRING
    // },
    retailPrice:{
        type:Sequelize.STRING
    },
    // buyPrice:{
    //     type:Sequelize.STRING
    // },
    wholesalePrice:{
        type:Sequelize.INTEGER
    },
    productWeight:{
        type:Sequelize.STRING
    },
    shippingWeight:{
        type:Sequelize.STRING
    },
    shipmentDimensions:{
        type: Sequelize.STRING
    },
    productDimensions:{
        type: Sequelize.STRING
    },
    availableQty:{
        type:Sequelize.INTEGER
    },
    physicalInventory:{
        type:Sequelize.INTEGER
    },
    qtyperCase:{
        type:Sequelize.INTEGER
    },
    qtyperPallet:{
        type:Sequelize.INTEGER
    },
    reserved:{
        type: Sequelize.BOOLEAN
    },
    represiable:{
        type:Sequelize.STRING
    },
    productCategory:{
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
    },
});
Product.hasMany(Note, {as : 'has '})

// db
// .sync().then(()=>{
//     console.log("Tables creates succesfully!")
// }).catch((err)=>{console.log(err)});

module.exports = Product;