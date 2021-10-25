const Voucher = require('../models/voucherModel');

exports.postVoucher = async (req, res, next) => {
  console.log(req.body);

  const voucherData = new Voucher({
    voucherType: req.body.voucherType,
    voucherDate: req.body.voucherDate,
    voucherNumber: req.body.voucherNumber,
    voucherData: req.body.voucherData,
  });
  try {
    await voucherData.save();
    res.status(200).json({ message: "post voucher", voucherData });
  } catch (error) {
    res.status(500).send(error);
  }
  console.log("postVoucher");
};