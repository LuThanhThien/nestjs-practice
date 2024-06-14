import { DataSource } from "typeorm";
import { Profile } from "./profiles.entity";
export const ProfilesProviders = [
    {
        provide: 'PROFILES_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Profile),
        inject: ['DATA_SOURCE'],
    }
]