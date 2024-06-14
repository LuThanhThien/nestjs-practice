import { DataSource } from "typeorm";
import { User } from "./user.entity";
export const UsersProviders = [
    {
        provide: 'USERS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: ['DATA_SOURCE'],
    }
]