/**
 * @fileoverview Configuración de Axios para las peticiones HTTP a la API del backend.
 * Este archivo crea una instancia preconfigurada de Axios para comunicarse con el servidor.
 *
 * @module services/api
 */

import axios from 'axios';
/**agregue esto */

import { useUserStore } from '@/stores/userStore';

/**
 * Instancia de Axios configurada para interactuar con el backend.
 * Utiliza la URL base `http://localhost:4000` y establece el tipo de contenido como JSON.
 *
 * @type {Object}
 */
const api = axios.create({
  baseURL: 'http://localhost:4000', // Puerto donde esta corriendo el backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Implementación del Interceptor AGREGE ESTO 12/10/2025
api.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.token;

    // Solo añade el token si el usuario está logueado
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
