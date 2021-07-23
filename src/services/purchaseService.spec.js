const { expect } = require('chai');

const mockedDatabase = require('../database/mocked-connnection');
const purchaseService = require('./purchaseService');

describe('Purchase Service', function () {
  before(function () {
    return mockedDatabase.connect();
  });

  afterEach(function () {
    return mockedDatabase.clearDatabase();
  });

  after(function () {
    return mockedDatabase.closeDatabase();
  });

  it('should save new Purchase', async function () {
    await purchaseService.savePurchase({
      productId: 'productId',
      productName: 'productName',
      quantity: 20,
    });
    const purchaseOfThisMonth = await purchaseService.getProductPurchaseThisMonth(
      'productId',
    );
    expect(purchaseOfThisMonth).to.be.equal(20);
  });
});
