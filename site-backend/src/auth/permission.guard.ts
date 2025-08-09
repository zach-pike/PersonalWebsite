import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { JwtUser } from './interfaces/jwtuser.interface';

function arraysEqual<T>(arr1: T[], arr2: T[]) {
    if (arr1.length != arr2.length) return false;

    for(let i=0; i<arr1.length; i++) {
        if (arr1[i] != arr2[i]) return false;
    }

    return true;
}


// Permission checking function
/*
    how permissions work

    permissions look like this
    admin.restartServer
    blog.post
    management.someTask.moreSpecificPerm

    take `management.someTask.moreSpecificPerm`

    if the user has just 'management' as their permission they have all subpermissions

    or lets say soemone has the role 'management.someTask' then they will also have access to moreSpecificPerm

    if the user had the perm 'management.diffGroup.something else than thats all they can access, no access to anything outside the tree
*/
function isAuthorized(userPermissions: string[], requiredPermission: string) {
    let requiredPermParts = requiredPermission.split(".");

    for(const userPerm of userPermissions) {
        let userPermParts = userPerm.split(".");
        if (requiredPermParts.length >= userPermParts.length) {
            let slicedRequiredRoles = requiredPermParts.slice(0, userPermParts.length);

            // Are the parts equal?
            if (arraysEqual(slicedRequiredRoles, userPermParts)) return true;
        }
    };

    return false;
}

export const PermissionGuard = (role: string) => {
    class PermissionGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext) {
            const request = context.switchToHttp().getRequest();
            let jwtUser: JwtUser | null = request.user;

            if (!jwtUser) return false;
            
            // permission check
            return isAuthorized(jwtUser.roles, role);
        }
    }

  const guard = mixin(PermissionGuardMixin);
  return guard;
}