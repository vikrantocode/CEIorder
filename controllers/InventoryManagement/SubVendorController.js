
const SubVendor = require("../../models/SubVendor")
const sequelize = require('../../config/database')
const BasicProductDetail = require("../../models/BasicProductDetail")
const PriceAndCost = require('../../models/PriceAndCost')
const ImageDetail = require('../../models/ImageDetail')



const getVendors = async (req, res) => {
    var perPage = req.query.pagesize || 15
    var page = req.params.page || 1
    var all = await SubVendor.findAll({})
    var totalPage = Math.ceil(all.length / perPage)
    
if(req.query.search){
    sequelize.query(`SELECT * FROM vendors WHERE to_tsvector(vendorAbbreviation) @@ to_tsquery('${req.query.search}:*') limit ${perPage * 1}`)
        .then(response => {
           // console.log(response)
            res.json({
                data: response,
                totalPage: totalPage,
                all:all.length
            })
        }).catch(err => {
            res.json({
                error: "something went wrong!"
            })
        })
} else if(req.query.sortby){
    SubVendor.findAll({
        limit: perPage * 1,
        offset: (page - 1) * perPage,
        attributes: ['id','vendorAbbreviation','vendorShortName','vendorPricerPrintName'],
        order: [
            ['vendorAbbreviation', 'ASC'],
        ],
    }).then(response => {
       // console.log(response)
        res.json({
            data: response,
            totalPage: totalPage,
            all:all.length
        })
    }).catch(err => {
        res.json({
            error: "something went wrong!"
        })
    })
} else {
    const vendors = await SubVendor.findAll({
        limit: perPage * 1,
        offset: (page - 1) * perPage,
        attributes: ['id','vendorAbbreviation','vendorShortName','vendorPricerPrintName'],
        include:[
            {
                model: BasicProductDetail,
                attributes: ['productId', 'itemNumber'],
                required: false,
                
            }
        ],
        order: [
            ['id', 'ASC'],
        ],
})

return res.status(200).json({
    status:true,
    data:vendors,
    totalPage: totalPage,
    all:all.length
})
}

}

const getVendor = async (req, res) => {
    const id = parseInt(req.query.id)
    const vendor = await SubVendor.findOne({ where : { id }})
    if(!vendor) return res.status(404).json({ error : 'There is no Sub Vendor with the provided Id!!!'})
    return res.status(200).json({
        status:true,
        data:vendor
    })
}

//Add new vendor
const addvendor = async (req,res)=>{
    console.log(req.body)
    SubVendor.create(req.body).then(response=>{
        res.json({
            success: "Category added"
        }).catch(err => {
            console.log(err)
            res.json({
                error: "something went wrong!"
            })
    })
})
}
//edit vendor
const editVendor =async (req,res)=>{
    var data ={}
if(req.body.vendorAbbreviation) data.vendorAbbreviation = req.body.vendorAbbreviation
if(req.body.vendorShortName) data.vendorShortName = req.body.vendorShortName
if(req.body.vendorPricerPrintName) data.vendorPricerPrintName = req.body.vendorPricerPrintName
SubVendor.update(data, { where: { id: req.query.id } }).then(response => {
    console.log(response)
    res.json({
        success: "Edited Successfully"
    })
}).catch(err => {
    console.log(err)
    res.json({
        error: "Something went wrong!"
    })
})
}


const deleteVendor = async (req, res) => {
    console.log(req.query.id)
    if (typeof (req.query.id) == 'string') {
        SubVendor.destroy({ where: { id: req.query.id } }).then(response => {
            console.log(response)
            res.json({
                success: 'Sub Vendor Deleted Successfully'
            })
        })

    }
    else if (typeof (req.query.id) == 'object') {
        for (let i of req.query.id) {
            await SubVendor.destroy({ where: { id: i } })
        }
        res.json({
            success: "All Sub Vendor Deleted Successfully"
        })
    }
}

const getAllVendors = async (req, res) => {
    const vendors = await SubVendor.findAll({})
    return res.status(200).json(vendors)
}

// get all product with given vendor id
const getVendorAllProduct = async (req,res)=>{
    const product = await BasicProductDetail.findAll({
            order : [['id', 'DESC']],
            attributes: ['id', 'itemNumber', 'packQuantity','description25Char','brandId'],
            include: [
                {
                    model: PriceAndCost,
                    attributes: ['unitOfMeasure', 'listPrice', 'costColumn1Price'],
                    required: false,
                },
                {
                    model: ImageDetail,
                    attributes: ['imageNameItem', 'imageNameProductLit'],
                    required: false,
                }
            ],
            where:{SubVendorId:req.query.vid}
    })
    return res.status(200).json({
        success:true,
        data:product
    })
}


module.exports = {
    getVendors : getVendors,
    getVendor : getVendor,
    deleteVendor:deleteVendor,
    addvendor:addvendor,
    editVendor:editVendor,
    getAllVendors : getAllVendors,
    getVendorAllProduct:getVendorAllProduct
}