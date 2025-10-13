// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// 1. Inicializa el cliente de Prisma
const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando el seeding de Juegos...');

  // 2. Definición de los juegos con sus IDs fijos
  const juegos = [
    {
      id: 1, // ID fijo para el frontend (Vue)
      nombre: 'Juego de Memoria',
      descripcion: 'Juego de cartas para encontrar pares de dinosaurios.',
    },
    {
      id: 2, // ID fijo para el frontend (Vue)
      nombre: 'Dino Run',
      descripcion: 'Juego de carrera.',
    },
  ];

  // 3. Insertar o actualizar los juegos (UPSERT)
  // Usamos upsert para evitar duplicados si corres el script varias veces.
  for (const juego of juegos) {
    const juegoCreado = await prisma.juego.upsert({
      where: { id: juego.id }, 
      update: {
        nombre: juego.nombre,
        descripcion: juego.descripcion,
      },
      create: juego, // Crea si no existe
    });
    console.log(`✅ Juego insertado/actualizado: ${juegoCreado.nombre} (ID: ${juegoCreado.id})`);
  }

  console.log('Seeding de Juegos completado exitosamente.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // 4. Cierra la conexión de Prisma al finalizar
    await prisma.$disconnect();
  });