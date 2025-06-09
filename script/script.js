const OPCIONES = ['piedra', 'papel', 'tijera'];

const BOTONES = document.querySelectorAll('.opcion');
const IMAGEN_JUGADOR = document.getElementById("imagenEleccionJugador");
const IMAGEN_COMPUTADORA = document.getElementById("imagenEleccionCompu");
const VS = document.getElementById("vs");
const RESULTADO = document.getElementById("mensajeResultado");
const ENUNCIADO = document.getElementById("enunciado");
const CONTADOR = document.getElementById("contador");

const clickSound = new Audio('assets/sounds/click.mp3');
const winSound = new Audio('assets/sounds/win.mp3');
const loseSound = new Audio('assets/sounds/lose.mp3');
const drawSound = new Audio('assets/sounds/draw.mp3');

const BOTON_REINICIAR = document.getElementById('.botonReiniciar');

function setBotonesDeshabilitados(boolean) {
    BOTONES.forEach(b => {
        b.disabled = boolean;
        b.classList.toggle("desactivado", boolean);
    });
}

setBotonesDeshabilitados(false);

function opcionComputadora() {
    const randomIndex = Math.floor(Math.random() * OPCIONES.length);
    return OPCIONES[randomIndex];
}

function decidirGanador(jugador, computadora) {
    if (jugador === computadora) {
        return "EMPATE";
    } else if (
        (jugador === 'piedra' && computadora === 'tijera') ||
        (jugador === 'papel' && computadora === 'piedra') ||
        (jugador === 'tijera' && computadora === 'papel')
    ) {
        return "GANASTE";
    } else {
        return "PERDISTE";
    }
}

function mostrarResultado(resultadoTexto) {
    RESULTADO.classList.remove("resultado--empate", "resultado--ganaste", "resultado--perdiste", "agrandar");
    void RESULTADO.offsetWidth;

    if (resultadoTexto === "EMPATE") {
        RESULTADO.classList.add("resultado--empate", "agrandar");
        drawSound.play();
    } else if (resultadoTexto === "GANASTE") {
        RESULTADO.classList.add("resultado--ganaste", "agrandar");
        winSound.play();
    } else if (resultadoTexto === "PERDISTE") {
        RESULTADO.classList.add("resultado--perdiste", "agrandar");
        loseSound.play();
    }

    RESULTADO.textContent = resultadoTexto;

    setTimeout(() => {
        BOTON_REINICIAR.forEach(boton => {
            boton.style.display = "visible";
        });
    }, 1000);
}

function animarElemento(elemento) {
    elemento.classList.add('agrandar');
    setTimeout(() => {
        elemento.classList.remove('agrandar');
    }, 600);
}

BOTONES.forEach(boton => {
    boton.addEventListener('click', () => {
        clickSound.play();

        setTimeout(() => {
            setBotonesDeshabilitados(true);
        }, 300);

        const eleccionJugador = boton.id;
        jugarRonda(eleccionJugador);
    });
});

BOTON_REINICIAR.forEach(boton => {
    boton.addEventListener('click', () => {
        // Resetear estado del juego
        IMAGEN_JUGADOR.style.visibility = "hidden";
        IMAGEN_COMPUTADORA.style.visibility = "hidden";
        VS.style.visibility = "hidden";
        RESULTADO.textContent = "";
        ENUNCIADO.style.visibility = "visible";
        CONTADOR.textContent = "";

        // Ocultar botón "Volver a jugar"
        BOTON_REINICIAR.forEach(b => b.style.visibility = "hidden");

        // Habilitar botones de juego
        setBotonesDeshabilitados(false);
    });
});

function jugarRonda(eleccionJugador) {
    const eleccionCompu = opcionComputadora();
    ENUNCIADO.style.visibility = "hidden";

    IMAGEN_JUGADOR.src = `img/${eleccionJugador}.png`;
    IMAGEN_JUGADOR.style.visibility = "visible";
    VS.style.visibility = "visible";

    animarElemento(IMAGEN_JUGADOR);
    animarElemento(VS);

    RESULTADO.textContent = "";
    IMAGEN_COMPUTADORA.style.visibility = "hidden";

    setTimeout(() => {
        mostrarContador(() => {
            IMAGEN_COMPUTADORA.src = `img/${eleccionCompu}.png`;
            IMAGEN_COMPUTADORA.style.visibility = "visible";
            animarElemento(IMAGEN_COMPUTADORA);

            setTimeout(() => {
                const mensaje = decidirGanador(eleccionJugador, eleccionCompu);
                mostrarResultado(mensaje);

                setBotonesDeshabilitados(false);
            }, 1000);
        });
    }, 1000);
} // 👈 CORREGIDO: antes cerraba mal la función con punto y coma ";"

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
