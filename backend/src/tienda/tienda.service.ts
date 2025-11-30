// backend/src/tienda/tienda.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PuntajesService } from 'src/puntajes/puntajes.service'; // ⬅️ Usamos el servicio de puntos

// ⬇️ DATOS MOCK DE LA COLECCIÓN Y REGLAS DE CANJE ⬇️
const DINOS_COLECCIONABLES = [
  { id: 1, nombreComun: 'T-Rex', costo: 500, slug: 't-rex', image: '/assets/img/trex.png' },
  { id: 2, nombreComun: 'Triceratops', costo: 1000, slug: 'triceratops', image: '/assets/img/triceratops.png' },
  { id: 3, nombreComun: 'Velociraptor', costo: 250, slug: 'velociraptor', image: '/assets/img/velociraptor.png' },
];
// ⬆️ FIN DATOS MOCK ⬆️

@Injectable()
export class TiendaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly puntajesService: PuntajesService, // ⬅️ Inyección
  ) {}

  /**
   * Obtiene el puntaje total del usuario y el estado de la colección.
   */
  async obtenerEstadoColeccion(usuarioId: number) {
    // Llama a la nueva función de tu servicio de puntos
    const puntosActuales = await this.puntajesService.obtenerPuntajeTotal(usuarioId);
    
    // 1. Obtener coleccionables que el usuario YA TIENE (Placeholder: reemplaza con tu lógica de DB)
    const coleccionDelUsuario = []; 

    // 2. Mapear la lista global con el estado de desbloqueo
    const listaCompleta = DINOS_COLECCIONABLES.map(dino => ({
      ...dino,
      desbloqueado: coleccionDelUsuario.some((c: any) => c.dinoId === dino.id), 
    }));

    return {
      puntajeActual: puntosActuales,
      coleccionables: listaCompleta,
    };
  }

  /**
   * Procesa el canje de puntos por un coleccionable.
   */
  async procesarCanje(usuarioId: number, dinoId: number) {
    const dinoAcanjear = DINOS_COLECCIONABLES.find(d => d.id === dinoId);
    if (!dinoAcanjear) {
      throw new BadRequestException('Dinosaurio coleccionable no válido.');
    }
    const costo = dinoAcanjear.costo;

    // 1. Verificar puntaje usando el servicio de puntos
    const puntosActuales = await this.puntajesService.obtenerPuntajeTotal(usuarioId);
    
    if (puntosActuales < costo) {
      throw new BadRequestException(`Puntos insuficientes. Necesitas ${costo} puntos.`);
    }

    // 2. Ejecutar la transacción
    await this.prisma.$transaction(async (prisma) => {
        // [PASO REAL A IMPLEMENTAR] Registrar el coleccionable desbloqueado en tu tabla 'Coleccion'
        
        // Registrar el descuento de puntos en la tabla Puntajes
        await prisma.puntaje.create({
            data: {
                usuarioId: usuarioId,
                juegoId: 99, // ID especial para identificar el canje
                puntuacion: -costo, // Se resta el costo de los puntos
            },
        });
    });

    return {
        success: true,
        message: `¡${dinoAcanjear.nombreComun} desbloqueado!`,
    };
  }
}