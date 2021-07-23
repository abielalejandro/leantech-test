const mongoose = require('mongoose');

const SaleOrderSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('SaleOrder', SaleOrderSchema);
