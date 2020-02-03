require("dotenv").config();

const { DB_HOST, DB_NAME, DB_USER, DB_PW, DB_CLIENT } = process.env;

module.exports = {
  development: {
    client: DB_CLIENT,
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PW,
      database: DB_NAME
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  // staging: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password"
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // },

  production: {
    client: DB_CLIENT,
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PW,
      database: DB_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
