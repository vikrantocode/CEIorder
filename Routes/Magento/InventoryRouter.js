//? Load Modules
const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth.middleware')
const MagentoProductController = require('../../controllers/MagentoControllers/InventoryManagement/ProductController')
const MagentoVendorController = require('../../controllers/MagentoControllers/InventoryManagement/VendorController')
const MagentoBrandController = require('../../controllers/MagentoControllers/InventoryManagement/BrandController')
const MagentoCatagoryController = require('../../controllers/MagentoControllers/InventoryManagement/CategoryController')

//? API Information
const information = [
    {
        "Product Lists" : "get@/api/magento/inventory/products?page?pageSize",
        "Product Details" : "get@/api/magento/inventory/products/:id",
        "Create Product(s)" : "post@/api/magento/inventory/products {Product Properties / Array of Properties}",
        "Update Product Details" : "put@/api/magento/inventory/products/:id { All Product Properties / Need to Update Properties}",
        "Delete Product(s)" : "delete@/api/magento/inventory/products?id { id : id/[id(s)]}"
    },
    {
        "Category Lists" : "get@/api/magento/inventory/categories?page&pageSize",
        "Category Details" : "get@/api/magento/inventory/categories/:id",
        "Create Category(s)" : "post@/api/magento/inventory/categories {Category Properties / Array of Properties}",
        "Update Category Details" : "put@/api/magento/inventory/categories/:id { All Category Properties / Need to Update Properties}",
        "Delete Category(s)" : "delete@/api/magento/inventory/categories?id { id : id/[id(s)]}"
    },
    {
        "Vendor Lists" : "get@/api/magento/inventory/vendors?page?pageSize",
        "Vendor Details" : "get@/api/magento/inventory/vendors/:id",
        "Create Vendor(s)" : "post@/api/magento/inventory/vendors {Vendor Properties / Array of Properties}",
        "Update Vendor Details" : "put@/api/magento/inventory/vendors/:id { All Vendor Properties / Need to Update Properties}",
        "Delete Vendor(s)" : "delete@/api/magento/inventory/vendors?id { id : id/[id(s)]}"
    },
    {
        "Brand Lists" : "get@/api/magento/inventory/brands?page&pageSize",
        "Brand Details" : "get@/api/magento/inventory/brands/:id",
        "Create Brand(s)" : "post@/api/magento/inventory/brands {Brand Properties / Array of Properties}",
        "Update Brand Details" : "put@/api/magento/inventory/brands/:id { All Brand Properties / Need to Update Properties}",
        "Delete Brand(s)" : "delete@/api/magento/inventory/brands?id { id : id/[id(s)]}"
    }
]

//? Description
router.route('/').get(auth, (req, res) => { return res.status(200).json(information) })

//? Products APIs
router.route('/products').get(auth, MagentoProductController.getProducts)
router.route('/products').post(auth, MagentoProductController.createProduct)
router.route('/products/:id').get(auth, MagentoProductController.getProduct)
router.route('/products/:id').put(auth, MagentoProductController.updateProduct)
router.route('/products').delete(auth, MagentoProductController.deleteProduct)
router.route('/products/count').post(MagentoProductController.getCount)

//? Categories APIs
router.route('/categories').get(auth, MagentoCatagoryController.getCategories)
router.route('/categories').post(auth, MagentoCatagoryController.createCategory)
router.route('/categories/:id').get(auth, MagentoCatagoryController.getCategory)
router.route('/categories/:id').put(auth, MagentoCatagoryController.updateCategory)
router.route('/categories').delete(auth, MagentoCatagoryController.deleteCategory)

//? Vendors APIs
router.route('/vendors').get(auth, MagentoVendorController.getVendors)
router.route('/vendors/').post(auth, MagentoVendorController.createVendors)
router.route('/vendors/:id').get(auth, MagentoVendorController.getVendor)
router.route('/vendors/:id').put(auth, MagentoVendorController.updateVendor)
router.route('/vendors').delete(auth, MagentoVendorController.deleteVendor)

//? Brands APIs
router.route('/brands').get(auth, MagentoBrandController.getBrands)
router.route('/brands').post(auth, MagentoBrandController.createBrand)
router.route('/brands/:id').get(auth, MagentoBrandController.getBrand)
router.route('/brands/:id').put(auth, MagentoBrandController.updateBrand)
router.route('/brands').delete(auth, MagentoBrandController.deleteBrand)

//? Exports
module.exports = router;