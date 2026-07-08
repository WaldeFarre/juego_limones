let canvas=document.getElementById('areaJuego');
let ctx=canvas.getContext('2d');
let intervalo;

const ALTURA_SUELO=20;
let ALTURA_PERSONAJE=160;
let ANCHO_PERSONAJE=80;
const ANCHO_LIMON=20;
const ALTURA_LIMON=20;
let personajeX= canvas.width/2;
let personajeY=canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);
let limonX=canvas.width/2;
let limonY=5;
let puntaje=0;
let vidas=3
let velocidadCaida=200;

function iniciar(){
    clearInterval(intervalo); //alt facil
    intervalo=setInterval(bajarLimon,velocidadCaida);
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
    aparecerLimon();
}
function dibujarSuelo(){
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);
}

function dibujarPersonaje(){
    ctx.fillStyle='blue';
    ctx.fillRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}

function moverIzquierda(){
    personajeX=personajeX-10;
    actualizarPantalla();
    detectarAtrapado();
}

function moverDerecha(){
    personajeX=personajeX+10;
    actualizarPantalla();
    detectarAtrapado();
}

function actualizarPantalla(){
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}

function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function dibujarLimon(){
    ctx.fillStyle='green';
    ctx.fillRect(limonX,limonY,ANCHO_LIMON,ALTURA_LIMON);
}

function bajarLimon(){
    limonY = limonY + 10;
    actualizarPantalla();
    detectarAtrapado();
    detectarPiso();
}

function detectarAtrapado(){
    if(limonX+ANCHO_LIMON>personajeX && 
        limonX < personajeX+ANCHO_PERSONAJE &&
        limonY+ALTURA_LIMON>personajeY &&
        limonY < personajeY+ALTURA_PERSONAJE)
    {
        aparecerLimon();
        puntaje=puntaje+1;
        mostrarEnSpan("txtPuntaje",puntaje);

        if(puntaje==3){
            velocidadCaida=150;
        }
        if(puntaje==6){
            velocidadCaida=100;
        }
        if(puntaje==10){
            alert("TIENES LOS LIMONES, AHORA TE FALTA SAL Y TEQUILA");
            clearInterval(intervalo); //facilito no más
        }
    }
}


function detectarPiso(){
    if(limonY==canvas.height-ALTURA_SUELO){
        aparecerLimon();
        vidas=vidas-1;
        mostrarEnSpan("txtVidas",vidas);

        if(vidas==0){
            alert("Perdiste!");
            clearInterval(intervalo); //más fácil----
        }
    }
}

function probarAleatorio(){
    let aleatorio=generarAleatorio(10,80);
    console.log(aleatorio);
}

function aparecerLimon(){
    limonX=generarAleatorio(0,canvas.width-ANCHO_LIMON);
    limonY=0;
    actualizarPantalla();
}

function reiniciar(){
    vidas=3;
    puntaje=0;
    velocidadCaida=200;
    personajeX=canvas.width/2;
    mostrarEnSpan("txtVidas",vidas);
    mostrarEnSpan("txtPuntaje",puntaje);
    iniciar();
}

function desaparecerPersonajes(){
    ANCHO_PERSONAJE=0;
    ALTURA_PERSONAJE=0;
    ctx.clearRect(0,0,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}