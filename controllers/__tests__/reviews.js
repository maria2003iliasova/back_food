const db = require("../../utils/db");

const ControllerException = require("../../utils/ControllerException");
const reviewsController = require("../reviews");

const reviews = [
    {text:"Всё очень вкусно!", author_id:1, evaluation:"5", published:true, order_id:1, photo_gallery_id:1},
    {text:"Всё плохо!", author_id:1, evaluation:"2", published:false, order_id:1, photo_gallery_id:1},
]; 

beforeEach(async () => {
  await db.seed.run();
});

test("Возможность добавления отзыва", async () => {
    const data = await reviewsController.addReview(reviews[0]);
  
    expect(data).toEqual(expect.any(Object));
    expect(data.reviewId).toEqual(expect.any(Number));
    expect(data.reviewId).toBeGreaterThan(0);
  });

test("Возможность сохранения данных", async () => {
  const { reviewId } = await reviewsController.addReview(reviews[1]);
  const record = await reviewsController.getReviewById({ reviewId });

  expect(record.text).toBe(reviews[1].text);
  expect(record.author_id).toBe(reviews[1].author_id);
  expect(record.evaluation).toBe(reviews[1].evaluation);
  expect(record.published).toBe(reviews[1].published);
  expect(record.order_id).toBe(reviews[1].order_id);
  expect(record.photo_gallery_id).toBe(reviews[1].photo_gallery_id);
});