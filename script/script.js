const OPCIONES = ['piedra', 'papel', 'tijera'];

    const BOTONES = document.querySelectorAll('.opcion');
    const IMG_JUG = document.getElementById("imagenEleccionJugador");
    const IMG_COMP = document.getElementById("imagenEleccionCompu");
    const VS = document.getElementById("vs");
    const RESULTADO = document.getElementById("mensajeResultado");
    const ENUNCIADO = document.getElementById("enunciado");
    const CONTADOR = document.getElementById("contador");

    function opcionComputadora() {
      const RANDOM_INDEX = Math.floor(Math.random() * OPCIONES.length);
      return OPCIONES[RANDOM_INDEX];
    }



    function decidirGanador(jugador, computadora) {
      var mensaje = "";
      if (jugador === computadora) {
        mensaje = "EMPATE";
      } else if (
        (jugador === 'piedra' && computadora === 'tijera') ||
        (jugador === 'papel' && computadora === 'piedra') ||
        (jugador === 'tijera' && computadora === 'papel')
      ) {
        mensaje = "GANASTE";
      } else {
        mensaje = "PERDISTE";
      }
      return mensaje;
    }

    function mostrarResultado(resultadoTexto) {

      RESULTADO.classList.remove("resultado-empate", "resultado-ganaste", "resultado-perdiste");

      if (resultadoTexto === "EMPATE") {
        RESULTADO.classList.add("resultado-empate");
      } else if (resultadoTexto === "GANASTE") {
        RESULTADO.classList.add("resultado-ganaste");
      } else if (resultadoTexto === "PERDISTE") {
        RESULTADO.classList.add("resultado-perdiste");
      }

      RESULTADO.textContent = resultadoTexto;
    }

    let juegoBloqueado = false;

    BOTONES.forEach(boton => {
      boton.addEventListener('click', () => {

        const eleccionJugador = boton.id;
        const eleccionCompu = opcionComputadora();
        ENUNCIADO.style.visibility = "hidden";



        IMG_JUG.src = `img/${eleccionJugador}.png`;
        IMG_JUG.style.visibility = "visible";
        VS.style.visibility = "visible";



        IMG_JUG.classList.add('agrandar');  
        setTimeout(() => {
          IMG_JUG.classList.remove('agrandar');  
        }, 600);


        RESULTADO.textContent = "";
        IMG_COMP.style.visibility = "hidden"


        setTimeout(() => {
          mostrarContador(() => {
          IMG_COMP.src = `img/${eleccionCompu}.png`;
          IMG_COMP.style.visibility = "visible";

          IMG_COMP.classList.add('agrandar');
          setTimeout(() => {
            IMG_COMP.classList.remove('agrandar');
          }, 600);

          setTimeout(() => {
            const mensaje = decidirGanador(eleccionJugador, eleccionCompu);
            mostrarResultado (mensaje);

          }, 1000);



          });
        }, 1000);


      });


    });

  
    function mostrarContador(next) {
      const ctr = document.getElementById('contador');

      function animarNumero(numero, callback) {
        ctr.classList.remove('mostrar-contador');
        void ctr.offsetWidth;
        ctr.textContent = numero;
        ctr.classList.add('mostrar-contador');
        setTimeout(callback, 1000);
      }

      animarNumero('3', () => {
        animarNumero('2', () => {
          animarNumero('1', () => {
            ctr.classList.remove('mostrar-contador');
            ctr.textContent = '';
            next();
          });
        });
      });
    }
