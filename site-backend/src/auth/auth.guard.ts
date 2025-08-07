import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        
        if (!request.headers.authorization)
            throw new UnauthorizedException('Authorization header missing');

        const accessToken = this.getToken(request.headers.authorization);
        let res = await this.authService.verify(accessToken);

        if (!res) return false;

        request.user = res;
        return true;
    }

    getToken(authHeader: string | null) {
        if (!authHeader) return "";
        return authHeader.replace("Bearer ", "");
    }
}
