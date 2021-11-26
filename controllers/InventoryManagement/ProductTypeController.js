const productTypes = [
    {
        id : 1,
        default : true,
        name : 'Mid Range',
        buyCategory : 'Mid Range',
        newEggCategory : 'Mid Range',
        priceLevel : 3.5,
    },
    {
        id : 2,
        default : false,
        name : 'Budget Range',
        buyCategory : 'Budget Range',
        newEggCategory : 'Budget Range',
        priceLevel : 2.5,
    },
    {
        id : 3,
        default : true,
        name : 'Premium Range',
        buyCategory : 'Premium Range',
        newEggCategory : 'Premium Range',
        priceLevel : 5,
    },
]

const getProductTypes = (req, res) => {
    return res.status(200).json(productTypes)
}

const getProductType = (req, res) => {
    const type = productTypes.find(type => type.id === parseInt(req.params.id))
    if(!type) return res.status(404).json({'error' : 'Type with the provided id doesn\'t Exists.'})
    return res.status(200).json(type)
}

const createProductType = (req, res) => {
    const type = req.body
    productTypes.push(type)
    return res.status(200).json(type)
}

const updateProductType = (req, res) => {
    const id = parseInt(req.params.id)
    const type = productTypes.find(type => type.id === id)
    if(!type) return res.status(404).json({'error' : 'Type with the provided id doesn\'t Exists.'})
    const index = productTypes.indexOf(type)
    const newType = req.body
    productTypes[index] = newType
    return res.status(200).json(newType)
}

const deleteProductType = (req, res) => {
    const id = parseInt(req.params.id)
    const type = productTypes.find(type => type.id === id)
    if(!type) return res.status(404).json({'error' : 'Type with the provided id doesn\'t Exists.'})
    const index = productTypes.indexOf(type)
    productTypes.splice(index, 1)
    return res.status(200).json(type)
}

module.exports = {
    getProductTypes : getProductTypes,
    getProductType : getProductType,
    createProductType : createProductType,
    updateProductType : updateProductType,
    deleteProductType : deleteProductType
}