import { Request } from "express";

export const extractTokenFromHeader = (request: Request): string | undefined => {
    return extractToken(request.headers.authorization);
}


export const extractToken = (authorization:string) : string | undefined =>{
    const [type, token] = authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
}