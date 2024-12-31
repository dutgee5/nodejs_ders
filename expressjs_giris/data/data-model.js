const db = require("./db-config");

module.exports = {
  findActor,
  findActorById,
  addActor,
  updateActor,
  deleteActor,
};

function findActor() {
  return db("aktor");
}

function findActorById(id) {
  return db("aktor").where({ id }).first();
}

function addActor(newActor) {
  return db("aktor")
    .insert(newActor, "id") // insert parametresi 2 parametre alır. 1. parametre eklenecek veri, 2. parametre ise dönen id'dir.
    .then(([id]) => {
      // insert işlemi sonucunda dönen id'yi alır.
      return db("aktor").where({ id }).first(); // dönen id'ye göre veriyi getirir.
    });
}

function updateActor(updatedActor, id) {
  return db("aktor")
    .update(updatedActor)
    .where({ id })
    .then((istedigimiz_sey) => {
      if (istedigimiz_sey) {
        return db("aktor").where({ id }).first();
      }
    });
}

function deleteActor(id) {
  return db("aktor").del().where({ id });
}
