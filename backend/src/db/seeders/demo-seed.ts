import {QueryInterface} from "sequelize";
import {DeletedAt, Sequelize} from "sequelize-typescript";
import {sequelize} from "../sequelize";
import {IMeal} from "../../types";
import {Meal} from "../models/Meal";
const queryInterface = sequelize.getQueryInterface();


export const seed = async() : Promise<void|string> => {
  try{
    const inserts: Partial<Meal>[] = [
      {
        id: 522,
        name:'test',
        instructions: 'test',
        ingredientsNumber: 'test',
        ytLink: 'test',
        queryName: 'test-query',
        imagePath: 'path',
        creationDate:new Date(),
        updatedOn:new Date(),
        deletionDate:null
      } ,
    ]
    await queryInterface.bulkInsert('Meals',inserts);
    }catch(e){
    return e;
  }

};

