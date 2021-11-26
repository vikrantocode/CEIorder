//? Load Modules
const { isArray } = require('lodash-contrib')
const Category = require('../../../models/Categories')

//? List All Categories
const getCategories = async (req, res) => {
    try {
        const page = req.query.page || 1
        const pageSize = req.query.pageSize || 30
        const categories = await Category.findAll({
            limit : pageSize,
            offset : (page - 1) * pageSize
        })
        const count = await Category.count()
        return res.status(200).json({ data : categories, count})
    } catch (error) {
        console.log(error)
        return res.status(500).send(`Something Went Wrong!!!`)
    }
}

//? Get Category Details
const getCategory = async (req, res) => {
    try {
        const { id } = req.params
        const category = await Category.findOne({
            where : { id }
        })
        if(!category) return res.status(404).send(`There is No Category Associated with Provided Id`)
        return res.status(200).json(category)
    } catch (error) {
        console.log(error)
        return res.status(500).send(`Something Went Wrong!!!`)
    }
}

//? Create Category(s)
const createCategory = async (req, res) => {
    try {
        const data = req.body
        if(isArray(data)){
            for(category of data){
                const isExist = await Category.count({ where : { category : category.category } })
                if(isExist < 1){
                    await Category.create(category)
                }
            }
            return res.status(201).send(`Categories Created Successfully`)
        } else {
            await Category.create(data)
            return res.status(201).send(`Category Created Successfully`)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(`Something Went Wrong!!!`)
    }
}

//? Update Category Details
const updateCategory = async (req, res) => {
    try {
        const {id} = req.params
        await Category.update( req.body , { where : { id } })
        return res.status(200).send('Category Updated Successfully')
    } catch (error) {
        console.log(error)
        return res.status(500).send(`Something Went Wrong!!!`)
    }
}

//? Delete Category(s)
const deleteCategory = async (req, res) => {
    try {
        if (typeof (req.query.id) == 'string') {
            await Category.destroy({ where: { id: req.query.id } })
            return res.send('Category Deleted Successfully')
        }
        else if(typeof(req.query.id) == 'object') {
            for (let i of req.query.id) {
                await Category.destroy({ where: { id : i } })
            }
            res.json({
                success: "Categories Deleted Successfully"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(`Something Went Wrong!!!`)
    }
}

module.exports = {
    getCategories : getCategories,
    getCategory : getCategory,
    createCategory : createCategory,
    updateCategory : updateCategory,
    deleteCategory : deleteCategory
}