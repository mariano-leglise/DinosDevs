// src/auth/decorators/get-user.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user; // Objeto de usuario retornado por JwtStrategy

    // Permite obtener solo el campo 'userId' (ej: @GetUser('userId'))
    return data ? user?.[data] : user;
  },
);