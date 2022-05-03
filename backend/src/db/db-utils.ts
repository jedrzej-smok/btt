import * as dotenv from 'dotenv';
dotenv.config();
import * as util from 'util'
import * as child_process from 'child_process';
import { exit } from 'node:process';
import {Sequelize} from "sequelize-typescript";
const exec = util.promisify(child_process.exec);
//db connection, models synchronization

export async function dbCreate():Promise<void|string>{
    const {stdout, stderr} = await exec("sequelize db:create");
    if(stderr){
        console.log(stderr);
        return Promise.reject(new Error('400'));
    }else{
        console.log(stdout);
    }
};
export async function dbSyncForceAndFill(sequelize: Sequelize):Promise<void|string>{
    await sequelize.sync({force:true});
    console.log("All models were synchronized successfully...");
    const {stdout, stderr} = await exec("sequelize db:seed:all");
    if(stderr){
        console.log(stderr);
        return Promise.reject(new Error('400'));
    }else{
        console.log('Seeds were done.');
    }
};
export async function dbSyncModel(sequelize: Sequelize):Promise<void>{
    await sequelize.sync();
    console.log("All models were synchronized successfully...");
};


export async function dbConnectionTest(sequelize: Sequelize):Promise<void>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully...');
        } catch (error) {
        console.error('Unable to connect to the database:', error);
        exit(1);
    }
};

