import {Column, DataType} from "sequelize-typescript";

export interface IMeal{
    id: number,
    name:string,
    instructions: string,
    ingredientsNumber: string,
    ytLink: string
}