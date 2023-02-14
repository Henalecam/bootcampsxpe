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
