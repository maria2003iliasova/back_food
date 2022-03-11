const ControllerException = require("../utils/ControllerException");
const knex = require("../utils/db");

//Добавить отзыв
exports.addReview = async ({ text, author_id, evaluation, published, order_id, photo_gallery_id }) => {
    try {
        const [{ id: reviewId }] = await knex("reviews")
            .insert([{ text, author_id, evaluation, published, order_id, photo_gallery_id }])
            .returning("id");
        return { reviewId };
    } catch (error) {
        throw new ControllerException("The review already exists");
    }
};

//Редактировать отзыв
exports.editReview = async ({ reviewId, text, evaluation, published, photo_gallery_id }) => {
    const [record] = await knex("reviews")
        .select("id", "text", "evaluation", "published", "photo_gallery_id")
        .where({ id: reviewId });

    if (!record) {
        throw new ControllerException("NOT_FOUND", "Review has not been found");
    }

    const patch = {};
    if (text) patch.text = text;
    if (evaluation) patch.evaluation = evaluation;
    if (published) patch.published = published;
    if (photo_gallery_id) patch.photo_gallery_id = photo_gallery_id;
    await knex("reviews").update(patch).where({ id: reviewId });

    return {};
};

//Удалить отзыв
exports.deleteReviewById = async ({ reviewId }) => {
    try {
        await knex("reviews")
            .where({ id: reviewId }).delete();
        return true;
    }
    catch (error) {
        throw new ControllerException("Some mistake has occurred");
    }
};

//Вывод по id
exports.getReviewById = async ({ reviewId }) => {
    const [record] = await knex("reviews")
        .select(
            "id",
            "text",
            "author_id",
            "evaluation",
            "published",
            "order_id",
            "photo_gallery_id"
        )
        .where({ id: reviewId });

    return record;
};

//Вывод списком
exports.getReviewAll = async ({ limit, offset }) => {
    const records = await knex("reviews")
        .select(
            "id",
            "text",
            "author_id",
            "evaluation",
            "published",
            "order_id",
            "photo_gallery_id"
        )
        .limit(limit)
        .offset(offset)

    return records;
};