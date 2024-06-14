import { Body, Controller, Get, HttpCode, HttpStatus, Request, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { AuthGuard } from "./guards/auth.guard";
import { Public } from "./decorators/public.decorator";

@Controller('/api/v1/auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Public()
    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Public()
    @Get('logout')
    logout() {
        return this.authService.logout();
    }
    
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}