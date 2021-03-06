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
  @Unique
  @Column(DataType.TEXT)
  name: string;

  @Column(DataType.TEXT)
  instructions: string;

  @Column(DataType.INTEGER)
  ingredientsNumber: number;

  @Column(DataType.TEXT)
  ytLink: string;

  @Column(DataType.TEXT)
  queryName: string;

  @Column(DataType.TEXT)
  imagePath: string;

  @Column(DataType.TEXT)
  imageUrl: string;



  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

}
