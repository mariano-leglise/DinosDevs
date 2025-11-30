// backend/src/tienda/tienda.controller.ts

import { Controller, Get, Post, Body, UseGuards, BadRequestException } from '@nestjs/common';
import { TiendaService } from './tienda.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'; 
import { GetUser } from 'src/auth/decorators/get-user.decorator'; 

@Controller('tienda') // RUTA BASE: /tienda
@UseGuards(JwtAuthGuard) // Requiere sesión iniciada
export class TiendaController {
  constructor(private readonly tiendaService: TiendaService) {}

  /**
   * Endpoint: GET /tienda/coleccion
   * Devuelve el puntaje actual del usuario y el estado de sus coleccionables.
   */
  @Get('coleccion') 
  async getEstadoColeccion(
    @GetUser('userId') usuarioId: number, 
  ) {
    return this.tiendaService.obtenerEstadoColeccion(usuarioId);
  }

  /**
   * Endpoint: POST /tienda/canjear
   * Procesa el canje de un coleccionable por puntos.
   */
  @Post('canjear')
  async canjearDino(
    @GetUser('userId') usuarioId: number, 
    @Body('dinoId') dinoId: number,
  ) {
    if (!dinoId) {
        throw new BadRequestException('Se requiere el ID del dinosaurio a canjear.');
    }
    return this.tiendaService.procesarCanje(usuarioId, dinoId);
  }
}