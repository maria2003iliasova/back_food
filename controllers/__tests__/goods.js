const db = require("../../utils/db");

const ControllerException = require("../../utils/ControllerException");
const goodsController = require("../goods");

const goods = [
  {title: "Салат Цезарь с индейкой", text: "Состав: салат айсберг, индейка, помидоры черри, сыр пармезан, гренки, соус цезарь. (200 гр.)", price: 320.00, category:"Salad", photo_gallery_id:1 },
  {title: "Салат Оливье", 
  text: "Состав: картофель, морковь, ветчина, помидоры черри, яйцо, консервированный огурец, зеленый горошек, майонезная заправка, листья шпината. (190 гр.)", 
  price: 230.00, 
  category:"Salad", 
  photo_gallery_id:1 },
  {title: "Салат Греческий", text: "Состав: огурец, помидор, перец, сыр фета, салат айсберг, маслины, красный лук, заправка из оливкового масла, зелень. (170 гр.)", price: 250.00, category:"Salad", photo_gallery_id:1 },
];

beforeEach(async () => {
  await db.seed.run();
});

test("Возможность добавления товара", async () => {
    const data = await goodsController.addProduct(goods[0]);
  
    expect(data).toEqual(expect.any(Object));
    expect(data.productId).toEqual(expect.any(Number));
    expect(data.productId).toBeGreaterThan(0);
  });

test("Возможность сохранения данных", async () => {
  const { productId } = await goodsController.addProduct(goods[1]);
  const record = await goodsController.getProductById({ productId });

  expect(record.title).toBe(goods[1].title);
  expect(record.text).toBe(goods[1].text);
  expect(record.category).toBe(goods[1].category);
  expect(record.price).toBe(goods[1].price);
});