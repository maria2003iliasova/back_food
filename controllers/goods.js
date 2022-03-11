const ControllerException = require("../utils/ControllerException");
const knex = require("../utils/db");

//Добавить продукт
exports.addProduct = async ({ title, text, price, category, photo_gallery_id }) => {
    try {
        const [{ id: productId }] = await knex("goods")
            .insert([{ title, text, price, category, photo_gallery_id }])
            .returning("id");
        return { productId };
    } catch (error) {
        throw new ControllerException("The product already exists");
    }
};

//Редактировать продукт
exports.editProduct = async ({ productId, title, text, price, category, photo_gallery_id }) => {
    const [record] = await knex("goods")
        .select("id", "title", "text", "price", "category", "photo_gallery_id")
        .where({ id: productId });

    if (!record) {
        throw new ControllerException("NOT_FOUND", "Product has not been found");
    }

    const patch = {};
    if (title) patch.title = title;
    if (text) patch.text = text;
    if (price) patch.price = price;
    if (category) patch.category = category;
    if (photo_gallery_id) patch.photo_gallery_id = photo_gallery_id;
    await knex("goods").update(patch).where({ id: productId });

    return {};
};

//Удалить продукт
exports.deleteProductById = async ({ productId }) => {
    try {
        await knex("goods")
            .where({ id: productId }).delete();
        return true;
    }
    catch (error) {
        throw new ControllerException("Some mistake has occurred");
    }
};

//Вывод по id
exports.getProductById = async ({ productId }) => {
    const [record] = await knex("goods")
        .select(
            "id",
            "title",
            "text",
            "price",
            "category",
            "photo_gallery_id"
        )
        .where({ id: productId });

    return record;
};

//Вывод списком
exports.getProductAll = async ({ limit, offset }) => {
    const records = await knex("goods")
        .select(
            "id",
            "title",
            "text",
            "price",
            "category",
            "photo_gallery_id"
        )
        .limit(limit)
        .offset(offset)

    return records;
};