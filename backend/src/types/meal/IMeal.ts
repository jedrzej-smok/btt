import {Column, DataType} from "sequelize-typescript";

export interface IMeal{
    id: number,
    name:string,
    instructions: string,
    ingredientsNumber: number,
    ytLink: string,
    queryName: string,
    imagePath: string,
    imageUrl: string,
}