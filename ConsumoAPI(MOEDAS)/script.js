//importando a url da api
const url = `https://api.hgbrasil.com/finance/quotations?key=development`
const proxi = `https://cors-anywhere.herokuapp.com/`
//IMPORTANDO OS ELEMENTOS HTML
const $destino = document.getElementById('select_destino');
const $botao = document.getElementById('Calcular');
const $valor = document.getElementById('moeda_txt_origem');
const $origem = document.getElementById('select_moeda')
const $resultado = document.getElementById('resultado');


var fetchOpcoes = fetch(proxi + url);
//ESTA FUNÇÃO IRA ENTRAR NO JSON FORNECIDO PELA API E ACESSAR A INFORMAÇÃO DESEJADA
func  = () =>{
    fetchOpcoes.then(url => url.json()).then(url => mostra(url));
}

//ESTA FUNÇÃO BASICAMENTE IRA ENVIAR PARA OUTRA FUNÇÃO O JSON ATÉ CERTO PONTO
mostra = (url)=> {
    const moedas =(url.results.currencies)
    console.log(moedas)
    pegaSelect(moedas);
}

//ESTA FUNÇÃO RECEBE O JSON ATÉ SEU PONTO DE FILTRAGEM 
pegaSelect = (moedas) => {
        //AQUI VERIFICO SE A MOEDA INICIAL É O REAL
    if($origem.value == "Real"){
      //CASO SIM, EU FILTRO O JSON PARA ENCONTRAR O PRECO DA MOEDA DE DESTINO
      //E ENVIO PARA UMA FUNÇÃO 
        let moedaDesejada = moedas[$destino.value].buy
        console.log($destino.value)
        calculoPerfeito(moedaDesejada);
    }

    //VERIFICO SE A MOEDA REAL NAO ESTA ENVOLVIDA NA CONVERSAO
    if($origem.value != "Real" && $destino.value != "REAL"){
        //CASO NAO ESTEJA, ENVIO O PRECO DA MOEDA DE ORIGEM
        //E O PRECO DA MOEDA DE DESTINO PARA UMA FUNCAO
        let moedaDesejadaDiferenteReal = moedas[$destino.value].buy
        let moedaDestino = moedas[$origem.value].buy
        calculoPerfeitoDiferenteReal (moedaDesejadaDiferenteReal, moedaDestino);
    }
    //VERIFICA SE A MOEDA DE DESTINO É O REAL 
    if($origem.value != "Real" && $destino.value == "REAL"){
        //GUARDO O VALOR DA MOEDA DE ORIGEM
        //USA O COLCHETES PARA BUSCAR UM INDICE DENTRO DO JSON POR MEIO DE VARIAVEL
        let moedaEscolhida = moedas[$origem.value].buy;
        console.log(moedaEscolhida)
        //ENVIO PARA UMA FUNÇÃO
        calculoParaReal(moedaEscolhida);
    }


    
   

};

calculoPerfeitoDiferenteReal = (cotacao, valorDestino) =>{
    //GUARDO O VALOR DA MOEDA DESTINO LOCALMENTE
     let valorDestino2 = valorDestino;
    //GUARDO O VALOR DIGITADO
     let valorSelecionado = $valor.value;
 
    //GUARDO O VALOR DA MOEDA DE ORIGEM LOCALMENTE
    let cotacaoLocal = cotacao;
    //CONVERTO PRIMEIRAMENTE PARA REAL 
    let valorEmReal = valorSelecionado  * valorDestino2;
    //TRANSFORMO O VALOR EM REAL PARA A MOEDA DESTINO
    let resultadoDesejado = valorEmReal / cotacaoLocal;
    //COLOCO O RESULTADO NA CAIXA 
    $resultado.value = resultadoDesejado;
    
}


calculoPerfeito = (cotacao) => {

    //RESGATO O VALOR DIGITADO
    let valorSelecionado = $valor.value;
    //GUARDO EM VARIAVEL LOCAL O PRECO DA MOEDA SELECIONADA
    let cotacaoLocal = cotacao;
    //EFETUO O CALCULO PRA CONVERTER EM REAL
    let resultado = valorSelecionado / cotacaoLocal;

    console.log(resultado);
    //COLOCO O RESULTADO NA CAIXA
    $resultado.value = resultado;
}

calculoParaReal = (moedaInicial) => {
    //FAÇO A CONTA DO PRECO DA MOEDA INICIAL PELO VALOR DIGITADO
    let resultado = moedaInicial * $valor.value;
    console.log(resultado);
    //COLOCO O RESULTADO NA CAIXA
    $resultado.value = resultado;
}

//DETECTO O CLICK DO BOTAO
$botao.addEventListener("click" ,()=> func())

