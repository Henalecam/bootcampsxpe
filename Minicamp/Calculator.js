// Soma
function soma(a, b) {
  return a + b;
}

// Subtração
function subtracao(a, b) {
  return a - b;
}

// Divisão
function divisao(a, b) {
  return a / b;
}

// Multiplicação
function multiplicacao(a, b) {
  return a * b;
}

// Potência
function potencia(a, b) {
  return Math.pow(a, b);
}

// Raiz quadrada
function raizQuadrada(a) {
  return Math.sqrt(a);
}

// Fatorial
function fatorial(a) {
  if (a === 0 || a === 1) {
    return 1;
  } else {
    return a * fatorial(a - 1);
  }
}

// Porcentagem
function porcentagem(a, b) {
  return (a * b) / 100;
}

// Média
function media(...numeros) {
  let soma = 0;
  for (let i = 0; i < numeros.length; i++) {
    soma += numeros[i];
  }
  return soma / numeros.length;
}

function calcular() {
  let num1 = Number(document.getElementById("num1").value);
  let num2 = Number(document.getElementById("num2").value);
  let resultadoDiv = document.getElementById("resultado");
  
  let somaRes = soma(num1, num2);
  let subtracaoRes = subtracao(num1, num2);
  let divisaoRes = divisao(num1, num2);
  let multiplicacaoRes = multiplicacao(num1, num2);
  let potenciaRes = potencia(num1, num2);
  let raizQuadradaRes = raizQuadrada(num1);
  let fatorialRes = fatorial(num1);
  let porcentagemRes = porcentagem(num1, num2);
  let mediaRes = media(num1, num2);

  resultadoDiv.innerHTML = `
    Soma: ${somaRes}<br>
    Subtração: ${subtracaoRes}<br>
    Divisão: ${divisaoRes}<br>
    Multiplicação: ${multiplicacaoRes}<br>
    Potência: ${potenciaRes}<br>
    Raiz Quadrada do número 1: ${raizQuadradaRes}<br>
    Fatorial do número 1: ${fatorialRes}<br>
    Porcentagem do número 1 em relação ao número 2: ${porcentagemRes}<br>
    Média: ${mediaRes}<br>
  `;
}