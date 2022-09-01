/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {

    await knex.schema
    .createTable('users',(table)=>{
        table.string("userId").notNullable().unique().primary();
        table.string('username',30).notNullable().unique();
        table.string('password',255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })

    .createTable('products', (table) => {
        table.string("productId").notNullable().unique().primary();
        table.string('user_id').notNullable();
        table.foreign("user_id").references('userId').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        // table.string('review_id').notNullable();
        // table.foreign("review_id").references('productId').inTable('products').onDelete('CASCADE').onUpdate('CASCADE');
        table.string("name").notNullable();
        table.string("product_description",1000).notNullable();
        table.float("price").notNullable();
        table.string("imagelink");
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })

    .createTable('review', (table) => {
        table.string("review_id").notNullable().unique().primary();
        table.string('user_id').notNullable();
        table.foreign("user_id").references('userId').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        table.string('product_id').notNullable();
        table.foreign("product_id").references('productId').inTable('products').onDelete('CASCADE').onUpdate('CASCADE');
        table.string("description").notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema

    .dropTable("review", function(table) {
        table.dropForeign('review_user_id_foreign');
        table.dropForeign('review_product_id_foreign');
    })

    .dropTable("products", function(table){
        table.dropForeign('products_user_id_foreign');
    })

    .dropTable("users");
  
};
