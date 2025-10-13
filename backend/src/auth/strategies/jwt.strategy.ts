// src/auth/strategies/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
// Navega: Sale de 'strategies' (1), sale de 'auth' (2), y entra en 'prisma'
import { PrismaService } from '../../../prisma/prisma.service'
// Define la estructura mínima del payload de tu token
interface JwtPayload {
  userId: number; // Debe coincidir con el valor que usas en auth.service.ts
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.prisma.usuario.findUnique({
      where: { id: payload.userId },
      select: { id: true, nombre: true, email: true },
    });

    if (!user) {
      throw new UnauthorizedException('Token inválido o usuario no encontrado.');
    }
    
    // Retorna el objeto que será adjuntado a request.user
    return { userId: user.id, nombre: user.nombre }; 
  }
}