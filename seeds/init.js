exports.seed = async function (knex) {
    await knex("orders_goods").del();
    await knex("goods").del();
    await knex("photos").del();
    await knex("reviews").del();
    await knex("orders").del();
    await knex("photo_galleries").del();
    await knex("users").del();

    await knex("users").insert([
        {
            id: 1,
            name: "Maria",
            email: "mia03.03@mail.ru",
            email_is_confirmed: true,
            password: "123456",
            role: "admin"
        },
    ]);
    await knex("orders").insert([
        {
            id: 1,
            customer_id: 1,
            status: "delivered",
            paid: true
        },
    ]);
    await knex("photo_galleries").insert([
        {
            id: 1
        },
    ]);
    await knex("reviews").insert([
        {
            id: 1,
            text: "Всё нормально",
            author_id: 1,
            evaluation: 4,
            published: true,
            order_id: 1,
            photo_gallery_id: 1
        },
    ]);
    await knex("goods").insert([
        {
            id: 1,
            title: "Пицца веганская",
            text: "Соус из томатов, цуккини, баклажаны, артишоки в масле, свежие томаты, маринованные со специями, фирменный веганский соус Песто с кедровыми",
            price: "500",
            category: "Hot",
            photo_gallery_id: 1
        },
    ]);
    await knex("photos").insert([
        {
            id: 1,
            photo_path: "На компе",
            photo_gallery_id: 1
        },
    ]);
    await knex("orders_goods").insert([
        {
            id: 1,
            order_id: 1,
            good_id: 1
        },
    ]);
};