<template>
  <div class="dino-info">

  <!-- Navegación interna -->
    <nav class="dino-nav">
      <a href="#intro" @click.prevent="scrollToSection('intro')">Introducción</a>
      <a href="#linea-tiempo" @click.prevent="scrollToSection('linea-tiempo')">Línea del Tiempo</a>
      <a href="#gigantes-pasado" @click.prevent="scrollToSection('gigantes-pasado')">Gigantes</a>
      <a href="#lugares" @click.prevent="scrollToSection('lugares')">Lugares</a>
      <a href="#multimedia" @click.prevent="scrollToSection('multimedia')">Multimedia</a>
      <a href="#tienda" @click.prevent="scrollToSection('tienda')">Tienda</a>
    </nav>

    <!-- Introducción -->
    <div class="bienvenida" id="intro">
      <img src="@/assets/dinoinfo.jpg" alt="Dinosaurio" class="foto-intro">
      <section class="intro">
        <h1>Bienvenidos al Mundo de los Dinosaurios</h1>
        <p>
          Descubre la asombrosa historia de estas criaturas prehistóricas. Aquí encontrarás
          datos curiosos, descubrimientos recientes y lugares increíbles para aprender y
          explorar más sobre los dinosaurios. ¡Embárcate en este viaje a través del tiempo y
          déjate sorprender por el pasado!
        </p>
      </section>
    </div>

    <!-- Línea del tiempo -->
    <h2 class="linea-titulo">LÍNEA DEL TIEMPO</h2>
    <div class="timeline">
      <div class="timeline-item" v-for="(periodo, index) in timelineData" :key="index">
        <div class="timeline-dot">
          <i class="fa-solid fa-paw timeline-icon"></i>
        </div>
        <h3>{{ periodo.nombre }}</h3>
        <h4>{{ periodo.duracion }}</h4>
        <p>{{ periodo.descripcion }}</p>
      </div>
    </div>
    <!-- componente de Información aleatoria de dinosaurios -->
    <RandomDinoInfo />

    <!-- Carrusel de dinosaurios -->

    <div id="gigantes-pasado"> <!-- Ancla para navegación interna -->
    <h1 class="card-titulo">CONOCE A LOS GIGANTES DEL PASADO</h1>
    <div class="carousel">
      <button class="carousel-button prev" @click="prevSlide">❮</button>
      <div class="carousel-track-container">
        <div class="carousel-track" :style="{ transform: `translateX(calc(-${currentIndex} * 100%))` }">
          <div
            class="carousel-slide"
            v-for="(dino, index) in dinosaurios"
            :key="dino.nombreCientifico"
            :class="{ 'is-center': index === currentIndex, 'is-blurred': index !== currentIndex }"
          >
            <DinoCard :dino="dino" />
          </div>
        </div>
      </div>
      <button class="carousel-button next" @click="nextSlide">❯</button>
    </div>
  </div>


  <div class="section-container" id="lugares">
      <h2 class="section-titulo">🌎 LUGARES PARA VISITAR EN LA ZONA</h2>
      <div class="lugares-grid">
        <div class="lugar-card" v-for="(lugar, index) in lugaresVisita" :key="index">
          <i :class="['fa-solid', lugar.icon, 'lugar-icon']"></i>
          <h3>{{ lugar.nombre }}</h3>
          <h4>{{ lugar.ubicacion }}</h4>
          <p>{{ lugar.descripcion }}</p>
          <a :href="lugar.link" target="_blank" class="lugar-link">Ver más</a>
        </div>
      </div>
    </div>

    <div class="section-container" id="multimedia">
      <h2 class="section-titulo">🎬 PELÍCULAS IMPERDIBLES</h2>
      <div class="peliculas-grid">
        <div class="pelicula-card" v-for="(pelicula, index) in peliculasRecomendadas" :key="index">
          <i class="fa-solid fa-film pelicula-icon"></i>
          <h3>{{ pelicula.titulo }}</h3>
          <p>{{ pelicula.descripcion }}</p>
        </div>
      </div>
    </div>

    <div class="section-container" id="tienda">
      <h2 class="section-titulo">🎁 TIENDA Y RECURSOS DE DINOSAURIOS</h2>
      <div class="tienda-grid">
        <div class="tienda-item">
          <i class="fa-solid fa-cube tienda-icon"></i>
          <h3>Figuras 3D (¡Apoya a un amigo!)</h3>
          <p>Increíbles réplicas de tus dinosaurios favoritos en impresión 3D. ¡El regalo perfecto para coleccionistas!</p>
          <a href="#" class="tienda-link">¡Contáctanos!</a>
        </div>
        <div class="tienda-item">
          <i class="fa-solid fa-book-open tienda-icon"></i>
          <h3>Libros y Documentales</h3>
          <p>Una selección de los mejores libros y documentales para profundizar tus conocimientos paleontológicos.</p>
          <a href="#" class="tienda-link">Ver Colección</a>
        </div>
        <div class="tienda-item">
          <i class="fa-solid fa-shirt tienda-icon"></i>
          <h3>Indumentaria y Accesorios</h3>
          <p>Camisetas, gorras y más con diseños prehistóricos. Muestra tu pasión por los dinosaurios.</p>
          <a href="#" class="tienda-link">Explorar</a>
        </div>
      </div>
    </div>


  </div>



