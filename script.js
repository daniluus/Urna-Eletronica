// Pegando o span dentro da div d-1-1
let seuVotoPara = document.querySelector('.d-1-1 span');

// Pegando o span para mudar o valor do cargo
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');

let aviso = document.querySelector('.d-2');

let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

// pega a primeira Etapa 'Vereador'
let etapaAtual = 0;
// Numero que vou estar digitando
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa(){
    let etapa = etapas[etapaAtual]

    // Mostrar quantidade de caixas de Vereador/Prefeito
    let numeroHtml = '';
    numero = ''
    votoBranco = false

    // Aqui corre mostrando as caixas
    for(let i= 0; i < etapa.numeros; i++){
        if(i === 0){
            numeroHtml += '<div class="numero pisca"></div>'
        } else {
            numeroHtml += '<div class="numero"></div>'
        }
        
        
    }
    
    // Limpar minha tela
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface(){
    let numeroHtml = '';
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero  === numero){
            return true;
        } else {
            return false;
        }
    });
    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.name}<br/>Partido: ${candidato.partido}`;
        aviso.style.display = 'block';

        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d-1-img small"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="d-1-img"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            }
            
        }
        lateral.innerHTML = fotosHtml;
        numeros.innerHTML = numeroHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande pisca"> VOTO NULO </div>';
    }
}

function clicou(n){
    let elNumero = document.querySelector('.numero.pisca')
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`

        elNumero.classList.remove('pisca')
        if(elNumero.nextElementSibling !== null)
        {
            elNumero.nextElementSibling.classList.add('pisca')
        } else {
            atualizaInterface();
        }
    }
}

function branco(){
    numero = '';
    votoBranco = true;

    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso-grande pisca"> VOTO EM BRANCO </div>';
    lateral.innerHTML = '';
}

function corrige(){
    comecarEtapa()
}

function confirma(){
    let etapa = etapas[etapaAtual]

    let votoConfirmado = false;

    if(votoBranco === true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
        console.log("Confirmando BRANCO...");
    } else if (numero.length  === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
        console.log("Confirmando como " + numero);
    }

    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca"> FIM </div>'
            console.log(votos)
        }
    }
}


comecarEtapa();