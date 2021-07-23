const SaleOrder = require('../database/schemas/SaleOrder');

const saveSale = async (data) => {
  const saleOrder = new SaleOrder(data);
  return saleOrder.save();
};

module.exports = {
  saveSale,
};
