// Váriaveis globais
let cartas
const numerodecartas = document.querySelector(".cartas");
const lista = ["bobrossparrot", "explodyparrot","fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];
const grupo = [];
let click = null;
let certo = 0;
let contador = 0;
let cronometro = 0;
let interv;                                       

// definindo função pra verificar se o número é valido
function verificar() {
while (cartas < 4 || cartas>14 || cartas%2 != 0) {
    cartas = prompt("Com quantas cartas deseja jogar? Insira um número par de 4 a 14!");
} 

for (let i = 0; i < (cartas/2); i++) {
    const listadecartas = 
    `<div class= "carta" onclick= "virar(this)">
    <img class = "front-face" src="imgs/front.png">
    <img class= "back-face" src="imgs/${lista[i]}.gif">
    </div> `;
    grupo.push(listadecartas);
    grupo.push(listadecartas);
}
grupo.sort(random);
for(let i=0; i < cartas; i++) {
    numerodecartas.innerHTML += grupo[i];
}
}

// função pra aleatorizar 
function random() {
    return Math.random() -0.5;
}

// acionando funções
verificar()
timer()

//função pra virar carta
function virar(flip) {
    flip.classList.add("fliped");
    if(click === null) {
        click = flip;
        flip.setAttribute('onclick', " ")    
        click.setAttribute('onclick', " ");
    } else if(click.innerHTML === flip.innerHTML) {
        flip.setAttribute('onclick', " ");
        click.setAttribute('onclick', " ");
        click = null;
        certo++;
    } else {
        setTimeout( desvirar, 1000, click, flip)
        click = null;
    }
    contador++

    venceu();
}

// função pra desvirar carta
function desvirar(virarUm, virarDois) {
virarUm.classList.remove("fliped");
virarUm.setAttribute('onclick', "virar(this)");
virarDois.classList.remove("fliped");
virarDois.setAttribute('onclick', "virar(this)");
click = null;
}

// função pra confirmar se venceu 
function venceu() {
    if(certo === (cartas/2)) {
        setTimeout(mensagemvenceu, 300)
        setTimeout(restart, 300);
    }
}

// função pra dizer que venceu 
function mensagemvenceu(){
    alert(`Você ganhou em ${contador} jogadas!`)
}

// função pra dar restart
function restart() {
    const pergunta = prompt("Gostaria de jogar novamente?")
    if(pergunta.toLowerCase() === "sim") {
        location.reload()
    }
}

//função pra contar tempo de jogo
function timer() {
    interv = setInterval(actiontimer, 1000)
}

//função pra acionar e parar tempo de jogo
function actiontimer() {
cronometro++;
const timeel = document.querySelector("p span");
timeel.innerHTML = cronometro
}

if (certo === (cartas/2)){
    clearInterval(interv);
}
