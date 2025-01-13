require('dotenv').config();

module.exports = {
  development: {
    "username": "avnadmin",
    "password": process.env.DB_PASSWORD,
    "database": "portofolio_dev",
    "host": "mysql-1f0961d0-keeansportodb.b.aivencloud.com",
    "port"    : "15009",
    "dialect": "mysql",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  },
  test: {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  production: {
    "username": "avnadmin",
    "password": process.env.DB_PASSWORD,
    "database": "portofolio",
    "host": "mysql-1f0961d0-keeansportodb.b.aivencloud.com",
    "dialect": "mysql"
  }
}

