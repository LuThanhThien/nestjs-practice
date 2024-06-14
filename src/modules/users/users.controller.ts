import { Body, Controller, Get, Param, Patch, Request } from "@nestjs/common";
import { UsersService } from "./users.service";
import { HasRoles } from "../auth/decorators/has-role.decorator";
import { Role } from "./enum/role.enum";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('/api/v1/users')
export class UsersController {

    constructor(
        private usersService: UsersService
    ) {
    }

    @Get()
    @HasRoles(Role.ADMIN)
    getUsers() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @HasRoles(Role.ADMIN)
    getUser(@Param("id") id: number) {
        return this.usersService.findById(id);
    }
    
    @Patch('')
    updateUser(@Request() request: any, @Body() user: UpdateUserDto) {
        return this.usersService.update(request.user.sub, user);
    }


}