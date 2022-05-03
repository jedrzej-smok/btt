//https://www.npmjs.com/package/sequelize-typescript
//https://github.com/RobinBuschmann/sequelize-typescript-example/blob/master/lib/models/Actor.ts
import {
  Table,
  Column,
  Model,
  DataType,
  DeletedAt,
  UpdatedAt,
  CreatedAt,
  PrimaryKey, IsUUID, Unique, IsEmail, BelongsToMany
} from 'sequelize-typescript'
import {Hobby} from "./Hobby";
import {HobbyUser} from "./HobbyUser";

@Table
export class User extends Model<User> {

  @IsUUID(4)  @PrimaryKey
  @Column
  userId: string

  @Unique(true) @IsEmail
  @Column(DataType.TEXT)
  email!: string

  @Column(DataType.TEXT)
  name!: string

  @Column(DataType.DATEONLY)
  birthday?: Date

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

  @BelongsToMany(() => Hobby, () => HobbyUser)
  movies?: User[];

}
