require('dotenv').config();
const { Sequelize } = require('sequelize');

const db = new Sequelize(
  process.env.POSTGRES_NAME,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASS,
{ 
host: process.env.POSTGRES_HOST,
dialect: 'postgres',           
port: process.env.POSTGRES_PORT || 5432,  
logging: process.env.POSTGRES_LOGGING === 'true' ? true : false
  }
);


module.exports = db;


