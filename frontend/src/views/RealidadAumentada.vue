<template>
  <div class="ra-ninos">
    <h2 class="ra-titulo">🦕 ¡DINOSAURIOS EN 3D! 🦖</h2>
    <p class="ra-subtitulo">
      ¡Mira a los dinosaurios como si estuvieran ¡Acá mismo! Solo necesitas un celular o tus lentes de realidad aumentada.
    </p>
    <p class="ra-ayuda">
      <img src="@/assets/DatoCurioso.png" alt="Dinosaurio curioso" class="ra-curioso" />
      💡 <strong>¿Cómo usarlo?</strong> Abre la cámara de tu celular, apunta al código QR y toca el enlace que aparezca.
    </p>
  </div>
    <!-- Experiencia WebAR -->
    <div class="ra-card">
      <h3>📱 ¡Activa un T-Rex en tu casa!</h3>
      <p>Escanea este código o toca el botón para ver un ¡T-Rex gigante en tu habitación!</p>
      <img src="@/assets/ar-code-trex.PNG" alt="Código AR para T-Rex" class="ra-qr" />
      <a
        href="https://ar-code.com/NgU6gFv8p?view=webar"
        target="_blank"
        rel="noopener noreferrer"
        class="ra-btn"
      >
        Ver T-Rex en Realidad Aumentada
      </a>
    </div>

    <!-- Museo en RA -->
    <div class="ra-card">
      <h3>🏛️ ¡Explora un Museo de Dinosaurios en RA!</h3>
      <p>¿Tienes lentes de realidad aumentada? ¡Escanea este código y recorre un museo lleno de fósiles y sonidos prehistóricos!</p>
      <img src="@/assets/Museo RA.png" alt="Código QR para Museo en RA" class="ra-qr" />
    </div>

    <!-- Experiencia local (Chocon) -->
    <div class="ra-card">
      <h3>🔍 ¡Aventura en el Museo Ernesto Bachmann!</h3>
      <p>¿Estás en Neuquén? ¡Visita el museo y escanea este código para ver dinosaurios reales cobrar vida!</p>
      <img src="@/assets/qr chocon.JPG" alt="Código QR para experiencia en Chocón" class="ra-qr" />
    </div>


</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@600;700&family=Fredoka:wght@500;600&display=swap');

.ra-ninos {
  background: linear-gradient(135deg, #f0ead2 0%, #d8c3a5 100%);
  padding: 30px 20px;
  border-radius: 20px;
  margin: 40px auto;
  max-width: 900px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.ra-titulo {
  font-family: 'Fredoka', sans-serif;
  font-size: 2.2rem;
  color: #2e4d3d;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
}

.ra-subtitulo {
  font-family: 'Raleway', sans-serif;
  font-size: 1.2rem;
  color: #3b250c;
  max-width: 700px;
  margin: 0 auto 25px;
  line-height: 1.5;
  font-weight: bold;
}

/* Tarjetas de experiencias RA */
.ra-card {
 background: linear-gradient(135deg, #f0ead2 0%, #ecdec8 100%);
   border: 4px dashed #352c07;
  border-radius: 16px;
  padding: 20px;
  margin: 25px auto;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  text-align: center;
}

.ra-card:hover {
  transform: scale(1.02);
}

.ra-card h3 {
  font-family: 'Fredoka', sans-serif;
  color: #2e4d3d;
  font-size: 1.4rem;
  margin-bottom: 12px;
}

.ra-card p {
  font-family: 'Raleway', sans-serif;
  color: #3b250c;
  font-size: 1rem;
  margin-bottom: 15px;
  line-height: 1.5;
  font-weight: bold;
}

.ra-qr {
  width: 180px;
  height: auto;
  border: 3px solid #2e4d3d;
  border-radius: 12px;
  margin: 10px auto;
  display: block;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.ra-btn {
  display: inline-block;
  background-color: #f9d342;
  color: #2e4d3d;
  font-family: 'Fredoka', sans-serif;
  font-weight: 600;
  padding: 10px 24px;
  border-radius: 30px;
  text-decoration: none;
  font-size: 1.1rem;
  margin-top: 10px;
  transition: background-color 0.3s, transform 0.2s;


}

.ra-btn:hover {
  background-color: #e6b800;
  transform: scale(1.05);
}

.ra-ayuda {
  font-family: 'Raleway', sans-serif;
  color: #ffe46e;
  font-size: 1rem;
  margin-top: 30px;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.596);
  border-radius: 12px;
  max-width: 600px;
  margin: 30px auto 0;
  position: relative;
}

.ra-curioso {
  width: 90px;
  height: auto;
  display: block;
  margin: 0 auto 10px;
}

@media (max-width: 480px) {
  .ra-curioso {
    width: 70px;
  }
}
</style>
