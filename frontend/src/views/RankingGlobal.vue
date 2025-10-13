<template>
  <div class="ranking-container">
    <button @click="volverjuegos" class="btn-volver">
        <i class="fas fa-sign-out-alt"></i> Volver a Juegos
    </button>

    <h2>🏆 Ranking Global DinoDevs 🏆</h2>

    <div v-if="loading" class="loading-message">
        Cargando puntajes...
    </div>

    <div v-else-if="error" class="error-message">
        Error al cargar el ranking: {{ error }}
    </div>

    <div v-else class="ranking-table-wrapper">
        <table class="ranking-table">
            <thead>
                <tr>
                    <th>Posición</th>
                    <th>Nombre de Usuario</th>
                    <th>Puntos Totales</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in rankingData"
                    :key="item.usuarioId"
                    :class="{ 'top-three': item.posicion <= 3 }"
                >
                    <td class="posicion">{{ item.posicion }}</td>
                    <td class="nombre">{{ item.nombre }}</td>
                    <td class="puntos">{{ item.puntosTotales }}</td>
                </tr>
            </tbody>
        </table>
        <p v-if="rankingData.length === 0">Aún no hay puntajes registrados. ¡Sé el primero!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// Asegúrate que esta ruta sea correcta para tu servicio de puntajes
import { obtenerRanking } from '@/services/puntajeService';

const rankingData = ref([]);
const loading = ref(true);
const error = ref(null);
const router = useRouter();

/**
 * Carga los datos del ranking desde el backend.
 */
const fetchRanking = async () => {
    loading.value = true;
    error.value = null;
    try {
        // Llama a la función que hace GET /puntajes/ranking
        const data = await obtenerRanking();
        rankingData.value = data;
    } catch (err) {
        // Maneja el error de conexión o de la respuesta del servidor
        error.value = err.message || 'Error desconocido al obtener el ranking.';
    } finally {
        loading.value = false;
    }
};

const volverjuegos = () => {
    router.push('/juegos');
};

// Cargar el ranking al montar el componente
onMounted(() => {
    fetchRanking();
});
</script>

<style scoped>
.ranking-container {
    background: url('@/assets/fondodesenfocado.jpg') no-repeat;
    background-size: cover;
    background-position: center center;
    color: #f0ead2;
    padding: 30px;
    text-align: center;
    font-family: Arial, sans-serif;
    min-height: 100vh;
    box-sizing: border-box;
}

h2 {
  font-family: 'Fredoka One', cursive;
  font-size: 2.8rem;
    color: #ffd640;
    margin-bottom: 30px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

}

.ranking-table-wrapper {
    max-width: 800px;
    margin: 0 auto;
    background-color: #3c6652; /* Fondo de la tabla */
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 20px rgb(0, 0, 0);
}

.ranking-table {
    width: 100%;
    border-collapse: collapse;
}

.ranking-table th {
    background-color: #4a7a5b;
    color: #fffdd0;
    padding: 15px;
    text-transform: uppercase;
    font-size: 1rem;
}

.ranking-table td {
    padding: 15px;
    border-top: 1px solid #4a7a5b;
    font-size: 1.1rem;
}

.ranking-table tbody tr:nth-child(even) {
    background-color: #436e59;
}

.ranking-table tbody tr:hover {
    background-color: #55806c;
    transform: scale(1.02);
    transition: background-color 0.3s, transform 0.3s;
}

/* Estilos para el Top 3 */
.top-three {
    font-weight: bold;
    color: #ffcc00;
}

.posicion {
    width: 10%;
    font-size: 1.3rem;
}

.puntos {
    width: 30%;
    color: #79ff79;
    font-weight: bold;
}

/* Botón Volver */
.btn-volver {
    background-color: #4a7a5b;
    color: #f0ead2;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    margin-bottom: 20px;
    transition: background-color 0.3s;
}

.btn-volver:hover {
    background-color: #5b8e6b;
}

.loading-message, .error-message {
    padding: 20px;
    font-size: 1.2rem;
    color: #ffcc00;
}
</style>
