// ayar, ps k ş , migration ve seed dosyalarının nerede olacağını belirler ve veritabanı bağlantı ayarlarını içerir.

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "aktorler",
      user: "postgres",
      password: "admin",
    },
    migrations: {
      //migrations içerisinde veritabanı şemalarını tutacağız
      directory: "./data/migrations",
    },
    seeds: {
      // seed de ise başlangıçta oluşturulan dummy verileri tutacağız
      directory: "./data/seeds",
    },
  },
  production: {}, // apiyi yayınladığımız servisteki veri tabanındaki bağlantı verileri olcak
};
