import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../@database/database.module";
import { ProfilesProviders } from "./profileS.providers";
import { ProfilesService } from "./profiles.service";

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [
        ...ProfilesProviders, 
        ProfilesService
    ],
    exports: [ProfilesService]
})
export class ProfilesModule {

}