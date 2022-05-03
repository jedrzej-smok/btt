import {QueryInterface} from "sequelize";
import {Sequelize} from "sequelize-typescript";
import {sequelize} from "../sequelize";
const queryInterface = sequelize.getQueryInterface();
import { v4 as uuid } from 'uuid';
queryInterface.bulkInsert('Users',[
  {
    userId:uuid(),
    email:'jedrzej@example.com',
    name: 'jedrzej',
    birthday:new Date(2000, 1, 1),
    creationDate: new Date(),
    updatedOn: new Date()
  }
]).then((res)=>console.log(res)).catch(err => console.log(err));
queryInterface.bulkInsert('Hobbies',[
  {
    name: 'programming languages',
    creationDate: new Date(),
    updatedOn: new Date()
  }
]).then((res)=>console.log(res)).catch(err => console.log(err));
