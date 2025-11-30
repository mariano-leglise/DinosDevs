/**
 * @fileoverview Configuración del router de la aplicación Vue.
 * Define las rutas y protege ciertas vistas con verificación de autenticación usando cookies.
 *
 * @module router
 */

import { createRouter, createWebHistory } from 'vue-router'
import Cookie from 'js-cookie' // Importamos js-cookie
import DinoHome from '@/views/DinoHome.vue'
import DinoMenu from '@/views/DinoMenu.vue'
import DinoJuegos from '@/views/DinoJuegos.vue'
import DinoInformacion from '@/views/DinoInformacion.vue'
import RealidadAumentada from '@/views/RealidadAumentada.vue'
import MemoryGame from '@/components/MemoryGame.vue'
import SopaDeLetras from '@/components/SopaDeLetras.vue'
import RegisterPrompt from '@/views/RegisterPrompt.vue';
import RankingGlobal from '@/views/RankingGlobal.vue';

// ⬇️ NUEVA IMPORTACIÓN PARA EL MÓDULO DE LA TIENDA ⬇️
import DinoTienda from '@/views/DinoTienda.vue';


/**
 * Lista de rutas definidas para la aplicación.
 * @type {Array}
 */
const routes = [
  { path: '/', component: DinoHome },
  { path: '/menu', component: DinoMenu },
  {
    path: '/juegos',
    component: DinoJuegos,
    // Protección para /juegos
    beforeEnter: (to, from, next) => {
      const token = Cookie.get('token');
      if (!token) {
        next('/register-prompt');
      } else {
        next();
      }
    }
  },

  {
      path: '/ranking',
      component: RankingGlobal,
      // Protección para /ranking
      beforeEnter: (to, from, next) => {
          const token = Cookie.get('token');
          if (!token) {
            next('/register-prompt');
          } else {
            next();
          }
      }
  },

  // ⬇️ NUEVA RUTA PARA LA DINO TIENDA ⬇️
  {
      path: '/dinotienda', // La ruta que usaste en el botón
      component: DinoTienda, // El componente que creamos
      // Aplicamos la misma protección de autenticación
      beforeEnter: (to, from, next) => {
          const token = Cookie.get('token');
          if (!token) {
            next('/register-prompt');
          } else {
            next();
          }
      }
  },


  { path: '/informacion', component: DinoInformacion },
  { path: '/realidad-aumentada', component: RealidadAumentada },
  { path: '/memory-game', component: MemoryGame },
  { path: '/sopa-de-letras', component: SopaDeLetras },
  { path: '/register-prompt', component: RegisterPrompt }
];

/**
 * Instancia del router de la aplicación.
 * Usa el modo history de HTML5 para URLs limpias.
 *
 * @type {VueRouter}
 */
export default createRouter({
  history: createWebHistory(),
  routes,
});
