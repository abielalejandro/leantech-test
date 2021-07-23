const PurchaseOrder = require('../database/schemas/PurchaseOrder');

const savePurchase = async (data) => {
  const purchaseOrder = new PurchaseOrder(data);
  return purchaseOrder.save();
};

const getProductPurchaseThisMonth = async (productId) => {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const result = await PurchaseOrder.aggregate([
    {
      $match: {
        productId: productId,
        createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
      },
    },
    {
      $group: {
        _id: '$productId',
        total: { $sum: '$quantity' },
      },
    },
  ]);

  return (result && result[0] && result[0].total) || 0;
};

module.exports = {
  savePurchase,
  getProductPurchaseThisMonth,
};
