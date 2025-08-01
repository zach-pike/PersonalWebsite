import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { TokensDTO } from './dto/tokens.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async login(obj: LoginDTO): Promise<null | TokensDTO> {
        let user = await this.usersService.findUserByUsername(obj.username);
        if (!user) return null;

        let authed = await this.usersService.authorizeUser(user, obj.password);

        if (!authed) return null;

        let jwtObject = {
            username: user.username,
            displayName: user.displayName,
            roles: user.roles,
            created: user.created
        };

        let accessSecret = process.env.ACCESS_TOKEN_SECRET;
        let refreshSecret = process.env.REFRESH_TOKEN_SECRET;
        if (!accessSecret) throw "No access token specified!";
        if (!refreshSecret) throw "No refresh token specified!";

        let accessToken = jwt.sign(jwtObject, accessSecret, { expiresIn: "5m" });
        let refreshToken = jwt.sign(jwtObject, refreshSecret, { expiresIn: "1h" });

        return {
            accessToken,
            refreshToken
        };
    }
}
