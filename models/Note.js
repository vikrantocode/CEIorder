const Sequelize = require('sequelize')
const db = require('../config/database')

const Note = db.define('notes', {
    description:{
        type: Sequelize.STRING,
        allowNull:false
    }
})

db
.sync().then(()=>{
    console.log("Notes Table created succesfully!")
}).catch((err)=>{console.log(err)});

module.exports = Note;