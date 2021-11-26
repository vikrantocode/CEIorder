const express = require("express");
const multer = require("multer");
const uploadcsv = multer({ dest: "temp/" });
const OrderController = require("../controllers/OrderManagement/OrderController");
const OrderGroupController = require("../controllers/OrderManagement/OrderGroupController");
const WarehouseController = require("../controllers/OrderManagement/WarehouseController");

const router = express.Router();

//? Order Group Routes
router.route("/groups").get(OrderGroupController.getOrderGroups);
router.route("/groups").post(OrderGroupController.createOrderGroup);
router.route("/groups/assign").post(OrderGroupController.assignGroup);
router.route("/groups/fetch/:id").get(OrderGroupController.fetchGroups);
router.route("/groups/remove/:id").post(OrderGroupController.removeFromGroup);

//? Order Routes
router.route("/delete").post(OrderController.deleteOrder);
router.route("/update/:id").post(OrderController.updateOrder);
router
  .route("/import")
  .post(uploadcsv.single("importFile"), OrderController.importOrders);
router.route("/details/:id").get(OrderController.getOrder);
router.route("/:page").get(OrderController.getOrders);
router.route("/").post(OrderController.createOrder);
router.route("/duplicate/:id").post(OrderController.duplicateOrder);
router.route("/split/:id").post(OrderController.splitOrder);
router.route("/replace/:id").post(OrderController.replaceOrder);

//? Warehouse Routes
router.route("/warehouses").post(WarehouseController.createWarehouse);
router.route("/warehouses/:page").get(WarehouseController.getWarehouses);
router.route("/warehouses/details/:id").get(WarehouseController.getWarehouse);
router
  .route("/warehouses/update/:id")
  .post(WarehouseController.updateWarehouse);
router.route("/warehouses/delete").post(WarehouseController.deleteWarehouse);

module.exports = router;
