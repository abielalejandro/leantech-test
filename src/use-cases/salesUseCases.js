const Joi = require("joi");
const { validateData } = require("../util");

const saleService = require("../services/saleService");
const inventoryService = require("../services/inventoryService");
const kardexService = require("../services/kardexService");

// Validation schema
const saleOrderSchema = Joi.object({
  productId: Joi.string().max(30).required(),
  productName: Joi.string()
    .max(255)
    .regex(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü0-9 ]+$/)
    .required(),
  quantity: Joi.number().required(),
});

const registerSale = async (input) => {
  const data = validateData(saleOrderSchema, input);
  const stock = await inventoryService.checkStock(data.productId);
  if (stock < data.quantity) {
    const error = new Error("not enough stock");
    throw error;
  }

  const purchase = await saleService.saveSale(data);
  //Process kardex
  await kardexService.processSale(purchase);

  // only If the purchase is saved, update the quantity
  await inventoryService.updateProductQuantity({
    productId: data.productId,
    quantity: data.quantity * -1,
  });
};

module.exports = {
  registerSale,
};
