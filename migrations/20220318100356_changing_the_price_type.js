exports.up = async (knex) => {
    await knex.schema.alterTable("goods", (table) => {
        table.integer("price").notNullable().alter();
    });
};

exports.down = async (knex) => {
    await knex.schema.alterTable("goods", (table) => {
        table.decimal("price").notNullable().alter();
    });
};
