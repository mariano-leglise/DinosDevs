// src/puntajes/puntajes.controller.ts Este controlador define las rutas API (/puntajes) y es esencial para que el frontend no devuelva un error 404.

import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { PuntajesService } from './puntajes.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('puntajes') // ⬅️ RUTA BASE CORRECTA: /puntajes
export class PuntajesController {
  constructor(private readonly puntajesService: PuntajesService) {}

  /**
   * Endpoint: POST /puntajes
   * Para registrar un puntaje. Requiere autenticación (JWT).
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  async crearPuntaje(
    // Extrae el ID del token JWT
    @GetUser('userId') usuarioId: number, 
    @Body() body: { juegoId: number, puntuacion: number }
  ) {
    return this.puntajesService.registrarPuntaje(
      usuarioId, 
      body.juegoId, 
      body.puntuacion
    );
  }
  
  /**
   * Endpoint: GET /puntajes/ranking
   * Para obtener el ranking global. Es público.
   */
  @Get('ranking') // ⬅️ RUTA COMPLETA CORRECTA: /puntajes/ranking
  async getRanking() {
    return this.puntajesService.obtenerRankingGlobal();
  }
}