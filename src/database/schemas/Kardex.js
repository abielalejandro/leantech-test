const mongoose = require("mongoose");

const kardexSchema = new mongoose.Schema({
  uuid: {
    type: Number,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  inventoryDate: {
    type: Date,
    required: true,
  },
  operation: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    index: true,
    required: true,
  },
  balance: {
    type: Number,
    index: true,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

kardexSchema.index(
  { productId: 1, inventoryDate: 1, operation: 1, uuid: 1 },
  { unique: true }
);

module.exports = mongoose.model("Kardex", kardexSchema);
