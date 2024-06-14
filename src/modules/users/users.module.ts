import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { DatabaseModule } from "../../@database/database.module";
import { ProfilesModule } from "../profile/profiles.module";
import { UsersProviders } from "./users.providers";

@Module({
    imports: [DatabaseModule, ProfilesModule],
    controllers: [UsersController],
    providers: [
        UsersService,
        ...UsersProviders,
    ],
    exports: [UsersService]
})
export class UsersModule {

}