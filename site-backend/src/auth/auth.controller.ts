import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/auth/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly usersService: UsersService) {}

    @Post('new_user')
    async newUser(@Body() data: CreateUserDTO) {
        let res = await this.usersService.createNewUser(data.username, data.displayName, data.password);

        if (!res) throw new HttpException("Server error", 500);
        return "OK";
    }

    @Post('login')
    async login(@Body() data: LoginDTO) {
        let res = await this.authService.login(data);

        return res;
    }

    @Post('refresh')
    async refresh(@Body() data: { refreshToken: string }) {
        let res = await this.authService.refreshUser(data.refreshToken);

        if (!res) throw new HttpException("Could not refresh user", 400);

        return res;
    }
}
