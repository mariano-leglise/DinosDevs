// services/puntajeService.js

import api from './api';

/**
 * Registra el puntaje de un juego específico.
 * El token JWT se añade automáticamente por el interceptor de api.js.
 * El backend (NestJS) usará ese token para determinar el usuarioId.
 *
 * @param {number} juegoId - ID del juego (1: Memoria, 2: Dino Run, etc.).
 * @param {number} puntuacion - Puntuación obtenida en el juego.
 * @returns {Promise<any>} Datos de respuesta del servidor.
 * @throws {Error} Si ocurre un error durante la solicitud.
 */
export const registrarPuntaje = async (juegoId, puntuacion) => {
    try {
        // Llama al endpoint POST /puntajes
        const response = await api.post('/puntajes', {
            juegoId,
            puntuacion
        });
        return response.data;
    } catch (error) {
        // Manejar errores como 401 Unauthorized (si el token expiró)
        console.error('Error al registrar puntaje:', error.response?.data?.message || error.message);
        throw error;
    }
};

/**
 * Obtiene el ranking global de puntajes desde el backend.
 * * @returns {Promise<Array<Object>>} Lista de usuarios en orden de puntaje total.
 * @throws {Error} Si ocurre un error durante la solicitud.
 */
export const obtenerRanking = async () => {
    try {
        // Llama al endpoint GET /puntajes/ranking
        const response = await api.get('/puntajes/ranking');
        return response.data;
    } catch (error) {
        console.error('Error al obtener ranking:', error.response?.data?.message || error.message);
        throw error;
    }
};


// --------------------------------------------------------
// ⬇️ FUNCIONES NUEVAS PARA LA DINO TIENDA (TIENDAMODULE) ⬇️
// --------------------------------------------------------

/**
 * Obtiene el puntaje total del usuario logueado y la lista de coleccionables.
 * Llama al nuevo endpoint GET /tienda/coleccion (TiendaController).
 *
 * @returns {Promise<Object>} Objeto con el puntaje actual y la lista de coleccionables.
 */
export const obtenerEstadoColeccion = async () => {
    try {
        // Llama a la nueva ruta del TiendaModule
        const response = await api.get('/tienda/coleccion');
        return response.data;
    } catch (error) {
        console.error('Error al obtener estado de colección:', error.response?.data?.message || error.message);
        throw error;
    }
};

/**
 * Llama al backend para canjear un dinosaurio.
 * Llama al nuevo endpoint POST /tienda/canjear (TiendaController).
 *
 * @param {number} dinoId - ID del dinosaurio a canjear.
 * @returns {Promise<any>} Datos de respuesta del servidor.
 */
export const canjearColeccionable = async (dinoId) => {
    try {
        // Llama a la nueva ruta del TiendaModule
        const response = await api.post('/tienda/canjear', { dinoId });
        return response.data;
    } catch (error) {
        console.error('Error al procesar canje:', error.response?.data?.message || error.message);
        throw error;
    }
};
