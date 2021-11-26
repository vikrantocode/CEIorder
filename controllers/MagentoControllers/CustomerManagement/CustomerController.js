//? Load Modules
const { isArray } = require('lodash-contrib')
const Customer = require('../../../models/Customer')

//? List All Customers
const getCustomers = async (req, res) => {
    try {
        const page = req.query.page || 1
        const pageSize = req.query.pageSize || 30
        const customers = await Customer.findAll({
            limit : pageSize,
            offset : (page - 1) * pageSize
        })
        const count = await Customer.count({})
        return res.status(200).json({ data : customers, count })
    } catch (error) {
        console.log(error)
        return res.status(500).send(`Something Went Wrong!!!`)
    }
}

//? Get Customer Details
const getCustomer = async (req, res) => {
    try {
        const { id } = req.params
        const customer = await Customer.findOne({
            where : { id }
        })
        if(!customer) return res.status(404).send(`There is No Customer Associated with Provided Id`)
        return res.status(200).json(customer)
    } catch (error) {
        console.log(error)
        return res.status(500).send(`Something Went Wrong!!!`)
    }
}

//? Create New Customers(s)
const createCustomer = async (req, res) => {
    try {
        const data = req.body
        if(isArray(data)){
            for(customer of data){
                count = await Customer.count({ where : { email : customer.email } })
                if(count > 0) continue;
                await Customer.create(customer)
            }
            return res.status(201).send('Customers Created Successfully')
        } else {
            count = await Customer.count({ where : { email : data.email } })
            if(count > 0) return res.status(400).send('Customer with Provided Email already Exist');
            await Customer.create(data)
            return res.status(201).send('Customer Created Successfully')
        }
    } catch (error) {
        if(error.name === 'SequelizeUniqueConstraintError')
            return res.status(400).json({ [error.name] : error.errors[0].message, field : Object.keys(error.fields)[0] });
        else if(error.name === 'SequelizeDatabaseError')
            return res.status(400).json({ [error.name] : error.message });
        else if(error.name === 'SequelizeValidationError' )
            return res.status(400).json({ [error.name] : error.errors[0].message , field : error.errors[0].path });
        return res.status(500).json('Something Went Wrong!!!')
    }
}

//? Update Customer Details
const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params
        await Customer.update(req.body, { where : { id } })
        return res.status(200).send('Customer Details Updated Successfully')
    } catch (error) {
        console.log(error)
        return res.status(500).send(`Something Went Wrong!!!`)
    }
}

//? Delete Customer Details
const deleteCustomer = async (req, res) => {
    try {
        if (typeof (req.query.id) == 'string') {
            await Customer.destroy({ 
                where: { id : parseInt(req.query.id) }
            })
        }
        else if (typeof (req.query.id) == 'object') {
            for (let id of req.query.id) {
                await Customer.destroy({ 
                    where: { id }
                })
            }
        }
        return res.status(200).send('Deleted Successfully.')    
    } catch (error) {
        console.log(error);
        return res.status(500).send('Something Went Wrong!!!')
    }
}

//? Exports
module.exports = {
    getCustomers : getCustomers,
    getCustomer : getCustomer,
    createCustomer : createCustomer,
    updateCustomer : updateCustomer,
    deleteCustomer : deleteCustomer
}