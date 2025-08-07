export interface JwtUser {
    username: string;
    displayName: string;
    roles: string[];
    created: number;
    _id: string;
}