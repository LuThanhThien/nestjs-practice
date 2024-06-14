import { Profile } from "src/modules/profile/profiles.entity";
import { Role } from "../enum/role.enum";

export class UpdateUserDto {
    name: string;
    email: string;
    profile: Profile;
}