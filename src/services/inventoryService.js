const Inventory = require('../database/schemas/Inventory');

const updateProductQuantity = async ({ productId, quantity }) => {
  await Inventory.updateOne(
    { productId: productId },
    { $inc: { quantity: quantity } },
    { upsert: true },
  );
};

const checkStock = async (productId) => {
  const stock = await Inventory.findOne({ productId: productId }, 'quantity');
  return (stock && stock.quantity) || 0;
};

module.exports = {
  updateProductQuantity,
  checkStock,
};
