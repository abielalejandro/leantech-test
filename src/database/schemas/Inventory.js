const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true,
    required: true,
  },
  quantity: {
    type: Number,
    index: true,
    required: true,
  },
}, { timestamp: true });

module.exports = mongoose.model('Inventory', inventorySchema);
