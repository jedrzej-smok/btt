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


@Table
export class Meal extends Model<Meal> {

  @PrimaryKey
  @Column
  id!: number;

  @Column(DataType.TEXT)
  name: string;

  @Column(DataType.TEXT)
  instructions: string;

  @Column(DataType.TEXT)
  ingredientsNumber: string;

  @Column(DataType.TEXT)
  ytLink: string;



  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

}
