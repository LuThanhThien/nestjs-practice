import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/@database/database.module";
import { TenantService } from "./tenant.service";
import { TenantController } from "./tenant.controller";
import { TenantProviders } from "./tenant.providers";


@Module({
    imports: [DatabaseModule],
    controllers: [TenantController],
    providers: [
        TenantService,
        ...TenantProviders
    ],
    exports: []
}
)
export class TenantModule {

}