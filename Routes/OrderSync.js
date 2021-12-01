const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });


const order = require("../controllers/ordersync");

const router = express.Router();

router.get('/ordersync', order.Ordersync);
router.get('/filename', order.OrderFileList);
router.post("/delete",order.DeleteFile);
router.post("/import",upload.single("importFile"), order.SaveFile);
router.post("/import-order", order.ImportOrder);
router.post("/import-from-external-link",order.ImportFromExternalLink);
router.post("/import-order-file",upload.single("importFile"), order.ImportOrderfile );

module.exports = router;
