const express = require("express");
const router = express.Router();

const voucherController = require("../controller/voucherController");

// router.post("/", voucherController.postVoucher);
router.route('/').post(voucherController.postVoucher)


module.exports = router;