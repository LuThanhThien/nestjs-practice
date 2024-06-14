import { Inject, Injectable, Res } from "@nestjs/common";
import { Repository } from "typeorm";
import { Profile } from "./profiles.entity";

@Injectable()
export class ProfilesService {
    constructor(
        @Inject('PROFILES_REPOSITORY')
        private profilesRepository: Repository<Profile>
    ) {}

    findById(id: number): Promise<Profile> {
        return this.profilesRepository.findOneBy({
            id: id
        });
    }

    createNew(): Promise<Profile> {
        const saveProfile = this.profilesRepository.create(new Profile());
        return this.profilesRepository.save(saveProfile);
    }



}