</template>

<script>
/**
 * @fileoverview Vista que muestra información general sobre los dinosaurios,
 * incluyendo una línea de tiempo y un carrusel interactivo de especies.
 *
 * @module views/DinoInformacion
 */

import DinoCard from "@/components/DinoCard.vue";
import RandomDinoInfo from "@/components/RandomDinoInfo.vue";
import dinosaurios from "@/data/dinosaurios.json";

export default {
  /**
   * Nombre del componente
   * @type {string}
   */
  name: "DinoInformacion",

  /**
   * Componentes hijos utilizados en esta vista
   * @type {Object}
   */
  components: { DinoCard, RandomDinoInfo },

  data() {
    return {
      /**
       * Lista de dinosaurios obtenida desde un archivo JSON
       * @type {Array<{nombreCientifico: string, nombreComun: string, tipoAlimentacion: string, periodo: string, tamano: string, peso: string, ubicacionGeografica: string, curiosidades: string, image: string}>}
       */
      dinosaurios,

      /**
       * Índice actual del carrusel para mostrar una especie a la vez
       * @type {number}
       */
      currentIndex: 0,

      /**
       * Datos para la línea del tiempo geológica de los dinosaurios
       * @type {Array<{nombre: string, duracion: string, descripcion: string}>}
       */
      timelineData: [
        {
          nombre: 'TRIÁSICO',
          duracion: '(hace 250-201 millones de años)',
          descripcion: 'Período inicial, donde surgieron los primeros dinosaurios. Los continentes estaban unidos en un supercontinente llamado Pangea.'
        },
        {
          nombre: 'JURÁSICO',
          duracion: '(hace 201-145 millones de años)',
          descripcion: 'Era de los dinosaurios gigantes como el Brachiosaurus y el Stegosaurus. Aparición de las primeras aves, como el Archaeopteryx.'
        },
        {
          nombre: 'CRETÁCICO',
          duracion: '(hace 145-66 millones de años)',
          descripcion: 'Dinosaurios famosos como el T-Rex dominaron. Las plantas con flores comenzaron a dominar los ecosistemas.'
        },
        {
          nombre: 'EXTINCIÓN',
          duracion: '(hace 66 millones de años)',
          descripcion: 'Fin de la era de los dinosaurios. Más del 75% de las especies desaparecieron, marcando el fin de la era de los dinosaurios.'
        }
      ],

         /**
       * Lugares recomendados para visitar relacionados con dinosaurios.
       */
      lugaresVisita: [
    {
      nombre: 'Parque Geopaleontológico Proyecto Dino',
      ubicacion: 'Los Barreales, Neuquén',
      descripcion: 'Museo de sitio a cielo abierto. Ofrece la oportunidad de conocer el trabajo de campo de paleontólogos en el lugar de las excavaciones de fósiles. Es una iniciativa de la Universidad Nacional del Comahue.',
      icon: 'fa-mound', // Montículo de excavación
      link: 'https://www.proyectodinosaurlosbarreales.com.ar/'
    },
    {
      nombre: 'Museo "Ernesto Bachmann"',
      ubicacion: 'Villa El Chocón, Neuquén',
      descripcion: 'Exhibe restos originales y réplicas. Es famoso por albergar el original del **Giganotosaurus carolinii**, uno de los carnívoros más grandes del mundo, superando al T-Rex.',
      icon: 'fa-landmark',
      // Enlace corregido para que apunte al museo de El Chocón
      link: 'https://www.villaelchocon.gob.ar/turismo/museo-ernesto-bachmann/'
    },
    {
      nombre: 'Museo Municipal "Carmen Funes"',
      ubicacion: 'Plaza Huincul, Neuquén',
      descripcion: 'Hogar del **Argentinosaurus huinculensis**, uno de los dinosaurios más grandes del mundo. Un imperdible en la región.',
      icon: 'fa-landmark', // Edificio/Monumento
      link: 'https://museohuincull.gob.ar/'
    },
    {
      nombre: 'Museo Provincial "Carlos Ameghino"',
      ubicacion: 'Cipolletti, Río Negro',
      descripcion: 'Aunque más general, alberga colecciones de paleontología y arqueología local, reflejando el pasado de la provincia.',
      icon: 'fa-mountain-city', // Enfoque geográfico/provincial
      link: 'https://www.cultura.rionegro.gov.ar/desarrollo_nota.php?id=8086'
    },
    {
      nombre: 'Sitio Paleontológico Auca Mahuida',
      ubicacion: 'Neuquén',
      descripcion: 'Importante área de protección donde se realizan excavaciones. Famosa por los hallazgos de **nidos y huevos de dinosaurio**.',
      icon: 'fa-egg', // Ícono de huevo
      link: 'https://www.neuquentur.gob.ar/es/areas-naturales/auca-mahuida/'
    }
],

peliculasRecomendadas: [
    {
      titulo: 'Parque Jurásico (1993)',
      descripcion: 'El clásico atemporal de Steven Spielberg. Ciencia, suspenso y la magia de ver dinosaurios en la pantalla grande.'
    },
    {
      titulo: 'Jurassic World (2015)',
      descripcion: 'La nueva era de la saga, con un parque funcionando y nuevas y temibles especies genéticamente modificadas.'
    },
    {
      titulo: 'Jurassic World: Reino Caído (2018)',
      descripcion: 'Una misión para salvar a los dinosaurios de la Isla Nublar antes de una erupción volcánica. Mucha acción y suspenso.'
    },
    {
      titulo: 'Jurassic World: Dominio (2022)',
      descripcion: 'Los dinosaurios viven entre los humanos en todo el mundo. El épico final de la saga Jurassic World.'
    },
    {
      titulo: 'Un Gran Dinosaurio (The Good Dinosaur - 2015)',
      descripcion: 'Una emotiva película animada de Pixar que imagina un mundo donde los dinosaurios y los humanos coexisten.'
    },
    {
      titulo: 'La Era de Hielo 3: El Despertar de los Dinosaurios (2009)',
      descripcion: 'La manada de mamíferos prehistóricos descubre un mundo subterráneo perdido y lleno de dinosaurios.'
    },
    {
      titulo: 'Caminando con Dinosaurios (Serie BBC)',
      descripcion: 'Impresionante serie documental que recrea de forma vívida la vida de los dinosaurios con efectos visuales de punta.'
    },
    {
      titulo: 'Tierra de Nadie (Valle Encantado - 1988)',
      descripcion: 'Perfecta para los más pequeños. Sigue a "Piecito" y sus amigos en su viaje para encontrar el Gran Valle.'
    }
],


    };
  },

  methods: {
    /**
     * Mueve el carrusel al siguiente dinosaurio
     */
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.dinosaurios.length;
    },

    /**
     * Mueve el carrusel al dinosaurio anterior
     */
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.dinosaurios.length) % this.dinosaurios.length;
    },
        /**
     * Realiza un scroll suave a la sección especificada por su ID.
     * @param {string} id - El ID del elemento al que se desea hacer scroll.
     */
    scrollToSection(id) {
      const element = document.getElementById(id);
      if (element) {
        // Obtenemos la posición de la sección, ajustando para el menú si es necesario
        const offset = element.offsetTop;
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
      }
    }
  }
};
</script>

