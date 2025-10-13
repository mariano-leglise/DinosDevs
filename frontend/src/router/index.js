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
import RankingGlobal from '@/views/RankingGlobal.vue'; // 💡 IMPORTAR EL NUEVO COMPONENTE


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
    /**
     * Hook beforeEnter que verifica si el usuario está autenticado antes de acceder a la ruta.
     * Utiliza una cookie llamada 'token' para la validación.
     *
     * @param {Route} to - Ruta destino
     * @param {Route} from - Ruta origen
     * @param {Function} next - Callback para continuar con la navegación
     */
    // La protección se aplica a /juegos y todas las rutas que dependen de ella

    beforeEnter: (to, from, next) => {
      const token = Cookie.get('token'); // Verificamos si el token está en las cookies
      if (!token) {
        next('/register-prompt'); // Redirigimos si no hay token
      } else {
        next(); // Si el token existe, seguimos con la ruta
      }
    }
  },


 // 💡 NUEVA RUTA DE RANKING PROTEGIDA (Se beneficia del mismo beforeEnter)
  {
      path: '/ranking',
      component: RankingGlobal, // Componente creado en el paso anterior
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
]

/**
 * Instancia del router de la aplicación.
 * Usa el modo history de HTML5 para URLs limpias.
 *
 * @type {VueRouter}
 */
export default createRouter({
  history: createWebHistory(),
  routes,
})
