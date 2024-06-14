import { DataSource } from "typeorm";
import { Tenant } from "./tenant.entity";
export const TenantProviders = [
    {
        provide: 'TENANTS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Tenant),
        inject: ['DATA_SOURCE'],
    }
]