//https://www.npmjs.com/package/sequelize-typescript
//https://github.com/RobinBuschmann/sequelize-typescript-example/blob/master/lib/models/Actor.ts
import {
    Table,
    Column,
    Model,
    DataType,
    BelongsToMany, Scopes, Unique, CreatedAt, UpdatedAt, DeletedAt,
} from 'sequelize-typescript'
import {User} from "./User";
import {HobbyUser} from "./HobbyUser";
@Scopes(() => ({
    movies: {
        include: [
            {
                model: User,
                through: {attributes: []},
            },
        ],
    },
}))

@Table
export class Hobby extends Model<Hobby> {

    @Unique
    @Column(DataType.TEXT)
    name!: string

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;

    @DeletedAt
    deletionDate: Date;


    @BelongsToMany(() => User, () => HobbyUser)
    users?: User[]
}
