import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const { 
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT
} = process.env;

const db = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  dialect: 'mysql',
});

export default db;
