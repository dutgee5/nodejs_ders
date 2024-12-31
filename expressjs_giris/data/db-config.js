// Bu dosya veritabanı bağlantısı için gerekli olan konfigürasyonları içerir. apiyi knex ile postgresql veritabanına bağlamak için gerekli olan ayarları burada yapacağız.


const knex  = require('knex'); // knex modülünü import ettik.
const knexFile = require("../knexfile"); // knexfile.js dosyasını import ettik.

const environment = process.env.DB_ENV || "development"; // process.env.DB_ENV değeri yoksa development olarak ayarla.

module.export = knex(knexFile[environment]); // knex ile veritabanı bağlantısını gerçekleştirir ve export eder.

