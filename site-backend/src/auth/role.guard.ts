import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { JwtUser } from './interfaces/jwtuser.interface';


export const RoleGuard = (role: string) => {
    class RoleGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext) {
            const request = context.switchToHttp().getRequest();
            let jwtUser: JwtUser | null = request.user;

            if (!jwtUser) return false;
            if (jwtUser.roles.indexOf(role) != -1) return true;

            return false;
        }
    }

  const guard = mixin(RoleGuardMixin);
  return guard;
}