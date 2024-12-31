/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("aktor", (table) => {
      // tablo oluşturulacak
      table.increments("id"); // id alanı oluşturuldu ve auto increment yapıldı.
      table.string("name").notNullable(); // name alanı oluşturuldu ve boş geçilemez yapıldı.
    })
    .createTable("movie", (table) => {
      table.increments("id");
      table.string("name").notNullable();
    })
    .createTable("actor_movies", (table) => {
      // actor_movies tablosu oluşturuldu.
      table.increments("id");
      table.integer("movie_id").unsigned().notNullable(); // unsigned: sadece pozitif sayılar alınabilir.
      table.integer("actor_id").unsigned().notNullable();

      table
        .foreign("movie_id")
        .references("movie.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE"); // movie_id alanı movie tablosundaki id alanına referans verir. Eğer movie tablosundaki bir id silinirse bu tablodaki ilgili kayıtlar da silinir.
      table
        .foreign("actor_id")
        .references("aktor.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("actor_movies")
    .dropTableIfExists("movie")
    .dropTableIfExists("actor"); // önce en son oluşturulan tablo silinir. Sıralama önemlidir.
};
