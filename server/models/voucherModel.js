const mongoose = require('mongoose');

const voucherSchema = mongoose.Schema({
  voucherType: {
    type: String,
  },
  voucherDate: {
    type: String,
  },
  voucherNumber: {
    type: String,
  },

  voucherData: [
    {
      accountName: {
        type: String,
      },
      debit: {
        type: Number,
      },
      credit: {
        type: Number,
      },
      narration: {
        type: String,
      },
    }
  ]
}, {
  timestamps: true
})

const Voucher = mongoose.model('Voucher', voucherSchema)

module.exports = Voucher;