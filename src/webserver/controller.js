const express = require('express');

const saleUseCases = require('../use-cases/salesUseCases');
const purchaseUseCases = require('../use-cases/purchaseUseCases');

module.exports = () => {
  const router = express.Router();

  router.post('/register-purchase', async (req, res, next) => {
    try {
      const result = await purchaseUseCases.registerPurchase(req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  });

  router.post('/register-sale', async (req, res, next) => {
    try {
      const result = await saleUseCases.registerSale(req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
