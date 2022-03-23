const db = require("../../utils/db");

const ControllerException = require("../../utils/ControllerException");
const ordersController = require("../orders");

const orders = [
    {customer_id: 1, status:"in_process", paid:false },
    {customer_id: 1, status:"delivered", paid:true },
]; 

beforeEach(async () => {
  await db.seed.run();
});

test("Возможность добавления товара", async () => {
    const data = await ordersController.addOrder(orders[0]);
  
    expect(data).toEqual(expect.any(Object));
    expect(data.orderId).toEqual(expect.any(Number));
    expect(data.orderId).toBeGreaterThan(0);
  });

test("Возможность сохранения данных", async () => {
  const { orderId } = await ordersController.addOrder(orders[1]);
  const record = await ordersController.getOrderById({ orderId });

  expect(record.customer_id).toBe(orders[1].customer_id);
  expect(record.status).toBe(orders[1].status);
  expect(record.paid).toBe(orders[1].paid);
});