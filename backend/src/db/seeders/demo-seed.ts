import {QueryInterface} from "sequelize";
import {Sequelize} from "sequelize-typescript";
import {sequelize} from "../sequelize";
import {IMeal} from "../../types";
const queryInterface = sequelize.getQueryInterface();


export const seed = async() : Promise<void|string> => {
  try{
    const inserts: IMeal[] = [
      {
        id: 522,
        name:'test',
        instructions: 'test',
        ingredientsNumber: 'test',
        ytLink: 'test'
      } ,
    ]
    await queryInterface.bulkInsert('Meals',inserts);
    }catch(e){
    return e;
  }

};

