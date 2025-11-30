// backend/src/tienda/tienda.module.ts

import { Module } from '@nestjs/common';
import { TiendaService } from './tienda.service';
import { TiendaController } from './tienda.controller';
import { PrismaService } from 'prisma/prisma.service'; // Asegúrate que esta ruta sea correcta
import { PuntajesService } from 'src/puntajes/puntajes.service'; // ⬅️ Importamos el servicio de puntos

@Module({
  imports: [],
  controllers: [TiendaController],
  // Proveemos todos los servicios que la Tienda necesita (Prisma y PuntajesService)
  providers: [TiendaService, PrismaService, PuntajesService], 
  exports: [TiendaService], // Exportamos por si otros módulos lo necesitan
})
export class TiendaModule {}