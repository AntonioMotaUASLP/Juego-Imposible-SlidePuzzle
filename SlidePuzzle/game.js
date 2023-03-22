var tablero = [];
var nombreJugador;
var movimientos = 0;
var segundos = 0;
var tiempo;

// Inicializar el juego cuando se muestre la pantalla 
function iniciarJuego() {
    nombreJugador = prompt("Ingresa tu nombre:");
    document.getElementById("nombreJugador").innerText = nombreJugador;
    shuffletablero();
    mostrarTablero();
    iniciarTemporizador();
}   
window.onload = iniciarJuego;

function shuffletablero() { /* Mezcla el tablero */ 
    tablero = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, null]
    ];
    for (let i = tablero.length - 1; i > 0; i--) {
        for (let j = tablero[i].length - 1; j > 0; j--) {
            let k = Math.floor(Math.random() * (i + 1));
            let l = Math.floor(Math.random() * (j + 1));
            [tablero[i][j], tablero[k][l]] = [tablero[k][l], tablero[i][j]];
        }
    }
}

function mostrarTablero() {
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[i].length; j++) {
            let casilla = document.getElementById("casilla" + (i * 4 + j + 1));
            if (tablero[i][j] === null) {
                casilla.className = "vacia";
                casilla.innerText = "";
            } else {
                casilla.className = "";
                casilla.innerText = tablero[i][j];
            }
        }
    }
}

function puedeMoverse(clickedIndex, indexVacio) {
    let filaClicked = Math.floor(clickedIndex / 4);
    let columnaClicked = clickedIndex % 4;
    let filaVacio = Math.floor(indexVacio / 4);
    let columnaVacio = indexVacio % 4;
    return (
        (filaClicked === filaVacio && Math.abs(columnaClicked - columnaVacio) === 1) || // Izquierda o derecha
        (columnaClicked === columnaVacio && Math.abs(filaClicked - filaVacio) === 1) // Arriba o abajo
    );
}

function moverFicha(clickedIndex, indexVacio) {
    let filaClicked = Math.floor(clickedIndex / 4);
    let columnaClicked = clickedIndex % 4;
    let filaVacio = Math.floor(indexVacio / 4);
    let columnaVacio = indexVacio % 4;
    [tablero[filaClicked][columnaClicked], tablero[filaVacio][columnaVacio]] = [tablero[filaVacio][columnaVacio], tablero[filaClicked][columnaClicked]];
    movimientos++;
    document.getElementById("movimientos").innerText = movimientos;
}

function seHaGanado() {
    let contador = 1;
    for (let fila = 0; fila < 4; fila++) {
        for (let columna = 0; columna < 4; columna++) {
            if (tablero[fila][columna] !== contador) {
                return false;
            }
            contador++;
        }
    }
    // Verificar que la casilla vacía esté en la última posición
    if (tablero[3][3] !== null) {
        return false;
    }
    return true;
}

function mostrarVictoria() {
    clearInterval(tiempo);
    alert("¡Ganaste en " + segundos + " segundos con " + movimientos + " movimientos!");
}

function iniciarTemporizador() {
    tiempo = setInterval(() => {
        segundos++;
        document.getElementById("temporizador").innerText = segundos;
    }, 1000);
}

// Manejar el clic en una ficha
function clickEnFicha(fila, columna) {
    let clickedIndex = fila * 4 + columna;
    let indexVacio;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (tablero[i][j] === null) {
                indexVacio = i * 4 + j;
                break;
            }
        }
    }
    if (puedeMoverse(clickedIndex, indexVacio)) {
        moverFicha(clickedIndex, indexVacio);
        mostrarTablero();
        if (seHaGanado()) {
            mostrarVictoria();
        }
    }
}

// Asignar el evento click a cada celda del tablero
let casillas = document.getElementsByTagName("td");
for (let i = 0; i < 16; i++) {
    let x = Math.floor(i / 4);
    let y = i % 4;
    casillas[i].addEventListener("click", () => {
        clickEnFicha(x, y);
    });
}
