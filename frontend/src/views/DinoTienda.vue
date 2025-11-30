<template>
  <div class="dino-tienda-container">
    <h1>🦕 Dino Tienda y Colección</h1>
    <p class="puntaje-actual">
      Puntos Actuales: <strong>{{ puntajeActual }}</strong>
    </p>

    <div class="coleccion-grid">
      <div v-for="dino in listaColeccion" :key="dino.id" class="item-card">

        <h2>{{ dino.nombreComun }}</h2>
        <img :src="dino.image" :alt="dino.nombreComun" class="dino-image"/>

        <div v-if="dino.desbloqueado" class="estado-desbloqueado">
          <h3>✅ ¡Coleccionado!</h3>
          <p>Escanea para verlo en Realidad Aumentada:</p>

          <QRCodeVue :value="getQrCodeUrl(dino.slug)" :size="120" level="H" />

        </div>

        <div v-else class="estado-bloqueado">
          <p>Costo: {{ dino.costo }} puntos</p>
          <button
            @click="canjearDino(dino)"
            :disabled="puntajeActual < dino.costo"
            :class="{ 'btn-canjear': true, 'btn-disabled': puntajeActual < dino.costo }"
          >
            Canjear
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import QRCodeVue from 'qrcode.vue';
// Importa tus servicios necesarios (ej: para puntaje y colección)
// import { usePuntajeService } from '@/services/puntajeService';
// import { useDinoService } from '@/services/dinoService';

const puntajeActual = ref(0);
const listaColeccion = ref([]);

// ⚠️ ATENCIÓN: Esta URL debe coincidir con la configuración de NestJS
const BASE_URL_RA = 'http://192.168.0.17:3000/ra/'; // Ajusta según tu configuración

/**
 * Genera la URL estática para el código QR.
 * @param {string} slug - Identificador único del dinosaurio (ej: 't-rex').
 * @returns {string} La URL completa al archivo HTML de RA.
 */
const getQrCodeUrl = (slug) => {
    // Ejemplo: https://tusitio.com/ra/t-rex-ra.html
    return `${BASE_URL_RA}${slug}-ra.html`;
};

/**
 * Función que carga el puntaje del usuario y la lista de coleccionables desde NestJS.
 */
const cargarDatos = async () => {
    // --- Lógica Real (debes adaptarla a tu API de NestJS) ---
    // puntajeActual.value = await usePuntajeService().obtenerPuntaje();
    // listaColeccion.value = await useDinoService().obtenerColeccion(userId);

    // --- DATOS MOCK para probar la vista ---
    puntajeActual.value = 850;
    listaColeccion.value = [
      { id: 1, nombreComun: 'T-Rex', costo: 500, desbloqueado: true, slug: 't-rex', image: '/ruta/a/trex.png' },
      { id: 2, nombreComun: 'Triceratops', costo: 1000, desbloqueado: false, slug: 'triceratops', image: '/ruta/a/triceratops.png' },
      { id: 3, nombreComun: 'Velociraptor', costo: 250, desbloqueado: true, slug: 'velociraptor', image: '/ruta/a/velociraptor.png' },
    ];
};

/**
 * Lógica para canjear puntos por un dinosaurio.
 * @param {object} dino - El objeto del dinosaurio a canjear.
 */
const canjearDino = async (dino) => {
    if (puntajeActual.value < dino.costo) return;

    // 1. Llamada a NestJS para procesar el canje, descontar puntos y actualizar DB
    // const resultado = await usePuntajeService().procesarCanje(dino.id);

    // 2. Si es exitoso, actualiza el estado local y recarga datos:
    // puntajeActual.value -= dino.costo;
    // dino.desbloqueado = true;

    // --- Lógica MOCK ---
    console.log(`Canjeando ${dino.nombreComun} por ${dino.costo} puntos.`);
    puntajeActual.value -= dino.costo;
    dino.desbloqueado = true;
};

onMounted(() => {
    cargarDatos();
});
</script>

<style scoped>
/* Añade aquí estilos básicos para la tienda, similar a DinoJuegos.vue */
.dino-tienda-container {
  background-color: #2e4d3d;
  color: #f0ead2;
  padding: 20px;
  text-align: center;
  min-height: 100vh;
}

.puntaje-actual {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.coleccion-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.item-card {
  background: linear-gradient(135deg, #4a7a5b, #5c8a70);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

.dino-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
}

.estado-desbloqueado h3 {
    color: #aaffaa;
}

.btn-canjear {
  background-color: #f79d65;
  color: #220f0f;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-canjear:hover:not(:disabled) {
    background-color: #ffa872;
}

.btn-disabled {
    background-color: #837b77 !important;
    cursor: not-allowed;
}
</style>
