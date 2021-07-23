const { expect } = require('chai');

const mockedDatabase = require('../database/mocked-connnection');
const inventoryService = require('./inventoryService');

describe('Inventory Service', function () {
  before(function () {
    return mockedDatabase.connect();
  });

  after(function () {
    return mockedDatabase.closeDatabase();
  });

  it('should create new product in stock when trying to update not existing product', async function () {
    await inventoryService.updateProductQuantity({ productId: 2, quantity: 10 });
    const stock = await inventoryService.checkStock(2);
    expect(stock).to.be.equal(10);
  });

  it('should add 5 to quantity for existing product in stock', async function () {
    await inventoryService.updateProductQuantity({ productId: 2, quantity: 5 });
    const stock = await inventoryService.checkStock(2);
    expect(stock).to.be.equal(15);
  });

  it('should sustract 7 from quantity for existing product in stock', async function () {
    await inventoryService.updateProductQuantity({ productId: 2, quantity: -7 });
    const stock = await inventoryService.checkStock(2);
    expect(stock).to.be.equal(8);
  });
});
