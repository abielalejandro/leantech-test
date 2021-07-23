const Joi = require("joi");
const { validateData } = require("../util");

const purchaseService = require("../services/purchaseService");
const inventoryService = require("../services/inventoryService");
const kardexService = require("../services/kardexService");

// Validation schema
const purchaseOrderSchema = Joi.object({
  productId: Joi.string().max(30).required(),
  productName: Joi.string()
    .max(255)
    .regex(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü0-9 ]+$/)
    .required(),
  quantity: Joi.number().max(30).required(),
});

const registerPurchase = async (input) => {
  const data = validateData(purchaseOrderSchema, input);
  const purchaseOfThisMonth = await purchaseService.getProductPurchaseThisMonth(
    data.productId
  );
  if (purchaseOfThisMonth + data.quantity > 30) {
    const error = new Error(
      "You have reached the maximum number of purchases for this month"
    );
    throw error;
  }
  const purchase = await purchaseService.savePurchase(data);

  //Process kardex
  await kardexService.processPurchase(purchase);

  // only If the purchase is saved, update the quantity
  await inventoryService.updateProductQuantity({
    productId: data.productId,
    quantity: data.quantity,
  });
};

module.exports = {
  registerPurchase,
};