<style scoped>
/* Estilo principal */
@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');


/* --- ESTILOS DEL MENÚ DE NAVEGACIÓN --- */
.dino-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #3b250c; /* Color oscuro para contrastar con el fondo */
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  flex-wrap: wrap;
}

.dino-nav a {
  color: #f0ead2;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.9rem;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.dino-nav a:hover {
  background-color: #2e4d3d;
  color: #f9d342;
}
/*º--- FIN ESTILOS DEL MENÚ DE NAVEGACIÓN --- */

/* Sección de Introducción */
.bienvenida {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  background-color: rgba(224, 221, 192, 0.9);
  flex-wrap: wrap;
}

.foto-intro {
  width: 250px;
  height: 250px;
  object-fit: cover;
  clip-path: polygon(10% 0%, 90% 0%, 100% 80%, 50% 100%, 0% 80%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding-right: 5%;
  margin-bottom: 15px;
}

.intro {
  padding: 20px;
  text-align: center;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  flex: 1;
}

.intro h1 {
  color: #2e4d3d;
  font-size: 2rem;
  margin-bottom: 10px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}

.intro p {
  font-size: 16px;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  color: rgb(0, 0, 0);
}

/* Sección principal */
.dino-info {
  background-color: #2e4d3d;
  color: #f0ead2;
  padding: 20px;
  font-family: "Raleway", sans-serif;
  text-align: center;
  animation: fadeIn 1s ease-in;
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

/* Línea del tiempo */
.linea-titulo {
  padding-top: 15px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  color: #f0ead2;
  text-shadow: rgb(0, 2, 1) 5px 5px 6px;
}

.timeline {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 50px 50px;
  padding: 20px 0;
  position: relative;
  border-top: 2px solid #ccc;
  flex-wrap: wrap;
}

.timeline-item {
  text-align: center;
  flex: 1;
  margin-bottom: 30px;
  position: relative;
  max-width: 250px;
}

.timeline-dot {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3b250c;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.932);
  margin: 0 auto;
  top: -10px;
}

.timeline-icon {
  color: #f9d342;
  font-size: 24px;
}

h3 {
  text-shadow: rgb(0, 2, 1) 5px 5px 6px;
  margin-top: 20px;
  font-size: 1rem;
  color: #eefff1;
}

h4 {
  color: rgba(243, 201, 86, 0.89);
}

p {
  font-size: 16px;
  color: #ffffff;
  margin-top: 5px;
}

.card-titulo {
  padding-top: 15px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  color: #f0ead2;
  text-shadow: rgb(0, 2, 1) 5px 5px 6px;
}

/* Carrusel */
.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 80%;
  max-width: 900px;
  margin: 0 auto;
  overflow: hidden;
}

