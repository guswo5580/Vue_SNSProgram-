require('dotenv').config();

module.exports = {
  "development": {
    "username": 'root',
    "password": process.env.SEQUILIZE_PASSWORD,
    "database": 'peaceocean',
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases" : false,
  },
  "test": {
    "username": process.env.SEQUILIZE_ROOT,
    "password": process.env.SEQUILIZE_PASSWORD,
    "database": process.env.SEQUILIZE_DATABASE,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.SEQUILIZE_ROOT,
    "password": process.env.SEQUILIZE_PASSWORD,
    "database": process.env.SEQUILIZE_DATABASE,
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases" : false,
    "logging" : false,
    //sql문 숨기기
  }
}

  
