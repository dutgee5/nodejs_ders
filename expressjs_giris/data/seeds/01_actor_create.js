/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('aktor').del()
  await knex('aktor').insert([
    {id: 1, name: 'Kemal Sunal'},
    {id: 2, name: ' Şener Şen'},
    {id: 3, name: 'Adile Naşit'}
  ]);
};
