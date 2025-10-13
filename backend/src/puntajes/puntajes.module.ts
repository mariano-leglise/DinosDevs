// src/puntajes/puntajes.module.ts Este módulo organiza el controlador y el servicio.



import { Module } from '@nestjs/common';
import { PuntajesController } from './puntajes.controller';
import { PuntajesService } from './puntajes.service';
// ⚠️ Ajusta esta ruta si tu PrismaService no está en 'prisma/prisma.service'
import { PrismaService } from 'prisma/prisma.service'; 

@Module({
  controllers: [PuntajesController],
  providers: [PuntajesService, PrismaService],
  // Exportar el servicio si otros módulos lo necesitan
  // exports: [PuntajesService], 
})
export class PuntajesModule {}