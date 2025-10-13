// src/puntajes/puntajes.service.ts Este servicio maneja la lógica de la base de datos (Prisma).


import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; // AJUSTA ESTA RUTA

@Injectable()
export class PuntajesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Registra un nuevo puntaje para un usuario.
   */
  async registrarPuntaje(usuarioId: number, juegoId: number, puntuacion: number) {
    return this.prisma.puntaje.create({
      data: {
        usuarioId: usuarioId, // ID extraído del JWT
        juegoId: juegoId,
        puntuacion: puntuacion,
      },
    });
  }

  /**
   * Calcula y devuelve el ranking global (suma de puntajes por usuario).
   */
  async obtenerRankingGlobal() {
    // 1. Agrupar y sumar puntajes por usuario
    const rawRanking = await this.prisma.puntaje.groupBy({
      by: ['usuarioId'],
      _sum: {
        puntuacion: true,
      },
      orderBy: {
        _sum: {
          puntuacion: 'desc', // Ordenar de mayor a menor
        },
      },
    });

    // 2. Obtener los nombres de usuario asociados
    const userIds = rawRanking.map(r => r.usuarioId);
    const users = await this.prisma.usuario.findMany({
      where: {
        id: { in: userIds },
      },
      select: {
        id: true,
        nombre: true, // Debe coincidir con tu modelo de usuario
      },
    });

    const usersMap = new Map(users.map(u => [u.id, u.nombre]));
    
    // 3. Formatear, añadir el nombre y la posición
    return rawRanking.map((r, index) => ({
      posicion: index + 1,
      usuarioId: r.usuarioId,
      nombre: usersMap.get(r.usuarioId) || 'Usuario Desconocido',
      puntosTotales: r._sum.puntuacion || 0,
    }));
  }
}