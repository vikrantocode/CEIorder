//? Load Modules
const express = require('express');
const router = express.Router();
var multer = require('multer');
const ArchiveProductController = require('../controllers/InventoryManagement/ArchiveProductController');
const BrandController = require('../controllers/InventoryManagement/BrandController');
const CategoryController = require('../controllers/InventoryManagement/CategoryController');
const ImportController = require('../controllers/InventoryManagement/ImportController');
const NoteController = require('../controllers/InventoryManagement/NoteController');
const ProductController = require('../controllers/InventoryManagement/ProductController');
const ProductGroupController = require('../controllers/InventoryManagement/ProductGroupController');
const ProductTypeController = require('../controllers/InventoryManagement/ProductTypeController');
const SubVendorController = require('../controllers/InventoryManagement/SubVendorController');
const VariantController = require('../controllers/InventoryManagement/VariantController');
const VendorController = require('../controllers/InventoryManagement/VendorController');
const uploadFile = multer({ dest: 'temp/' });
const multipleProductImages = multer({ dest: 'temp/' }).fields([
	{
		name: 'imageNameItem',
		maxCount: 10
	},
	{
		name: 'imageNameLineDrawing',
		maxCount: 1
	},
	{
		name: 'imageNameMSDSPDF',
		maxCount: 1
	},
	{
		name: 'imageNameProductLit',
		maxCount: 1
	},
	{
		name: 'imageNameItemAlt',
		maxCount: 10
	},
	{
		name: 'imageNameSKUGroup',
		maxCount: 10
	},
	{
		name: 'imageNameSKUGroupAlt',
		maxCount: 10
	},
	{
		name: 'imageNameSwatches',
		maxCount: 10
	}
]);

router.route('/delete-test').post(ProductController.deleteProductDetails);

//?Product APIs.
router.route('/get-products/:page').get(ProductController.getProducts);
router
	.route('/get-detailed-products/:page')
	.get(ProductController.getDetailedProducts);
router.route('/search-products').get(ProductController.searchProduct);
router
	.route('/search-products-minimal')
	.get(ProductController.searchProductMinimal);
router.route('/get-product-details').get(ProductController.getProductDetails);
router.route('/new-product').post(ProductController.newProduct);
router
	.route('/import-products')
	.post(uploadFile.single('importFile'), ProductController.importProducts);
router
	.route('/edit-product')
	.post(multipleProductImages, ProductController.editProduct);
router.route('/delete-product').post(ProductController.deleteProduct);
router.route('/normalize').put(ProductController.normalizeProduct);
router
	.route('/map-products')
	.post(uploadFile.single('importFile'), ProductController.mapCategories);
router
	.route('/map-true-products')
	.post(uploadFile.single('mapperFile'), ProductController.mapTrueProducts);
router
	.route('/import-dh-products')
	.post(uploadFile.single('importFile'), ProductController.importDHProducts);
router
	.route('/import-global-products')
	.post(
		uploadFile.single('importFile'),
		ProductController.importGlobalProducts
	);
router
	.route('/import-hoshizaki-products')
	.post(
		uploadFile.single('importFile'),
		ProductController.importHoshizakiProducts
	);
router
	.route('/import-elkay-products')
	.post(uploadFile.single('importFile'), ProductController.importElkayProducts);
router
	.route('/import-kroll-products')
	.post(uploadFile.single('importFile'), ProductController.importKrollProducts);
router
	.route('/import-honeywell-products')
	.post(
		uploadFile.single('importFile'),
		ImportController.importHoneywellProducts
	);
router
	.route('/import-dopunt-products')
	.post(uploadFile.single('importFile'), ImportController.importDupontProducts);
router
	.route('/import-bestar-products')
	.post(uploadFile.single('importFile'), ImportController.importBEstarProducts);
router
	.route('/import-dewalt-products')
	.post(uploadFile.single('importFile'), ImportController.importDewaltProducts);
router
	.route('/import-milwaukee-products')
	.post(
		uploadFile.single('importFile'),
		ImportController.importMilwaukeeProducts
	);
router
	.route('/import-delta-products')
	.post(uploadFile.single('importFile'), ImportController.importDeltaProducts);
router
	.route('/import-511-tactical-products')
	.post(
		uploadFile.single('importFile'),
		ImportController.import511TacticalProducts
	);
router
	.route('/import-Amerex-fire')
	.post(
		uploadFile.single('importFile'),
		ImportController.importAmerexProducts
	);

router.route('/fetch-image').post(ProductController.fetchImage);
router.route('/export-products').get(ProductController.exportProducts);
router
	.route('/assign-vendor-category')
	.post(
		uploadFile.single('importFile'),
		ProductController.assignVendorCategories
	);

router
	.route('/import-jpw-product')
	.post(
		uploadFile.single('importFile'),
		ImportController.importJPWProducts
	);
router
	.route('/import-Carhartt-products')
	.post(
		uploadFile.single('importFile'),
		ImportController.importCarharttProducts
	);

router
	.route('/import-accuform-products')
	.post(
		uploadFile.single('importFile'),
		ImportController.importAccuformProducts
	);

router
	.route('/import-moen-products')
	.post(
		uploadFile.single('importFile'),
		ImportController.importMoenProducts
	);

	router
	.route('/update-true-value-products')
	.post(
		uploadFile.single('importFile'),
		ImportController.updateTrueValueProducts
	);
	
	
