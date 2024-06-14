import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { User } from "../users/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private SALT_OR_ROUNDS = 10

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}
    
    async login(loginDto: LoginDto) : Promise<AuthResponseDto> {
        const userFound = await this.userService.findByEmail(loginDto.email)
        if (userFound === null) 
            throw new NotFoundException("User not found");
        if (!(await this.comparePassword(loginDto.password, userFound.password))) 
            throw new UnauthorizedException("Invalid password");
        return {
            accessToken: await this.generateJwt(userFound),
        };
    }

    async register(registerDto: RegisterDto) : Promise<AuthResponseDto> {
        if (registerDto.confirmPassword !== registerDto.password)
            throw new BadRequestException('Passwords do not match');
        const userExist = await this.userService.existByEmail(registerDto.email);
        if (userExist) throw new BadRequestException('User already exists');
        registerDto.password = await this.encryptPassword(registerDto.password);
        const newUser = await this.userService.create(registerDto);
        return {
            accessToken: await this.generateJwt(newUser),
        }
    }   
    
    async logout() {
        return 'Logout';
    }

    private async generateJwt(user: User) : Promise<string> {
        const payload = {
            sub: user.id,
            username: user.email,
            role: user.role
        }
        return await this.jwtService.signAsync(payload);
    }

    private async encryptPassword(password: string) : Promise<string> {
        return await bcrypt.hash(password, this.SALT_OR_ROUNDS);
    }

    private async comparePassword(password: string, hash: string) : Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

}
