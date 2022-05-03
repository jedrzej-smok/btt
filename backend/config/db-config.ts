import * as dotenv from 'dotenv';
import {Dialect} from "sequelize";
dotenv.config();
interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
  dialectOptions:Object;
  sql_debug:boolean;
  logging?: boolean | Function;
  force?: boolean;
  timezone?: string;
}
export interface Db_config {
  development: DatabaseConfig;
  test?: DatabaseConfig;
  production?: DatabaseConfig;
}
export const db_config: Db_config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true
    },
    sql_debug:Boolean(process.env.SQL_DEBUG)
  },

};