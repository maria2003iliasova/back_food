const ControllerException = require("../utils/ControllerException");
const knex = require("../utils/db");

//Добавить заказ
exports.add_order = async ({ customer_id, status, paid, created_at, updated_at }) => {
    try {
        const [{ id: orderId }] = await knex("orders")
            .insert([{ customer_id, status, paid, created_at, updated_at }])
            .returning("id");
        return { orderId };
    } catch (error) {
        throw new ControllerException("Error");
    }
};

//Редактировать заказ
exports.editOrder = async ({ orderId, status, paid }) => {
    const [record] = await knex("orders")
        .select("id", "status", "paid")
        .where({ id: orderId });

    if (!record) {
        throw new ControllerException("NOT_FOUND", "Order has not been found");
    }

    const patch = {};
    if (status) patch.status = status;
    if (paid) patch.paid = paid;
    await knex("orders").update(patch).where({ id: orderId });

    return {};
};

//Удалить заказ
exports.deleteOrderById = async ({ orderId }) => {
    try {
        await knex("orders")
            .where({ id: orderId }).delete();
        return true;
    }
    catch (error) {
        throw new ControllerException("Some mistake has occurred");
    }
};

//Вывод по id
exports.getOrderById = async ({ orderId }) => {
    const [record] = await knex("orders")
        .select(
            "id",
            "customer_id",
            "status",
            "paid",
            "created_at",
            "updated_at"
        )
        .where({ id: orderId });

    return record;
};

//Вывод списком
exports.getOrderAll = async ({ limit, offset }) => {
    const records = await knex("orders")
        .select(
            "id",
            "customer_id",
            "status",
            "paid",
            "created_at",
            "updated_at"
        )
        .limit(limit)
        .offset(offset)

    return records;
};