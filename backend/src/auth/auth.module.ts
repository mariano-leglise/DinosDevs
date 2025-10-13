import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailService } from '../mail/mail.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport'; // 💡 NECESARIO
import { JwtStrategy } from './strategies/jwt.strategy'; // 💡 NECESARIO
import { PrismaService } from 'prisma/prisma.service';
@Module({
  imports: [
    ConfigModule,
    // 1. Registrar Passport
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    // 2. Configuración existente de JWT (para generar tokens)
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    MailService,
    // 3. Prover la estrategia JWT y PrismaService
    JwtStrategy,
    PrismaService
  ],
  // 4. EXPORTS CORREGIDOS: Solo exporta lo que debe para que PuntajesModule pueda usar el Guard
  exports: [
    AuthService, 
    MailService,
    JwtStrategy,
    PassportModule, 
    // Quitamos ConfigService y ConfigModule de los exports.
  ]
})
export class AuthModule {}




// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { MailService } from '../mail/mail.service';
// /* Importación de JwtModule: Es necesario importar JwtModule para poder generar y verificar tokens JWT.
//  */import { JwtModule } from '@nestjs/jwt';
// /*  importacion de ConfigService para usarlo y acceder a las variables de entorno.
//  */ import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa ConfigService

//  @Module({
//   imports: [
//     ConfigModule, 
//     JwtModule.register({
//       secret: process.env.JWT_SECRET,
//       signOptions: {
//         expiresIn: process.env.JWT_EXPIRES_IN,
//       },
//     }),
//   ],
//   controllers: [AuthController], // Controlador de autenticación
//   providers: [AuthService,MailService],
//   exports:[AuthService,MailService]
// })
// export class AuthModule {}


// /* 
// ConfigModule debe estar importado en el módulo principal de la aplicación 
// para que las variables del .env sean accesibles globalmente.*/