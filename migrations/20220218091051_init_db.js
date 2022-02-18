exports.up = async function(knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments("id");
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.boolean("email_is_confirmed").notNullable().defaultTo(false);
        table.string("email_confirmation_code", 6);
        table.string("password");
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
        table.enu("role", ["user", "admin"]).notNullable().defaultTo("user");
    });
    await knex.schema.createTable("orders", (table) => {
        table.increments("id");
        table.integer("customer_id").notNullable();
        table.enu("status", ["in_process", "shipping", "delivered"]).notNullable();
        table.boolean("paid").notNullable().defaultTo(false);
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
        table
        .foreign("customer_id")
        .references("users.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
    await knex.schema.createTable("photo_galleries", (table) => {
        table.increments("id");
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    });
    await knex.schema.createTable("reviews", (table) => {
        table.increments("id");
        table.text("text").notNullable();
        table.integer("author_id").notNullable();
        table.enu("evaluation", [1, 2, 3, 4, 5]).notNullable();
        table.boolean("published").notNullable().defaultTo(false);
        table.integer("order_id").notNullable();
        table.integer("photo_gallery_id").notNullable();
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
        table
        .foreign("author_id")
        .references("users.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
        table
        .foreign("order_id")
        .references("orders.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
        table
        .foreign("photo_gallery_id")
        .references("photo_galleries.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
    await knex.schema.createTable("goods", (table) => {
        table.increments("id");
        table.string("title").notNullable();
        table.text("text").notNullable();
        table.decimal("price").notNullable();
        table.enu("category", ["Hot", "Salad", "Dessert", "Drink"]).notNullable();
        table.integer("photo_gallery_id").notNullable();
        table
        .foreign("photo_gallery_id")
        .references("photo_galleries.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
    await knex.schema.createTable("photos", (table) => {
        table.increments("id");
        table.string("photo_path").notNullable();
        table.integer("photo_gallery_id").notNullable();
        table
      .foreign("photo_gallery_id")
      .references("photo_galleries.id")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
    });
    await knex.schema.createTable("orders_goods", (table) => {
        table.increments("id");
        table.integer("order_id").notNullable();
        table.integer("goods_id").notNullable();
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("users");
    await knex.schema.dropTableIfExists("orders");
    await knex.schema.dropTableIfExists("reviews");
    await knex.schema.dropTableIfExists("goods");
    await knex.schema.dropTableIfExists("photo_galleries");
    await knex.schema.dropTableIfExists("photos");
    await knex.schema.dropTableIfExists("order_goods");
};
