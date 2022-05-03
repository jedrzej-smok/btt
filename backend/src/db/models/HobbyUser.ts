import {Model, Column, Table, ForeignKey} from "sequelize-typescript";
import {Hobby} from "./Hobby";
import {User} from "./User";

@Table
export class HobbyUser extends Model<HobbyUser> {

    @ForeignKey(() => Hobby)
    @Column
    hobbyId!: number;

    @ForeignKey(() => User)
    @Column
    userId!: string;
}