//? Category APIs.
router
	.route('/add-category')
	.post(uploadFile.single('categoryimg'), CategoryController.createCategory);
router.route('/add-categories').post(CategoryController.addCategories);
router.route('/get-category').get(CategoryController.getCategory);
router.route('/delete-category').post(CategoryController.deleteCategory);
router.route('/category-details').get(CategoryController.categoryDetails);
router
	.route('/edit-category')
	.post(uploadFile.single('categoryimg'), CategoryController.editCategory);
router.route('/activate-category').post(CategoryController.activate);
router.route('/deactivate-category').post(CategoryController.deactivate);
router.route('/get-categories/:page').get(CategoryController.getCategories);
router
	.route('/import-category')
	.post(uploadFile.single('categorycsv'), CategoryController.importCategory);
router
	.route('/test')
	.post(uploadFile.single('categorycsv'), CategoryController.testHandler);

//? Variant APIs.
router.route('/new-variant').post(VariantController.newVariant);
router.route('/get-variants/:page').get(VariantController.getVariants);
router.route('/delete-variant').post(VariantController.deletevariant);
router.route('/activate-variant').post(VariantController.activatevariant);
router.route('/deactivate-variant').post(VariantController.deactivateVariant);
router.route('/variant-details').get(VariantController.variantDetails);
router.route('/edit-variant').post(VariantController.editVariant);

//? Product Types APIs.
router.route('/product-types').get(ProductTypeController.getProductTypes);
router.route('/product-types').post(ProductTypeController.createProductType);
router.route('/product-types/:id').get(ProductTypeController.getProductType);
router.route('/product-types/:id').put(ProductTypeController.updateProductType);
router
	.route('/product-types/:id')
	.delete(ProductTypeController.deleteProductType);

//? Product Notes APIs.
router.route('/notes/').get(NoteController.getNotes);
router.route('/notes/').post(NoteController.createNote);
router.route('/notes/:id').get(NoteController.getNote);
router.route('/notes/:id').delete(NoteController.deleteNote);
router.route('/product-notes/:id').get(NoteController.getProductNote);

//? Sub Vendor APIs.
router.route('/vendors/:page').get(SubVendorController.getVendors);
router.route('/vendors').get(SubVendorController.getVendor);
router.route('/get-all-vendors').get(SubVendorController.getAllVendors);
router.route('/delete-vendor').post(SubVendorController.deleteVendor);
router.route('/add-vendor').post(SubVendorController.addvendor);
router.route('/edit-vendor').post(SubVendorController.editVendor);
router
	.route('/getVendorAllProduct')
	.get(SubVendorController.getVendorAllProduct);

//? Brand APIs.
router.route('/get-all-brands/:page').get(BrandController.getBrands);
router.route('/get-brands').get(BrandController.getAllBrands);
router.route('/get-brand').get(BrandController.get_brand);
router
	.route('/addBrand')
	.post(uploadFile.single('imageNameBrandLogo'), BrandController.addBrand);


router
	.route('/editBrand/:id')
	.post(uploadFile.single('imageNameBrandLogo'), BrandController.editBrand);
router.route('/deleteBrand').post(BrandController.deleteBrand);
router.route('/getBrand').get(BrandController.getBrand);

//? Product Filter APIs.
router.route('/filterProduct/:page').post(ProductController.filterProduct);
//router.route("/filterdata").get(ProductController.filterdata)
router.route('/skuSearch').get(ProductController.skuSearch);
router
	.route('/CategorySearchfilter')
	.get(CategoryController.CategorySearchfilter);
router.route('/brandSearchfilter').get(ProductController.brandSearchfilter);
router.route('/vendorSearchfilter').get(ProductController.vendorSearchfilter);

//? Vendor APIs.
router.route('/add-new-vendor').post(VendorController.addVendor);
router.route('/only-vendor').get(VendorController.getMinimalVendor);
router.route('/get-vendor/:id').get(VendorController.getVendor);
router.route('/get-vendors/:page').get(VendorController.getVendors);
router.route('/destroy-vendors').post(VendorController.deleteVendor);
router.route('/update-vendor').post(VendorController.editVendor);
router.route('/get-each-vendor').get(VendorController.getAllVendors);
router
	.route('/vendor-products/:vendorId')
	.get(VendorController.getVendorProducts);
router.route('/vendor-brands/:vendorId').get(VendorController.getVendorBrands);

//? Archive Product APIs.
router
	.route('/archive-products/:page')
	.get(ArchiveProductController.archiveProducts);

//? Product Groups APIs
router.route('/product-groups').get(ProductGroupController.getProductGroups);
router.route('/product-groups').post(ProductGroupController.createProductGroup);
router.route('/product-groups/:id').get(ProductGroupController.getProductGroup);
router
	.route('/product-groups/:id/products')
	.get(ProductGroupController.getGroupProducts);
router
	.route('/product-groups/:id')
	.put(ProductGroupController.updateProductGroup);
router
	.route('/product-groups/:id/products/modify')
	.put(ProductGroupController.modifyProducts);
router
	.route('/product-groups')
	.delete(ProductGroupController.deleteProductGroup);

module.exports = router;
