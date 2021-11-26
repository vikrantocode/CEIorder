const { isArray } = require('lodash-contrib')
const Brand = require('../../../models/Brand')

//? List All Brands
const getBrands = async (req, res) => {
    try {
        const page = req.query.page || 1
        const pageSize = req.query.pageSize || 30
        const brands = await Brand.findAll({
            limit : pageSize,
            offset : (page - 1) * pageSize
        })
        const count = await Brand.count({})
        return res.status(200).json({ data : brands, count})    
    } catch (error) {
        console.log(error)
        return res.status(500).send(`Something Went Wrong!!!`)
    }
}

//? Get Brand Details
const getBrand = async (req, res) => {
    try {
        const id = req.params.id
        const brand = await Brand.findOne({
            where : { id }
        })
        if(!brand) return res.status(404).send(`There is No Brand Associated with Provided Id`)
        return res.status(200).json({brand})    
    } catch (error) {
        console.log(error)
        return res.status(500).send(`Something Went Wrong!!!`)
    }
}

//? Create New Brand(s)
const createBrand = async (req, res) => {
    const data = req.body
    try {
        if(isArray(data)){
            for(brand of data){
                await Brand.create(brand)
            }
            return res.status(201).send("Brands Successfully Created.");
        } else {
            await Brand.create(data)
            return res.status(201).send("Brand Successfully Created.");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Something Went Wrong!!!')
    }
}

//? Update Brand Details
const updateBrand = async (req, res) => {
    const data = req.body
    const id = req.params.id
    try {
        await Brand.update(data, { where : { id }});
        return res.status(201).send("Brand Successfully Updated.");
    } catch (error) {
        console.log(error);
        return res.status(500).send('Something Went Wrong!!!')
    }
}

//? Delete Brand(s)
const deleteBrand = async (req, res) => {
    try {
        if (typeof (req.query.id) == 'string') {
            await Brand.destroy({ where: { id: req.query.id } })
            return res.status(200).send('Brand Deleted Successfully')
        }
        else if(typeof(req.query.id) == 'object') {
            for (let i of req.query.id) {
                await Brand.destroy({ where: { id: i } })
            }
            res.status(200).send("Brands Deleted Successfully")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Something Went Wrong!")
    }
}

//? Export Controllers
module.exports = {
    getBrands : getBrands,
    getBrand : getBrand,
    createBrand : createBrand,
    updateBrand : updateBrand,
    deleteBrand : deleteBrand
}