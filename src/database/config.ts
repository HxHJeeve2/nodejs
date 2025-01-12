import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

const DB_NAME = process.env.DB_NAME || "postgres";
const DB_USERNAME = process.env.DB_USERNAME || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = Number(process.env.DB_PORT) || 5432;  
const DB_DRIVER = process.env.DB_DRIVER as Dialect;


const sequelizeConnection = new Sequelize(DB_NAME,DB_USERNAME,DB_PASSWORD,{
    host: DB_HOST, 
    dialect: DB_DRIVER,
    port:DB_PORT,
})

export default sequelizeConnection;