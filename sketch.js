let campoSalario, s, i, INSS;
let campoPatrimonio, campoCusto, campoInvest, campoInfl, campoTempo, p, c, i2, f, t, j, montante;

function setup() {
  console.log("Setup chamado"); // Adiciona log no console
  campoSalario = document.getElementById('salario');
  campoPatrimonio = document.getElementById('patrimonio');
  campoCusto = document.getElementById('custo');
  campoInvest = document.getElementById('taxaInvest');
  campoInfl = document.getElementById('taxaInfl');
  campoTempo = document.getElementById('tempo');
}

document.addEventListener('DOMContentLoaded', setup); // Garante que setup seja chamado após o carregamento do DOM

function PegaValoresImposto() {
  console.log("PegaValoresImposto chamado"); // Adiciona log no console
  const tratarNumero = (valor) => parseFloat(valor.toString().replace(",", "."));

  s = tratarNumero(campoSalario.value);
  CalcularResultadoImposto();
}

function CalcularResultadoImposto() {
  console.log("CalcularResultadoImposto chamado"); // Adiciona log no console
  INSS = 0;

  if (s < 225920 / 100) {
    i = 0;
  } else if (s >= 225920 / 100 && s <= 282665 / 100) {
    i = s * (75 / 1000) - 16944 / 100;
  } else if (s >= 282666 / 100 && s <= 375105 / 100) {
    i = s * (15 / 100) - 38144 / 100;
  } else if (s >= 375106 / 100 && s <= 466468 / 100) {
    i = s * (225 / 1000) - 66277 / 100;
  } else if (s >= 466469 / 100) {
    i = s * (275 / 1000) - 896;
  }
  i = i.toFixed(2);

  if (s <= 1320) {
    INSS = s * 0.075;
  } else if (s <= 2571.29) {
    INSS = ((s - 1320) * 0.09) + (1320 * 0.075);
  } else if (s <= 3856.94) {
    INSS = ((s - 2571.29) * 0.12) + (2571.29 - 1320) * 0.09 + (1320 * 0.075);
  } else if (s <= 7507.49) {
    INSS = ((s - 3856.94) * 0.14) + (3856.94 - 2571.29) * 0.12 + (2571.29 - 1320) * 0.09 + (1320 * 0.075);
  } else {
    INSS = 7507.49 * 0.14;
  }
  INSS = INSS.toFixed(2);

  // Atualizar resultados no HTML
  document.getElementById('resultadoImposto').innerText = `INSS Devido Mensal: R$ ${INSS}\nImposto Devido Mensal: R$ ${i}\nImposto Devido Anual: R$ ${(i * 13).toFixed(2)}`;
}

function PegaValoresInvestimento() {
  console.log("PegaValoresInvestimento chamado"); // Adiciona log no console
  const tratarNumero = (valor) => parseFloat(valor.toString().replace(",", "."));

  p = tratarNumero(campoPatrimonio.value);
  c = tratarNumero(campoCusto.value);
  i2 = tratarNumero(campoInvest.value);
  f = tratarNumero(campoInfl.value);
  t = tratarNumero(campoTempo.value);

  j = 1 + ((i2 - f) / 100);

  v1 = p;
  vk = v1;

  CalcularResultadoInvestimento(v1, vk, t, c, j);
}

function CalcularResultadoInvestimento(v1, vk, t, c, j) {
  console.log("CalcularResultadoInvestimento chamado"); // Adiciona log no console
  for (k = 1; k <= t; k++) {
    vk = (vk * j + c);
  }
  montante = vk.toFixed(2);

  // Atualizar resultados no HTML
  document.getElementById('resultadoInvestimento').innerText = `Investimento bruto: R$ ${montante}\nInvestimento abreviado: R$ ${Math.floor(montante)}`;
}
