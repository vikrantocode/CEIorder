const { isArray } = require('lodash-contrib')
const sequelize = require('../../../config/database')
const { Vendor, VendorProducts } = require('../../../models/Vendor')
const VendorAddress = require('../../../models/VendorAddress')

//? List ALl Vendors
const getVendors = async (req, res) => {
    const page = req.query.page || 1
    const pageSize = req.query.pageSize || 30
    try {
        const vendors = await Vendor.findAll({
            include : [
                { 
                    model : VendorAddress 
                }
            ],
            limit : pageSize,
            offset: (page - 1) * pageSize,
        })
        const count = await Vendor.count({ })
        return res.status(200).json({ data : vendors, count})
    } catch (error) {
        console.log(error)
        return res.status(500).send(`Something Went Wrong!!!`)
    }
}

//? Get Vendor Details
const getVendor = async (req, res) => {
    const id = req.params.id
    try {
        const vendor = await Vendor.findOne({
            where : {id},
            include : [
                { 
                    model : VendorAddress 
                }
            ]
        })
        if(!vendor) return res.status(404).send(`There is No Vendor Associated with Provided Id`)
        const productIds = (await VendorProducts.findAll({
            attributes : [ 'basicProductDetailId'],
            where : { vendorId : id }
        })).map(item => item.basicProductDetailId)
        return res.status(200).json({ vendor, productIds})
    } catch (error) {
        console.log(error)
        return res.status(500).send(`Something Went Wrong!!!`)
    }
}

//? Create New Vendor(s)
const createVendors = async (req, res) => {
    const data = req.body
    if(isArray(data)){
        const t = await sequelize.transaction();
        try{
            for(let tempVendor of data){
                const {productIds} = tempVendor
                const isExist = await Vendor.count({
                    where : { name : tempVendor.name, email : tempVendor.email }
                })
                if(!isExist) {
                    const {id : vendorId } = await Vendor.create(tempVendor, { transaction : t })
                    tempVendor.vendorId = vendorId
                    await VendorAddress.create(tempVendor, { transaction : t })
                    for(let basicProductDetailId of productIds){
                        await VendorProducts.create({vendorId, basicProductDetailId}, { transaction : t })
                    }
                }
            }
            await t.commit();
            res.json({
                success: "Vendors Added Successfully!!!"
            })
        }
        catch(err){
            await t.rollback();
            console.log(err)
            res.status(500).json({
                error: "Something Went Wrong!"
            })
        }
    } else {
        const {productIds} = req.body
        const t = await sequelize.transaction()
        try {
            const {id : vendorId } = await Vendor.create(req.body, { transaction : t })
            req.body.vendorId = vendorId
            await VendorAddress.create(req.body, { transaction : t })
            for(let basicProductDetailId of productIds){
                await VendorProducts.create({vendorId, basicProductDetailId}, { transaction : t })
            }
            await t.commit();
            return res.status(201).json({ success : `Vendor Added Successfully!!!`})
        } catch (error) {
            await t.rollback();
            console.log(error)
            return res.status(500).json({ error : `Something Went Wrong`})
        }
    }
}

//? Helper Function to Find difference in Products
const sub = (x,y) => x.filter(el =>  y.indexOf(el) < 0)

//? Update Vendor Details
const updateVendor = async (req, res) => {
    const id = req.params.id
    const t = await sequelize.transaction()
    try {
        if(Object.keys(req.body).includes('productIds')){
            console.log(req.body);
            const {productIds} = req.body
            const oldProductIds = (await VendorProducts.findAll({
                attributes : [ 'basicProductDetailId'],
                where : { vendorId : id }
            })).map(item => item.basicProductDetailId)
            const removeProducts = sub(oldProductIds, productIds)
            const addProducts = sub(productIds, oldProductIds)
            removeProducts.forEach(async basicProductDetailId => await VendorProducts.destroy({ where : { vendorId : id, basicProductDetailId}, transaction : t }))
            addProducts.forEach(async basicProductDetailId => await VendorProducts.create({ vendorId : id, basicProductDetailId }, { transaction : t }))        
        }
        await Vendor.update(req.body, { where : { id }, transaction : t})
        await VendorAddress.update(req.body, { where : { id }, transaction : t})
        await t.commit();
        return res.status(200).send('Vendoor Details Updated Successfully.')
    } catch (error) {
        console.log(error);
        await t.rollback();
        return res.status(500).send('Something Went Wrong!')
    }
}

//? Delete Vendor Details
const deleteVendor = async (req, res) => {
    try {
        console.log('in');
        if (typeof(req.query.id) == 'string') {
            const vendor = await Vendor.findOne({
                where: { id: req.query.id },
            })
            if(!vendor) return res.status(404).json(`There is No Vendor Associated with Provided Id.`)
            await vendor.destroy()
            return res.status(200).send('Vendor Deleted Successfully!!!')
        }
        else if (typeof (req.query.id) == 'object') {
            for (let i of req.query.id) {
                const vendor = await Vendor.findOne({
                    where: { id: i }
                })
                await vendor.destroy()
            }
            return res.status(200).json("Vendors Deleted Successfully!!!")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(`Something Went Wrong!!!`)
    }
}

//? Exports
module.exports = {
    getVendors : getVendors,
    getVendor : getVendor,
    createVendors : createVendors,
    updateVendor : updateVendor,
    deleteVendor : deleteVendor
}