.carousel-track-container {
  width: 100%;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  min-width: 100%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, opacity 0.3s ease, filter 0.3s ease;
}

.carousel-slide.is-center {
  transform: scale(1.1);
  opacity: 1;
  filter: blur(0);
}

.carousel-slide.is-blurred {
  transform: scale(0.8);
  opacity: 0.5;
  filter: blur(5px);
}

/* Flechas */
.carousel-button {
  background-color: rgb(71, 53, 41);
  color: white;
  border-radius: 20px;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  z-index: 10;
  transform: translateY(-50%);
}

.carousel-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}




/* --- ESTILOS DE NUEVAS SECCIONES --- */

.section-container {
  padding: 40px 20px;
  margin-top: 20px;
  background-color: #3b250c; /* Un color secundario para destacar */
}

/* Estilos de Lugares */
.lugares-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 30px auto;
}

.lugar-card {
  background-color: #4b341f;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  text-align: center;
  transition: transform 0.3s;
}

.lugar-card:hover {
  transform: translateY(-5px);
}

.lugar-icon {
  font-size: 3rem;
  color: #f9d342;
  margin-bottom: 10px;
}

.lugar-card h3 {
  color: #f0ead2;
  margin: 10px 0;
}

.lugar-card h4 {
  color: #ccc;
  font-size: 0.9rem;
}

.lugar-link {
  display: inline-block;
  margin-top: 15px;
  padding: 8px 15px;
  background-color: #2e4d3d;
  color: #f0ead2;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
}

/* Estilos de Películas */
.peliculas-grid {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 30px auto;
}

.pelicula-card {
  background-color: #2e4d3d;
  padding: 20px;
  border-radius: 8px;
  max-width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
}

.pelicula-icon {
  font-size: 2rem;
  color: #eefff1;
  margin-bottom: 10px;
}

.pelicula-card h3 {
  color: #f9d342;
  margin-top: 0;
}

/* Estilos de Tienda */
.tienda-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1000px;
  margin: 30px auto;
}

.tienda-item {
  background-color: #4b341f;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.tienda-icon {
  font-size: 2.5rem;
  color: #f0ead2;
  margin-bottom: 10px;
}

.tienda-item h3 {
  color: #eefff1;
  margin-top: 0;
}

.tienda-link {
  display: inline-block;
  margin-top: 10px;
  padding: 5px 12px;
  background-color: #f9d342;
  color: #2e4d3d;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
}




/* Animación */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsivo */
@media (max-width: 768px) {
  .intro h1 {
    font-size: 1.8rem;
  }

  .intro p {
    font-size: 1rem;
  }

  .timeline {
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
  }

  .timeline-item {
    margin-bottom: 30px;
    text-align: center;
    max-width: 300px;
  }

  .carousel {
    width: 100%;
  }

  .carousel-slide.is-center {
    transform: scale(1);
  }
}

@media (max-width: 480px) {
  .dino-info {
    padding: 10px;
  }

  .intro h1 {
    font-size: 1.5rem;
  }

  .intro p {
    font-size: 0.9rem;
  }

  .foto-intro {
    width: 200px;
    height: 200px;
  }

  .timeline {
    flex-direction: column;
    align-items: center;
  }

  .timeline-item {
    margin-bottom: 15px;
  }

  .carousel {
    width: 100%;
  }

  .carousel-slide.is-center {
    transform: scale(1);
  }
}
</style>
