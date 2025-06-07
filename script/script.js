const OPCIONES = ['piedra', 'papel', 'tijera'];

const BOTONES = document.querySelectorAll('.opcion');
const IMAGEN_JUGADOR = document.getElementById("imagenEleccionJugador");
const IMAGEN_COMPUTADORA = document.getElementById("imagenEleccionCompu");
const VS = document.getElementById("vs");
const RESULTADO = document.getElementById("mensajeResultado");
const ENUNCIADO = document.getElementById("enunciado");
const CONTADOR = document.getElementById("contador");
let boolean;

function setBotonesDeshabilitados(boolean) {
    BOTONES.forEach(b => b.disabled = boolean);
}
setBotonesDeshabilitados(false);

function opcionComputadora() {
    const randomIndex = Math.floor(Math.random() * OPCIONES.length);
    return OPCIONES[randomIndex];
}



function decidirGanador(jugador, computadora) {
    var mensaje = "";
    if (jugador === computadora) {
        mensaje = "EMPATE";
    } else if (
        (jugador === OPCIONES[0] && computadora === OPCIONES[2]) ||
        (jugador === OPCIONES[1] && computadora === OPCIONES[0]) ||
        (jugador === OPCIONES[2] && computadora === OPCIONES[1])
    ) {
        mensaje = "GANASTE";
    } else {
        mensaje = "PERDISTE";
    }
    return mensaje;
}

function mostrarResultado(resultadoTexto) {
    RESULTADO.classList.remove("resultado--empate", "resultado--ganaste", "resultado--perdiste", "agrandar");

    void RESULTADO.offsetWidth;

    if (resultadoTexto === "EMPATE") {
        RESULTADO.classList.add("resultado--empate", "agrandar");
    } else if (resultadoTexto === "GANASTE") {
        RESULTADO.classList.add("resultado--ganaste", "agrandar");
    } else if (resultadoTexto === "PERDISTE") {
        RESULTADO.classList.add("resultado--perdiste", "agrandar");
    }

    RESULTADO.textContent = resultadoTexto;
}


function animarElemento(elemento) {
    elemento.classList.add('agrandar');
    setTimeout(() => {
        elemento.classList.remove('agrandar');
    }, 600);
}

BOTONES.forEach(boton => {

    boton.addEventListener('click', () => {

        setBotonesDeshabilitados(true);
        const eleccionJugador = boton.id;
        jugarRonda(eleccionJugador);


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
    IMAGEN_COMPUTADORA.style.visibility = "hidden"


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
}


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
