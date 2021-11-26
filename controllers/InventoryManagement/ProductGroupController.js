//? Load Modules
const {Op, or, and, fn, col, QueryTypes} = require('sequelize')
const sequelize = require('../../config/database')
const BasicProductDetail = require('../../models/BasicProductDetail')
const ImageDetail = require('../../models/ImageDetail')
const PriceAndCost = require('../../models/PriceAndCost')
const ProductGroup = require('../../models/ProductGroup')

//? Listing All Product Groups
const getProductGroups = async (req, res) => {
    const page = req.query.page || 1
    const pageSize = req.query.pageSize || 15
    const orderBy = req.query.orderBy || 'id'
    const orderManner = req.query.orderManner || 'ASC'
    const searchItem = req.query.searchItem || ''
    try {
        const data = await sequelize.query(`SELECT "productGroups"."id", "productGroups"."name", "productGroups"."createdAt", "productGroups"."updatedAt", "productGroups"."userId", COUNT("basicProductDetails"."id") AS "productsCount" FROM "productGroups" AS "productGroups" LEFT OUTER JOIN "basicProductDetails" AS "basicProductDetails" ON "productGroups"."id" = "basicProductDetails"."productGroupId" WHERE ("productGroups"."name" ILIKE '%${searchItem}%' OR CAST("productGroups"."id" AS VARCHAR) ILIKE '%${searchItem}%')  GROUP BY "productGroups"."id" ORDER BY "${orderBy}" ${orderManner} LIMIT ${pageSize} OFFSET ${(page-1)* pageSize};`, { type : QueryTypes.SELECT })
        const count = await ProductGroup.count({ 
            where: or (
                {
                    name : {
                        [Op.iLike] : `%${searchItem}%`
                    }
                },
                sequelize.where(
                    sequelize.cast(sequelize.col('id'), 'varchar'),
                    {[Op.iLike]: `%${searchItem}%`}
                )
            )
        })
        return res.status(200).json({data, count})
    } catch (error) {
        console.log(error)
        return res.status(500).send('Something Went Wrong!!!')    
    }
}

//? Get Product Group Details
const getProductGroup = async (req, res) => {
    try {
        const { id } = req.params
        const data = await ProductGroup.findOne({
            where : { id }
        });
        const products = await BasicProductDetail.findAll({ 
            where : { productGroupId : id},
            attributes : [ 'id', 'description25Char', 'brandId', 'itemNumber', 'packQuantity' ],
            include : [
                {
                    model : ImageDetail,
                    attributes : ['imageNameItem']
                },
                {
                    model : PriceAndCost,
                    attributes : [ 'listPrice', 'costColumn1Price' ]
                }
            ],
            order : [ ['id', 'DESC'] ],
            limit : 30,
            offset : 0,
        });
        const count = await BasicProductDetail.count({
            where : { productGroupId : id},
        })
        return res.status(200).json({count, data, products})
    } catch (error) {
        console.log(error)
        return res.status(500).json(`Something Went Wrong!!!`)
    }
}

//? Get Products of Specific Product Group
const getGroupProducts = async (req, res) => {
    try {
        const { id } = req.params
        const page = req.query.page || 1
        const searchItem = req.query.searchItem || ''
        const products = await BasicProductDetail.findAll({ 
            where : and(
                { productGroupId : id },
                or(
                    {
                        description25Char : {
                            [Op.iLike] : `%${searchItem}%`
                        }
                    },
                    sequelize.where(
                        sequelize.cast(sequelize.col('basicProductDetails.id'), 'varchar'),
                        {[Op.iLike]: `%${searchItem}%`}
                    )
                )
            ),
            attributes : [ 'id', 'description25Char', 'brandId', 'itemNumber', 'packQuantity' ],
            include : [
                {
                    model : ImageDetail,
                    attributes : ['imageNameItem']
                },
                {
                    model : PriceAndCost,
                    attributes : [ 'listPrice', 'costColumn1Price' ]
                }
            ],
            order : [ ['id', 'DESC'] ],
            limit : 30,
            offset : (page - 1) * 30,
        });
        const count = await BasicProductDetail.count({
            where : { productGroupId : id},
        })
        return res.status(200).json({count, products})
    } catch (error) {
        console.log(error)
        return res.status(500).json(`Something Went Wrong!!!`)
    }
}

//? Create New Product Group
const createProductGroup = async (req, res) => {
    try {
        await ProductGroup.create(req.body)
        return res.status(201).send('Product Group Created Successfully')
    } catch (error) {
        console.log(error)
        return res.status(500).send(`Something Went Wrong!!!`)
    }
}

//? Update Product Group Details
const updateProductGroup = async (req, res) => {
    try {
        const { id } = req.params
        await ProductGroup.update( req.body , { where : { id } })
        return res.status(200).send('Product Group Updated Successfully')
    } catch (error) {
        console.log(error)
        return res.status(500).send(`Something Went Wrong!!!`)    
    }
}

//? Helper Function to Find difference in Products
const sub = (x,y) => x.filter(el =>  y.indexOf(el) < 0)

//? Modify Products of Specific Product Group
const modifyProducts = async (req, res) => {
    const t = await sequelize.transaction()
    try {
        const { id } = req.params
        const productIds = (await BasicProductDetail.findAll({ 
            where: { productGroupId : id },
            attributes: [ 'id' ]
        })).map(x => x.id )
        const setNull = sub(productIds, req.body.productIds)
        const setVal = sub(req.body.productIds, productIds)
        for(let productId of setNull){
            await BasicProductDetail.update({ productGroupId : null }, { 
                where : { id : productId }, 
                transaction : t
            })
        }
        for(let productId of setVal){
            await BasicProductDetail.update({ productGroupId : id }, { 
                where : { id : productId }, 
                transaction : t
            })
        }
        await ProductGroup.update({ userId : req.body.userId }, { 
            where : { id },
            transaction : t
        })
        await t.commit()
        return res.status(200).send('Products Modified Successfully')
    } catch (error) {
        console.log(error)
        await t.rollback()
        return res.status(500).send(`Something Went Wrong!!!`);
    }
}

//? Delete Product Group(s)
const deleteProductGroup = async (req, res) => {
    try {
        if (typeof (req.query.id) == 'string') {
            await ProductGroup.destroy({
                where: { id: req.query.id },
            })
            return res.status(200).send('Product Group Deleted Successfully!!!')
        }
        else if (typeof (req.query.id) == 'object') {
            for (let i of req.query.id) {
                await ProductGroup.destroy({
                    where: { id: i }
                })
            }
            return res.status(200).send('Product Groups Deleted Successfully!!!')
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(`Something Went Wrong!!!`)
    }
}


//? Exports
module.exports = {
    getProductGroups : getProductGroups,
    getProductGroup : getProductGroup,
    getGroupProducts : getGroupProducts,
    createProductGroup : createProductGroup,
    updateProductGroup : updateProductGroup,
    modifyProducts : modifyProducts,
    deleteProductGroup : deleteProductGroup
}