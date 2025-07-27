require('dotenv').config();

module.exports={
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_NAME,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    logging:  process.env.POSTGRES_LOGGING === 'true' ? true : false
  },
  test: {

  },
  production: {

  }
};