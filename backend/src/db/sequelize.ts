import {Sequelize} from 'sequelize-typescript';
import * as dotenv from 'dotenv';
dotenv.config();
const env = process.env.NODE_ENV as keyof Db_config || 'development' as keyof Db_config;
import {db_config, Db_config} from "../../config/db-config"
const getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) =>
    obj[key];
const config = getKeyValue<keyof Db_config, Db_config>(env)(db_config);

export const sequelize = new Sequelize({
    dialect: config.dialect,
    database: config.database,
    username: config.username,
    password: config.password,
    host: config.host,
    port: config.port,
    logging:config.sql_debug,
    models: [__dirname + '/models']
});