const { v1: uuidv1, v4: uuidv4 } = require("uuid");

const { listeners } = require("../database/schemas/Kardex");
const Kardex = require("../database/schemas/Kardex");

const saveKardex = async (data) => {
  const kardex = new Kardex(data);
  return kardex.save();
};

const processPurchase = async (purchaseOrder) => {
  const data = {
    uuid: new Date().valueOf(),
    productId: purchaseOrder.productId,
    quantity: purchaseOrder.quantity,
    balance: purchaseOrder.quantity,
    operation: "E01",
    inventoryDate: purchaseOrder.createdAt,
  };

  return saveKardex(data);
};

const processSale = async (saleOrder) => {
  const result = await Kardex.aggregate([
    {
      $match: {
        productId: saleOrder.productId,
        operation: "S01",
      },
    },
    {
      $group: {
        _id: "$productId",
        maxDate: { $max: "$uuid" },
      },
    },
  ]);

  const maxDate =
    (result && result[0] && result[0].maxDate) ||
    new Date(1980, 1, 1).valueOf();

  const kardexes = await Kardex.find({
    productId: saleOrder.productId,
    balance: { $gt: 0 },
    operation: "E01",
    uuid: { $gte: maxDate },
  });

  let kardexToPersist = [];

  let reserved = saleOrder.quantity;
  for (var i in kardexes) {
    const k = kardexes[i];

    let data = { ...k };

    if (reserved > 0) {
      //save out
      data = {
        uuid: new Date().valueOf(),
        productId: saleOrder.productId,
        operation: "S01",
        quantity: reserved > k.quantity ? k.quantity : reserved,
        balance: reserved > k.quantity ? 0 : k.quantity - reserved,
        inventoryDate: k.inventoryDate,
      };
      kardexToPersist.push(saveKardex(data));
      reserved -= data.quantity;
      data = {
        uuid: new Date().valueOf(),
        productId: k.productId,
        operation: k.operation,
        quantity: k.quantity - data.quantity,
        balance: data.balance,
        inventoryDate: k.inventoryDate,
        createdAt: new Date(),
      };
      kardexToPersist.push(saveKardex(data));
    } else {
      data = {
        uuid: new Date().valueOf(),
        productId: k.productId,
        operation: k.operation,
        quantity: k.quantity,
        balance: k.balance,
        inventoryDate: k.inventoryDate,
        createdAt: new Date(),
      };
      kardexToPersist.push(saveKardex(data));
    }
  }

  return Promise.all(kardexToPersist);
};

module.exports = {
  saveKardex,
  processPurchase,
  processSale,
};
