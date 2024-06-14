import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { RegisterDto } from "../auth/dto/register.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findById(id: number): Promise<User> {
        return this.userRepository.findOneBy({
            id: id
        });
    }

    async findByEmail(email: string): Promise<User> {
        return this.userRepository.findOneBy({
            email: email
        });
    }

    async create(user: RegisterDto): Promise<User> {
        const saveUser = this.userRepository.create(user);
        return this.userRepository.save(saveUser);
    }

    async updateAndGet(id: number, userData: Partial<User>): Promise<User> {
        await this.userRepository.update(id, userData);
        return this.userRepository.findOneBy({
            id: id
        });
    }

    async update(id: number, user: UpdateUserDto): Promise<User> {
        return await this.updateAndGet(id, user);
    }

    async existByEmail(email: string) {
        return this.userRepository.findOneBy({
            email: email,
        }).then((user) => {
            if (user !== null) return true;
            return false;
        })
    }

    async findByEmailThrow(email: string): Promise<User> {
        const user = await this.userRepository.findOneBy({
            email: email
        });
        if (!user) throw new NotFoundException('User does not exist.');
        return user;
    }
}