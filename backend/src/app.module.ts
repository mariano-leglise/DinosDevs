// backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config'; 

// ⬇️ IMPORTS NECESARIOS PARA SERVIR ARCHIVOS ESTÁTICOS ⬇️
import { ServeStaticModule } from '@nestjs/serve-static'; 
import { join } from 'path'; // Utilidad de Node.js para manejar rutas

import { AuthModule } from './auth/auth.module'; 
import { UsersModule } from './users/users.module'; 
import { MailModule } from './mail/mail.module';

import { PuntajesModule } from './puntajes/puntajes.module';
import { TiendaModule } from './tienda/tienda.module';

@Module({
  imports: [
    // ⬇️ CONFIGURACIÓN CRÍTICA PARA ARCHIVOS ESTÁTICOS (Realidad Aumentada) ⬇️
    ServeStaticModule.forRoot({
      // '__dirname' es la carpeta 'src'. '..' sube al raíz del proyecto. 'public' es la carpeta.
      rootPath: join(__dirname, '..', 'public'), 
      serveRoot: '/', // Esto permite acceder a tus archivos desde la raíz
      
      // 🚨 CORRECCIÓN CRÍTICA PARA EL TIPO MIME GLB 🚨
      serveStaticOptions: {
          // Forzamos al servidor a enviar el Content-Type correcto 
          // ('model/gltf-binary') para que los móviles acepten el modelo 3D.
          // Usamos setHeaders para establecer el Content-Type en archivos .glb
          setHeaders: (res, path, stat) => {
            if (path.endsWith('.glb')) {
              res.setHeader('Content-Type', 'model/gltf-binary');
            }
          },
      },
      // ⬆️ FIN DE LA CORRECCIÓN ⬆️
    }),
    // ⬆️ FIN CONFIGURACIÓN ESTÁTICA ⬆️

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule, 
    AuthModule, 
    UsersModule,
    MailModule,
    PuntajesModule,
    TiendaModule, 
  ],
})
export class AppModule {}