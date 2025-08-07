import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { TokensDTO } from './dto/tokens.dto';
import * as jwt from 'jsonwebtoken';
import { JwtUser } from './interfaces/jwtuser.interface';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    private refreshTokens: string[] = [];

    async refreshUser(refresh: string) {
        // Decode the user data
        let data = await this.verifyRefresh(refresh);
        if (!data) return null;

        // Check if refresh token is used
        if (this.refreshTokens.includes(refresh)) return null;

        let newUserData: JwtUser = {
            username: data.username,
            displayName: data.displayName,
            roles: data.roles,
            created: data.created,
            _id: data._id
        };

        // Mark token as used and no longer available to be used
        this.refreshTokens.push(refresh);

        // Resign the data
        return this.signObject(newUserData);
    }

    async login(obj: LoginDTO): Promise<null | TokensDTO> {
        let user = await this.usersService.findUserByUsername(obj.username);
        if (!user) return null;

        let authed = await this.usersService.authorizeUser(user, obj.password);
        if (!authed) return null;

        let jwtObject: JwtUser = {
            username: user.username,
            displayName: user.displayName,
            roles: user.roles,
            created: user.created,
            _id: user._id as string
        };

        return this.signObject(jwtObject);
    }

    signObject(userData: JwtUser): TokensDTO {
        let accessSecret = process.env.ACCESS_TOKEN_SECRET;
        let refreshSecret = process.env.REFRESH_TOKEN_SECRET;
        if (!accessSecret) throw "No access token specified!";
        if (!refreshSecret) throw "No refresh token specified!";

        let accessToken = jwt.sign(userData, accessSecret, { expiresIn: "5m" });
        let refreshToken = jwt.sign(userData, refreshSecret, { expiresIn: "1h" });

        return {
            accessToken,
            refreshToken
        };
    }

    async verify(token: string): Promise<null | JwtUser> {
        let accessSecret = process.env.ACCESS_TOKEN_SECRET;
        if (!accessSecret) throw "No access token specified!";

        try {
            let data = jwt.verify(token, accessSecret);
            return data as JwtUser;
        } catch(e) {
            return null;
        }
    }

    async verifyRefresh(token: string): Promise<null | JwtUser> {
        let refreshSecret = process.env.REFRESH_TOKEN_SECRET;
        if (!refreshSecret) throw "No refresh token specified!";

        try {
            let data = jwt.verify(token, refreshSecret);
            return data as JwtUser;
        } catch(e) {
            return null;
        }
    }
}
