// 📊 FÓRMULAS JAVASCRIPT COMPLETAS PARA CÁLCULOS DA PECUÁRIA

// ========================================
// 1. 🐂 CÁLCULOS GERAIS - ALIMENTAÇÃO
// ========================================

// Consumo diário de matéria seca (% do PV)
export const calcCMS = (consumoMS, pesoVivo) => {
  const consumo = parseFloat(consumoMS);
  const peso = parseFloat(pesoVivo);

  if (isNaN(consumo) || isNaN(peso) || consumo <= 0 || peso <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (consumo / peso) * 100;
  return `O consumo de matéria seca é de ${result.toFixed(2)}% do peso vivo.`;
};

// Conversão alimentar
export const calcCA = (kgAlimento, kgGanho) => {
  const alimento = parseFloat(kgAlimento);
  const ganho = parseFloat(kgGanho);

  if (isNaN(alimento) || isNaN(ganho) || alimento <= 0 || ganho <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = alimento / ganho;
  return `A conversão alimentar é de ${result.toFixed(
    2
  )} kg de alimento/kg de ganho.`;
};

// Energia metabolizável da dieta
export const calcEM = (consumoMS, emPorKg) => {
  const cms = parseFloat(consumoMS);
  const em = parseFloat(emPorKg);

  if (isNaN(cms) || isNaN(em) || cms <= 0 || em <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (cms * em) / 1000;
  return `A energia metabolizável da dieta é de ${result.toFixed(2)} Mcal/dia.`;
};

// Proteína bruta ingerida
export const calcPB = (consumoMS, percentualPB) => {
  const cms = parseFloat(consumoMS);
  const pb = parseFloat(percentualPB);

  if (isNaN(cms) || isNaN(pb) || cms <= 0 || pb < 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (cms * pb) / 100;
  return `A proteína bruta ingerida é de ${result.toFixed(2)} kg/dia.`;
};

// Cálculo de FDN
export const calcFDN = (fdnAlimento, percentualNaDieta) => {
  const fdn = parseFloat(fdnAlimento);
  const percentual = parseFloat(percentualNaDieta);

  if (isNaN(fdn) || isNaN(percentual) || fdn < 0 || percentual < 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (fdn * percentual) / 100;
  return `O FDN da dieta é de ${result.toFixed(2)}%.`;
};

// Cálculo de FDA
export const calcFDA = (fdaAlimento, percentualNaDieta) => {
  const fda = parseFloat(fdaAlimento);
  const percentual = parseFloat(percentualNaDieta);

  if (isNaN(fda) || isNaN(percentual) || fda < 0 || percentual < 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (fda * percentual) / 100;
  return `O FDA da dieta é de ${result.toFixed(2)}%.`;
};

// Necessidade hídrica diária
export const calcNH = (pesoVivo, producaoLeite = 0, fatorMultiplicador = 5) => {
  const peso = parseFloat(pesoVivo);
  const leite = parseFloat(producaoLeite);
  const fator = parseFloat(fatorMultiplicador);

  if (isNaN(peso) || isNaN(leite) || peso <= 0 || leite < 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = fator * peso + leite * 4.5;
  return `A necessidade hídrica diária é de ${result.toFixed(1)} L/animal/dia.`;
};

// Ração concentrada por animal/dia
export const calcRC = (pesoVivo, percentualPV) => {
  const peso = parseFloat(pesoVivo);
  const percentual = parseFloat(percentualPV);

  if (isNaN(peso) || isNaN(percentual) || peso <= 0 || percentual < 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (peso * percentual) / 100;
  return `A ração concentrada por animal/dia é de ${result.toFixed(2)} kg.`;
};

// Suplementação mineral
export const calcSuplementacaoMineral = (pesoVivo, percentualPV = 0.1) => {
  const peso = parseFloat(pesoVivo);
  const percentual = parseFloat(percentualPV);

  if (isNaN(peso) || isNaN(percentual) || peso <= 0 || percentual < 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = peso * percentual * 10; // g/dia
  return `A suplementação mineral é de ${result.toFixed(0)} g/dia.`;
};

// Custo alimentar por kg de peso ganho
export const calcCustoAlimentarPorKg = (
  custoTotalAlimentacao,
  pesoTotalGanho
) => {
  const custo = parseFloat(custoTotalAlimentacao);
  const ganho = parseFloat(pesoTotalGanho);

  if (isNaN(custo) || isNaN(ganho) || custo < 0 || ganho <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = custo / ganho;
  return `O custo alimentar por kg de peso ganho é de R$ ${result.toFixed(
    2
  )}/kg.`;
};

// ========================================
// 1. 🐂 CÁLCULOS GERAIS - REPRODUÇÃO
// ========================================

// Taxa de prenhez
export const calcTaxaPrenhez = (femeasPrenhas, femeasCobertas) => {
  const prenhas = parseFloat(femeasPrenhas);
  const cobertas = parseFloat(femeasCobertas);

  if (isNaN(prenhas) || isNaN(cobertas) || prenhas < 0 || cobertas <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (prenhas / cobertas) * 100;
  return `A taxa de prenhez é de ${result.toFixed(2)}%.`;
};

// Intervalo entre partos (em dias)
export const calcIntervaloPartos = (
  diaAtual,
  mesAtual,
  anoAtual,
  diaAnterior,
  mesAnterior,
  anoAnterior
) => {
  const atual = new Date(anoAtual, mesAtual - 1, diaAtual);
  const anterior = new Date(anoAnterior, mesAnterior - 1, diaAnterior);

  if (isNaN(atual.getTime()) || isNaN(anterior.getTime())) {
    return "Por favor, insira datas válidas.";
  }

  const diffTime = Math.abs(atual - anterior);
  const dias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const anos = Math.floor(dias / 365);
  const meses = Math.floor((dias % 365) / 30);
  const restoDias = (dias % 365) % 30;

  return `O intervalo entre partos é de ${anos} anos, ${meses} meses e ${restoDias} dias.`;
};

// Taxa de natalidade
export const calcTaxaNatalidade = (nascimentos, femeasReproducao) => {
  const nasc = parseFloat(nascimentos);
  const femeas = parseFloat(femeasReproducao);

  if (isNaN(nasc) || isNaN(femeas) || nasc < 0 || femeas <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (nasc / femeas) * 100;
  return `A taxa de natalidade é de ${result.toFixed(2)}%.`;
};

// Taxa de mortalidade de bezerros
export const calcTaxaMortalidadeBezerros = (
  bezerrosMortos,
  bezerrosNascidos
) => {
  const mortos = parseFloat(bezerrosMortos);
  const nascidos = parseFloat(bezerrosNascidos);

  if (isNaN(mortos) || isNaN(nascidos) || mortos < 0 || nascidos <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (mortos / nascidos) * 100;
  return `A taxa de mortalidade de bezerros é de ${result.toFixed(2)}%.`;
};

// Projeção de crescimento do rebanho
export const calcProjecaoCrescimentoRebanho = (
  taxaNatalidade,
  taxaMortalidade,
  taxaDescarte
) => {
  const natal = parseFloat(taxaNatalidade);
  const mort = parseFloat(taxaMortalidade);
  const desc = parseFloat(taxaDescarte);

  if (isNaN(natal) || isNaN(mort) || isNaN(desc)) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = natal - mort - desc;
  return `A projeção de crescimento do rebanho é de ${result.toFixed(
    2
  )}% ao ano.`;
};

// Relação touro/vacas
export const calcRelacaoTouroVacas = (numeroTouros, numeroVacas) => {
  const touros = parseFloat(numeroTouros);
  const vacas = parseFloat(numeroVacas);

  if (isNaN(touros) || isNaN(vacas) || touros <= 0 || vacas <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = vacas / touros;
  return `A relação é de 1 touro para cada ${result.toFixed(0)} vacas.`;
};

// Índice de fertilidade do rebanho
export const calcIndiceFertilidade = (femeasPrenhas, femeasAcasaladas) => {
  const prenhas = parseFloat(femeasPrenhas);
  const acasaladas = parseFloat(femeasAcasaladas);

  if (isNaN(prenhas) || isNaN(acasaladas) || prenhas < 0 || acasaladas <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (prenhas / acasaladas) * 100;
  return `O índice de fertilidade do rebanho é de ${result.toFixed(2)}%.`;
};

// Taxa de desmame
export const calcTaxaDesmame = (bezerrosDesmamados, bezerrosNascidos) => {
  const desmamados = parseFloat(bezerrosDesmamados);
  const nascidos = parseFloat(bezerrosNascidos);

  if (isNaN(desmamados) || isNaN(nascidos) || desmamados < 0 || nascidos <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (desmamados / nascidos) * 100;
  return `A taxa de desmame é de ${result.toFixed(2)}%.`;
};

// Peso médio ao nascimento
export const calcPesoMedioNascimento = (pesoTotalBezerros, numeroBezerros) => {
  const pesoTotal = parseFloat(pesoTotalBezerros);
  const numero = parseFloat(numeroBezerros);

  if (isNaN(pesoTotal) || isNaN(numero) || pesoTotal <= 0 || numero <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = pesoTotal / numero;
  return `O peso médio ao nascimento é de ${result.toFixed(2)} kg.`;
};

// Taxa de reposição de matrizes
export const calcTaxaReposicaoMatrizes = (matrizesRepostas, totalMatrizes) => {
  const repostas = parseFloat(matrizesRepostas);
  const total = parseFloat(totalMatrizes);

  if (isNaN(repostas) || isNaN(total) || repostas < 0 || total <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (repostas / total) * 100;
  return `A taxa de reposição de matrizes é de ${result.toFixed(2)}%.`;
};

// ========================================
// 1. 🐂 CÁLCULOS GERAIS - DESEMPENHO
// ========================================

// Ganho médio diário (GMD)
export const calcGMD = (pesoFinal, pesoInicial, dias) => {
  const final = parseFloat(pesoFinal);
  const inicial = parseFloat(pesoInicial);
  const periodo = parseFloat(dias);

  if (isNaN(final) || isNaN(inicial) || isNaN(periodo) || periodo <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (final - inicial) / periodo;
  return `O ganho médio diário é de ${result.toFixed(3)} kg/dia.`;
};

// Peso vivo médio do lote
export const calcPesoVivoMedioLote = (pesoTotalLote, numeroAnimais) => {
  const peso = parseFloat(pesoTotalLote);
  const numero = parseFloat(numeroAnimais);

  if (isNaN(peso) || isNaN(numero) || peso <= 0 || numero <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = peso / numero;
  return `O peso vivo médio do lote é de ${result.toFixed(2)} kg.`;
};

// Eficiência alimentar
export const calcEficienciaAlimentar = (ganhoPeso, consumoAlimento) => {
  const ganho = parseFloat(ganhoPeso);
  const consumo = parseFloat(consumoAlimento);

  if (isNaN(ganho) || isNaN(consumo) || ganho <= 0 || consumo <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (ganho / consumo) * 100;
  return `A eficiência alimentar é de ${result.toFixed(2)}%.`;
};

// Produtividade por área
export const calcProdutividadeArea = (producaoTotal, area) => {
  const producao = parseFloat(producaoTotal);
  const hectares = parseFloat(area);

  if (isNaN(producao) || isNaN(hectares) || producao < 0 || hectares <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = producao / hectares;
  return `A produtividade por área é de ${result.toFixed(2)} kg/ha.`;
};

// Lotação animal (UA/ha)
export const calcLotacaoAnimal = (numeroUA, areaPastagem) => {
  const ua = parseFloat(numeroUA);
  const area = parseFloat(areaPastagem);

  if (isNaN(ua) || isNaN(area) || ua < 0 || area <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = ua / area;
  return `A lotação animal é de ${result.toFixed(2)} UA/ha.`;
};

// Índice de produtividade anual
export const calcIndiceProdutividadeAnual = (producaoAnual, areaTotal) => {
  const producao = parseFloat(producaoAnual);
  const area = parseFloat(areaTotal);

  if (isNaN(producao) || isNaN(area) || producao < 0 || area <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = producao / area;
  return `O índice de produtividade anual é de ${result.toFixed(2)} kg/ha/ano.`;
};

// Idade ao primeiro parto (em meses)
// Recebe: dia, mês, ano
export const calcIdadePrimeiroParto = (
  diaNasc,
  mesNasc,
  anoNasc,
  diaParto,
  mesParto,
  anoParto
) => {
  const nascimento = new Date(anoNasc, mesNasc - 1, diaNasc);
  const parto = new Date(anoParto, mesParto - 1, diaParto);

  if (isNaN(nascimento.getTime()) || isNaN(parto.getTime())) {
    return "Por favor, insira datas válidas.";
  }

  let meses =
    (parto.getFullYear() - nascimento.getFullYear()) * 12 +
    (parto.getMonth() - nascimento.getMonth());

  // Ajuste se o dia do parto for menor que o de nascimento
  if (parto.getDate() < nascimento.getDate()) {
    meses -= 1;
  }

  const anos = Math.floor(meses / 12);
  const restoMeses = meses % 12;

  return `A idade ao primeiro parto é de ${anos} anos e ${restoMeses} meses.`;
};

// Taxa de crescimento mensal
export const calcTaxaCrescimentoMensal = (gmdKg) => {
  const gmd = parseFloat(gmdKg);

  if (isNaN(gmd) || gmd < 0) {
    return `Por favor, insira um GMD válido.`;
  }

  const result = gmd * 30;
  return `A taxa de crescimento mensal é de ${result.toFixed(2)} kg/mês.`;
};

// Mortalidade total
export const calcMortalidadeTotal = (animaisMortos, totalAnimais) => {
  const mortos = parseFloat(animaisMortos);
  const total = parseFloat(totalAnimais);

  if (isNaN(mortos) || isNaN(total) || mortos < 0 || total <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (mortos / total) * 100;
  return `A mortalidade total é de ${result.toFixed(2)}%.`;
};

// Índice de eficiência produtiva
export const calcIndiceEficienciaProdutiva = (producaoAnual, numeroAnimais) => {
  const producao = parseFloat(producaoAnual);
  const animais = parseFloat(numeroAnimais);

  if (isNaN(producao) || isNaN(animais) || producao < 0 || animais <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = producao / animais;
  return `O índice de eficiência produtiva é de ${result.toFixed(
    2
  )} kg/animal/ano.`;
};

// ========================================
// 2. 🥩 PECUÁRIA DE CORTE - ALIMENTAÇÃO/ENGORDA
// ========================================

// Conversão alimentar em confinamento
export const calcConversaoAlimentarConfinamento = (
  racaoConsumida,
  ganhoConfinamento
) => {
  const racao = parseFloat(racaoConsumida);
  const ganho = parseFloat(ganhoConfinamento);

  if (isNaN(racao) || isNaN(ganho) || racao <= 0 || ganho <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = racao / ganho;
  return `A conversão alimentar em confinamento é de ${result.toFixed(
    2
  )} kg ração/kg ganho.`;
};

// GMD em confinamento
export const calcGMDConfinamento = (
  pesoFinal,
  pesoInicial,
  diasConfinamento
) => {
  const final = parseFloat(pesoFinal);
  const inicial = parseFloat(pesoInicial);
  const dias = parseFloat(diasConfinamento);

  if (isNaN(final) || isNaN(inicial) || isNaN(dias) || dias <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (final - inicial) / dias;
  return `O GMD em confinamento é de ${result.toFixed(3)} kg/dia.`;
};

// Consumo de concentrado por boi/dia
export const calcConsumoConcentradoBoi = (pesoVivo, percentualConsumo) => {
  const peso = parseFloat(pesoVivo);
  const percentual = parseFloat(percentualConsumo);

  if (isNaN(peso) || isNaN(percentual) || peso <= 0 || percentual < 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (peso * percentual) / 100;
  return `O consumo de concentrado por boi/dia é de ${result.toFixed(2)} kg.`;
};

// Ganho de peso por hectare
export const calcGanhoPesoHectare = (ganhoPesoTotal, areaUtilizada) => {
  const ganho = parseFloat(ganhoPesoTotal);
  const area = parseFloat(areaUtilizada);

  if (isNaN(ganho) || isNaN(area) || ganho < 0 || area <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = ganho / area;
  return `O ganho de peso por hectare é de ${result.toFixed(2)} kg/ha/ano.`;
};

// Suplementação proteica na seca
export const calcSuplementacaoProteicaSeca = (
  pesoVivo,
  percentualSuplemento = 0.2
) => {
  const peso = parseFloat(pesoVivo);
  const percentual = parseFloat(percentualSuplemento);

  if (isNaN(peso) || isNaN(percentual) || peso <= 0 || percentual < 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (peso * percentual) / 100;
  return `A suplementação proteica na seca é de ${result.toFixed(
    2
  )} kg/animal.`;
};

// Lotação máxima no pasto
export const calcLotacaoMaximaPasto = (
  capacidadeSuporte,
  fatorSeguranca = 0.8
) => {
  const capacidade = parseFloat(capacidadeSuporte);
  const fator = parseFloat(fatorSeguranca);

  if (isNaN(capacidade) || isNaN(fator) || capacidade <= 0 || fator <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = capacidade * fator;
  return `A lotação máxima no pasto é de ${result.toFixed(2)} UA/ha.`;
};

// Custo da arroba produzida
export const calcCustoArroba = (custoTotal, numeroArrobas) => {
  const custo = parseFloat(custoTotal);
  const arrobas = parseFloat(numeroArrobas);

  if (isNaN(custo) || isNaN(arrobas) || custo < 0 || arrobas <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = custo / arrobas;
  return `O custo da arroba produzida é de R$ ${result.toFixed(2)}/@.`;
};

// Custo diário de engorda/animal
export const calcCustoDiarioEngorda = (
  custoTotalEngorda,
  numeroAnimais,
  diasEngorda
) => {
  const custo = parseFloat(custoTotalEngorda);
  const animais = parseFloat(numeroAnimais);
  const dias = parseFloat(diasEngorda);

  if (
    isNaN(custo) ||
    isNaN(animais) ||
    isNaN(dias) ||
    custo < 0 ||
    animais <= 0 ||
    dias <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = custo / (animais * dias);
  return `O custo diário de engorda por animal é de R$ ${result.toFixed(
    2
  )}/dia.`;
};

// Rendimento de carcaça
export const calcRendimentoCarcaca = (pesoCarcaca, pesoVivo) => {
  const carcaca = parseFloat(pesoCarcaca);
  const vivo = parseFloat(pesoVivo);

  if (isNaN(carcaca) || isNaN(vivo) || carcaca <= 0 || vivo <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (carcaca / vivo) * 100;
  return `O rendimento de carcaça é de ${result.toFixed(2)}%.`;
};

// Peso médio da carcaça
export const calcPesoMedioCarcaca = (pesoTotalCarcacas, numeroCarcacas) => {
  const peso = parseFloat(pesoTotalCarcacas);
  const numero = parseFloat(numeroCarcacas);

  if (isNaN(peso) || isNaN(numero) || peso <= 0 || numero <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = peso / numero;
  return `O peso médio da carcaça é de ${result.toFixed(2)} kg.`;
};

// ========================================
// 2. 🥩 PECUÁRIA DE CORTE - REBANHO/PRODUÇÃO
// ========================================

// Idade de abate (em meses)
export const calcIdadeAbate = (dataNascimento, dataAbate) => {
  const nascimento = new Date(dataNascimento);
  const abate = new Date(dataAbate);

  if (isNaN(nascimento.getTime()) || isNaN(abate.getTime())) {
    return `Por favor, insira datas válidas.`;
  }

  const meses =
    (abate.getFullYear() - nascimento.getFullYear()) * 12 +
    (abate.getMonth() - nascimento.getMonth());

  return `A idade de abate é de ${meses} meses.`;
};

// Peso médio ao abate
export const calcPesoMedioAbate = (pesoTotalAbate, numeroAnimaisAbate) => {
  const peso = parseFloat(pesoTotalAbate);
  const numero = parseFloat(numeroAnimaisAbate);

  if (isNaN(peso) || isNaN(numero) || peso <= 0 || numero <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = peso / numero;
  return `O peso médio ao abate é de ${result.toFixed(2)} kg.`;
};

// Taxa de desfrute
export const calcTaxaDesfrute = (animaisAbatidosVendidos, rebanhoTotal) => {
  const abatidos = parseFloat(animaisAbatidosVendidos);
  const total = parseFloat(rebanhoTotal);

  if (isNaN(abatidos) || isNaN(total) || abatidos < 0 || total <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (abatidos / total) * 100;
  return `A taxa de desfrute é de ${result.toFixed(2)}%.`;
};

// Produção de arrobas/ano
export const calcProducaoArrobas = (pesoTotalAbatido) => {
  const peso = parseFloat(pesoTotalAbatido);

  if (isNaN(peso) || peso <= 0) {
    return `Por favor, insira um peso válido.`;
  }

  const result = peso / 15; // 1 arroba = 15 kg
  return `A produção é de ${result.toFixed(2)} arrobas/ano.`;
};

// Mortalidade em confinamento
export const calcMortalidadeConfinamento = (mortos, totalConfinados) => {
  const mortosConf = parseFloat(mortos);
  const total = parseFloat(totalConfinados);

  if (isNaN(mortosConf) || isNaN(total) || mortosConf < 0 || total <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (mortosConf / total) * 100;
  return `A mortalidade em confinamento é de ${result.toFixed(2)}%.`;
};

// Taxa de abate do rebanho
export const calcTaxaAbateRebanho = (animaisAbatidos, rebanhoTotal) => {
  const abatidos = parseFloat(animaisAbatidos);
  const total = parseFloat(rebanhoTotal);

  if (isNaN(abatidos) || isNaN(total) || abatidos < 0 || total <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (abatidos / total) * 100;
  return `A taxa de abate do rebanho é de ${result.toFixed(2)}%.`;
};

// Ganho de carcaça por dia
export const calcGanhoCarcacaDia = (rendimentoCarcaca, gmdVivo) => {
  const rendimento = parseFloat(rendimentoCarcaca);
  const gmd = parseFloat(gmdVivo);

  if (isNaN(rendimento) || isNaN(gmd) || rendimento <= 0 || gmd < 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (rendimento / 100) * gmd;
  return `O ganho de carcaça por dia é de ${result.toFixed(3)} kg/dia.`;
};

// Eficiência de terminação
export const calcEficienciaTerminacao = (
  pesoFinal,
  pesoInicial,
  diasTerminacao
) => {
  const final = parseFloat(pesoFinal);
  const inicial = parseFloat(pesoInicial);
  const dias = parseFloat(diasTerminacao);

  if (isNaN(final) || isNaN(inicial) || isNaN(dias) || dias <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (final - inicial) / dias;
  return `A eficiência de terminação é de ${result.toFixed(3)} kg/dia.`;
};

// Rendimento de cortes nobres
export const calcRendimentoCortesNobres = (pesoCortesNobres, pesoCarcaca) => {
  const nobres = parseFloat(pesoCortesNobres);
  const carcaca = parseFloat(pesoCarcaca);

  if (isNaN(nobres) || isNaN(carcaca) || nobres < 0 || carcaca <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (nobres / carcaca) * 100;
  return `O rendimento de cortes nobres é de ${result.toFixed(2)}%.`;
};

// Rendimento de subprodutos
export const calcRendimentoSubprodutos = (pesoSubprodutos, pesoVivo) => {
  const subprodutos = parseFloat(pesoSubprodutos);
  const vivo = parseFloat(pesoVivo);

  if (isNaN(subprodutos) || isNaN(vivo) || subprodutos < 0 || vivo <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = subprodutos;
  return `O rendimento de subprodutos é de ${result.toFixed(2)} kg.`;
};

// ========================================
// 3. 🥛 PECUÁRIA DE LEITE - PRODUÇÃO DE LEITE
// ========================================

// Produção média de leite/vaca/dia
export const calcProducaoLeiteDia = (producaoTotal, numeroVacas) => {
  const producao = parseFloat(producaoTotal);
  const vacas = parseFloat(numeroVacas);

  if (isNaN(producao) || isNaN(vacas) || producao < 0 || vacas <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = producao / vacas;
  return `A produção média é de ${result.toFixed(2)} L/vaca/dia.`;
};

// Produção total do rebanho/dia
export const calcProducaoTotalRebanho = (
  producaoMediaVaca,
  numeroVacasLactacao
) => {
  const media = parseFloat(producaoMediaVaca);
  const vacas = parseFloat(numeroVacasLactacao);

  if (isNaN(media) || isNaN(vacas) || media < 0 || vacas <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = media * vacas;
  return `A produção total do rebanho/dia é de ${result.toFixed(2)} L.`;
};

// Produção anual por vaca
export const calcProducaoAnualVaca = (producaoDiaria, diasLactacao) => {
  const diaria = parseFloat(producaoDiaria);
  const dias = parseFloat(diasLactacao);

  if (isNaN(diaria) || isNaN(dias) || diaria < 0 || dias <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = diaria * dias;
  return `A produção anual por vaca é de ${result.toFixed(2)} L/ano.`;
};

// Produção por hectare
export const calcProducaoPorHectare = (producaoTotalAnual, areaUtilizada) => {
  const producao = parseFloat(producaoTotalAnual);
  const area = parseFloat(areaUtilizada);

  if (isNaN(producao) || isNaN(area) || producao < 0 || area <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = producao / area;
  return `A produção por hectare é de ${result.toFixed(2)} L/ha/ano.`;
};

// Percentual de vacas em lactação
export const calcPercentualVacasLactacao = (vacasLactacao, totalVacas) => {
  const lactacao = parseFloat(vacasLactacao);
  const total = parseFloat(totalVacas);

  if (isNaN(lactacao) || isNaN(total) || lactacao < 0 || total <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (lactacao / total) * 100;
  return `O percentual de vacas em lactação é de ${result.toFixed(2)}%.`;
};

// Teor de gordura no leite
export const calcTeorGorduraLeite = (kgGordura, litrosLeite) => {
  const gordura = parseFloat(kgGordura);
  const leite = parseFloat(litrosLeite);

  if (isNaN(gordura) || isNaN(leite) || gordura < 0 || leite <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (gordura / leite) * 100;
  return `O teor de gordura no leite é de ${result.toFixed(2)}%.`;
};

// Teor de proteína no leite
export const calcTeorProteinaLeite = (kgProteina, litrosLeite) => {
  const proteina = parseFloat(kgProteina);
  const leite = parseFloat(litrosLeite);

  if (isNaN(proteina) || isNaN(leite) || proteina < 0 || leite <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (proteina / leite) * 100;
  return `O teor de proteína no leite é de ${result.toFixed(2)}%.`;
};

// CCS (Células Somáticas por mL)
export const calcCCS = (celulasContadas, volumeAmostra) => {
  const celulas = parseFloat(celulasContadas);
  const volume = parseFloat(volumeAmostra);

  if (isNaN(celulas) || isNaN(volume) || celulas < 0 || volume <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = celulas / volume;
  return `A CCS é de ${result.toFixed(0)} células/mL.`;
};

// CBT (Contagem Bacteriana Total)
export const calcCBT = (bacteriasContadas, volumeAmostra) => {
  const bacterias = parseFloat(bacteriasContadas);
  const volume = parseFloat(volumeAmostra);

  if (isNaN(bacterias) || isNaN(volume) || bacterias < 0 || volume <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = bacterias / volume;
  return `A CBT é de ${result.toFixed(0)} UFC/mL.`;
};

// Produção de sólidos totais
export const calcProducaoSolidosTotais = (
  producaoLeite,
  percentualGordura,
  percentualProteina,
  percentualLactose = 4.6,
  percentualCinzas = 0.7
) => {
  const leite = parseFloat(producaoLeite);
  const gordura = parseFloat(percentualGordura);
  const proteina = parseFloat(percentualProteina);
  const lactose = parseFloat(percentualLactose);
  const cinzas = parseFloat(percentualCinzas);

  if (isNaN(leite) || isNaN(gordura) || isNaN(proteina) || leite <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const percentualTotal = (gordura + proteina + lactose + cinzas) / 100;
  const result = leite * percentualTotal;
  return `A produção de sólidos totais é de ${result.toFixed(2)} kg/dia.`;
};

// ========================================
// 3. 🥛 PECUÁRIA DE LEITE - REPRODUÇÃO/ORDENHA
// ========================================

// Período de lactação
export const calcPeriodoLactacao = (dataSecagem, dataParto) => {
  const secagem = new Date(dataSecagem);
  const parto = new Date(dataParto);

  if (isNaN(secagem.getTime()) || isNaN(parto.getTime())) {
    return `Por favor, insira datas válidas.`;
  }

  const diffTime = Math.abs(secagem - parto);
  const result = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `O período de lactação é de ${result} dias.`;
};

// Período seco
export const calcPeriodoSeco = (dataNovoServico, dataSecagem) => {
  const servico = new Date(dataNovoServico);
  const secagem = new Date(dataSecagem);

  if (isNaN(servico.getTime()) || isNaN(secagem.getTime())) {
    return `Por favor, insira datas válidas.`;
  }

  const diffTime = Math.abs(servico - secagem);
  const result = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `O período seco é de ${result} dias.`;
};

// Taxa de descarte anual
export const calcTaxaDescarteAnual = (vacasDescartadas, totalVacas) => {
  const descartadas = parseFloat(vacasDescartadas);
  const total = parseFloat(totalVacas);

  if (isNaN(descartadas) || isNaN(total) || descartadas < 0 || total <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (descartadas / total) * 100;
  return `A taxa de descarte anual é de ${result.toFixed(2)}%.`;
};

// Custo de alimentação/vaca em lactação
export const calcCustoAlimentacaoVacaLactacao = (custoRacao, consumoDiario) => {
  const custo = parseFloat(custoRacao);
  const consumo = parseFloat(consumoDiario);

  if (isNaN(custo) || isNaN(consumo) || custo < 0 || consumo <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = custo * consumo;
  return `O custo de alimentação por vaca em lactação é de R$ ${result.toFixed(
    2
  )}/dia.`;
};

// Receita do leite/dia
export const calcReceitaLeite = (producaoDiaria, precoLitro) => {
  const producao = parseFloat(producaoDiaria);
  const preco = parseFloat(precoLitro);

  if (isNaN(producao) || isNaN(preco) || producao < 0 || preco < 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = producao * preco;
  return `A receita do leite/dia é de R$ ${result.toFixed(2)}.`;
};

// Receita anual por vaca
export const calcReceitaAnualVaca = (producaoAnual, precoMedio) => {
  const producao = parseFloat(producaoAnual);
  const preco = parseFloat(precoMedio);

  if (isNaN(producao) || isNaN(preco) || producao < 0 || preco < 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = producao * preco;
  return `A receita anual por vaca é de R$ ${result.toFixed(2)}.`;
};

// Lucro líquido por litro
export const calcLucroLiquidoLitro = (precoVenda, custoProducao) => {
  const venda = parseFloat(precoVenda);
  const custo = parseFloat(custoProducao);

  if (isNaN(venda) || isNaN(custo)) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = venda - custo;
  return `O lucro líquido por litro é de R$ ${result.toFixed(2)}/L.`;
};

// Taxa de prenhez das vacas em lactação
export const calcTaxaPrenhezVacasLactacao = (
  vacasPrehasLactacao,
  totalVacasLactacao
) => {
  const prenhas = parseFloat(vacasPrehasLactacao);
  const total = parseFloat(totalVacasLactacao);

  if (isNaN(prenhas) || isNaN(total) || prenhas < 0 || total <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (prenhas / total) * 100;
  return `A taxa de prenhez das vacas em lactação é de ${result.toFixed(2)}%.`;
};

// ========================================
// 4. 🥚 PRODUÇÃO DE OVOS
// ========================================

// Taxa de postura
export const calcTaxaPostura = (ovosProducidos, numeroGalinhas, dias) => {
  const ovos = parseFloat(ovosProducidos);
  const galinhas = parseFloat(numeroGalinhas);
  const periodo = parseFloat(dias);

  if (
    isNaN(ovos) ||
    isNaN(galinhas) ||
    isNaN(periodo) ||
    ovos < 0 ||
    galinhas <= 0 ||
    periodo <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (ovos / (galinhas * periodo)) * 100;
  return `A taxa de postura é de ${result.toFixed(2)}%.`;
};

// Produção de ovos/dia
export const calcProducaoOvosDia = (numeroGalinhas, taxaPostura) => {
  const galinhas = parseFloat(numeroGalinhas);
  const taxa = parseFloat(taxaPostura);

  if (
    isNaN(galinhas) ||
    isNaN(taxa) ||
    galinhas <= 0 ||
    taxa < 0 ||
    taxa > 100
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = galinhas * (taxa / 100);
  return `A produção de ovos/dia é de ${result.toFixed(0)} unidades.`;
};

// Produção anual por galinha
export const calcProducaoAnualGalinha = (taxaPostura) => {
  const taxa = parseFloat(taxaPostura);

  if (isNaN(taxa) || taxa < 0 || taxa > 100) {
    return `Por favor, insira uma taxa de postura válida (0-100%).`;
  }

  const result = (taxa / 100) * 365;
  return `A produção anual por galinha é de ${result.toFixed(0)} ovos/ano.`;
};

// Peso médio dos ovos
export const calcPesoMedioOvos = (pesoTotalOvos, numeroOvos) => {
  const peso = parseFloat(pesoTotalOvos);
  const numero = parseFloat(numeroOvos);

  if (isNaN(peso) || isNaN(numero) || peso <= 0 || numero <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = peso / numero;
  return `O peso médio dos ovos é de ${result.toFixed(1)} g.`;
};

// Massa de ovos produzida/dia
export const calcMassaOvosDia = (numeroOvos, pesoMedioOvos) => {
  const numero = parseFloat(numeroOvos);
  const peso = parseFloat(pesoMedioOvos);

  if (isNaN(numero) || isNaN(peso) || numero < 0 || peso <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (numero * peso) / 1000;
  return `A massa de ovos produzida/dia é de ${result.toFixed(2)} kg.`;
};

// Conversão alimentar em ovos
export const calcConversaoAlimentarOvos = (
  racaoConsumida,
  kgOvosProduzidos
) => {
  const racao = parseFloat(racaoConsumida);
  const ovos = parseFloat(kgOvosProduzidos);

  if (isNaN(racao) || isNaN(ovos) || racao <= 0 || ovos <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = racao / ovos;
  return `A conversão alimentar é de ${result.toFixed(2)} kg ração/kg ovos.`;
};

// Taxa de descarte
export const calcTaxaDescarteOvos = (galinhasDescartadas, totalGalinhas) => {
  const descartadas = parseFloat(galinhasDescartadas);
  const total = parseFloat(totalGalinhas);

  if (isNaN(descartadas) || isNaN(total) || descartadas < 0 || total <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (descartadas / total) * 100;
  return `A taxa de descarte é de ${result.toFixed(2)}%.`;
};

// Produtividade do plantel
export const calcProdutividadePlantel = (ovosAno, avesPorAno) => {
  const ovos = parseFloat(ovosAno);
  const aves = parseFloat(avesPorAno);

  if (isNaN(ovos) || isNaN(aves) || ovos < 0 || aves <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = ovos / aves;
  return `A produtividade do plantel é de ${result.toFixed(0)} ovos/ave/ano.`;
};

// Receita diária com venda de ovos
export const calcReceitaDiariaOvos = (numeroOvos, precoUnitario) => {
  const ovos = parseFloat(numeroOvos);
  const preco = parseFloat(precoUnitario);

  if (isNaN(ovos) || isNaN(preco) || ovos < 0 || preco < 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = ovos * preco;
  return `A receita diária com venda de ovos é de R$ ${result.toFixed(2)}.`;
};

// Lucro líquido por dúzia
export const calcLucroLiquidoDuzia = (precoVendaDuzia, custoProducaoDuzia) => {
  const venda = parseFloat(precoVendaDuzia);
  const custo = parseFloat(custoProducaoDuzia);

  if (isNaN(venda) || isNaN(custo)) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = venda - custo;
  return `O lucro líquido por dúzia é de R$ ${result.toFixed(2)}.`;
};

// ========================================
// 5. 🐑 PRODUÇÃO DE LÃ
// ========================================

// Peso de lã por tosquia
export const calcPesoLaTosquia = (pesoTotalLa, numeroOvelhas) => {
  const peso = parseFloat(pesoTotalLa);
  const numero = parseFloat(numeroOvelhas);

  if (isNaN(peso) || isNaN(numero) || peso <= 0 || numero <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = peso / numero;
  return `O peso de lã por tosquia é de ${result.toFixed(2)} kg.`;
};

// Rendimento da lã lavada
export const calcRendimentoLaLavada = (pesoLaLavada, pesoLaSuja) => {
  const lavada = parseFloat(pesoLaLavada);
  const suja = parseFloat(pesoLaSuja);

  if (isNaN(lavada) || isNaN(suja) || lavada < 0 || suja <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (lavada / suja) * 100;
  return `O rendimento da lã lavada é de ${result.toFixed(2)}%.`;
};

// Finura da lã (valor direto em micra)
export const calcFinuraLa = (finuraMicra) => {
  const finura = parseFloat(finuraMicra);

  if (isNaN(finura) || finura <= 0) {
    return `Por favor, insira um valor válido para finura.`;
  }

  return `A finura da lã é de ${finura.toFixed(1)} micra.`;
};

// Densidade de fibras
export const calcDensidadeFibras = (numeroFibras, areaCm2) => {
  const fibras = parseFloat(numeroFibras);
  const area = parseFloat(areaCm2);

  if (isNaN(fibras) || isNaN(area) || fibras < 0 || area <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = fibras / area;
  return `A densidade de fibras é de ${result.toFixed(0)} fibras/cm².`;
};

// Comprimento médio da mecha
export const calcComprimentoMediaMecha = (
  comprimentoTotalMechas,
  numeroMechas
) => {
  const comprimento = parseFloat(comprimentoTotalMechas);
  const numero = parseFloat(numeroMechas);

  if (isNaN(comprimento) || isNaN(numero) || comprimento <= 0 || numero <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = comprimento / numero;
  return `O comprimento médio da mecha é de ${result.toFixed(1)} cm.`;
};

// Produção de lã por hectare/ano
export const calcProducaoLaHectare = (numeroOvelhasHa, producaoLaOvelhaAno) => {
  const ovelhas = parseFloat(numeroOvelhasHa);
  const producao = parseFloat(producaoLaOvelhaAno);

  if (isNaN(ovelhas) || isNaN(producao) || ovelhas < 0 || producao < 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = ovelhas * producao;
  return `A produção de lã por hectare/ano é de ${result.toFixed(
    2
  )} kg/ha/ano.`;
};

// Intervalo entre tosquias
export const calcIntervaloTosquias = (
  dataTosquiaAnterior,
  dataTosquiaAtual
) => {
  const anterior = new Date(dataTosquiaAnterior);
  const atual = new Date(dataTosquiaAtual);

  if (isNaN(anterior.getTime()) || isNaN(atual.getTime())) {
    return `Por favor, insira datas válidas.`;
  }

  const diffTime = Math.abs(atual - anterior);
  const result = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `O intervalo entre tosquias é de ${result} dias.`;
};

// Conversão alimentar em lã
export const calcConversaoAlimentarLa = (consumoRacao, producaoLa) => {
  const racao = parseFloat(consumoRacao);
  const la = parseFloat(producaoLa);

  if (isNaN(racao) || isNaN(la) || racao <= 0 || la <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = racao / la;
  return `A conversão alimentar em lã é de ${result.toFixed(
    2
  )} kg ração/kg lã.`;
};

// Receita por animal/ano com lã
export const calcReceitaAnimalLa = (producaoLaAno, precoKgLa) => {
  const producao = parseFloat(producaoLaAno);
  const preco = parseFloat(precoKgLa);

  if (isNaN(producao) || isNaN(preco) || producao < 0 || preco < 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = producao * preco;
  return `A receita por animal/ano com lã é de R$ ${result.toFixed(2)}.`;
};

// Receita por hectare com lã
export const calcReceitaHectareLa = (producaoLaHa, precoKgLa) => {
  const producao = parseFloat(producaoLaHa);
  const preco = parseFloat(precoKgLa);

  if (isNaN(producao) || isNaN(preco) || producao < 0 || preco < 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = producao * preco;
  return `A receita por hectare com lã é de R$ ${result.toFixed(2)}.`;
};

// ========================================
// 6. 🐄 PRODUÇÃO DE COURO
// ========================================

// Peso médio do couro/animal
export const calcPesoMedioCouro = (pesoTotalCouros, numeroAnimais) => {
  const peso = parseFloat(pesoTotalCouros);
  const numero = parseFloat(numeroAnimais);

  if (isNaN(peso) || isNaN(numero) || peso <= 0 || numero <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = peso / numero;
  return `O peso médio do couro/animal é de ${result.toFixed(2)} kg.`;
};

// Rendimento do couro
export const calcRendimentoCouro = (pesoCouro, pesoVivo) => {
  const couro = parseFloat(pesoCouro);
  const vivo = parseFloat(pesoVivo);

  if (isNaN(couro) || isNaN(vivo) || couro < 0 || vivo <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (couro / vivo) * 100;
  return `O rendimento do couro é de ${result.toFixed(2)}% do peso vivo.`;
};

// Área média do couro
export const calcAreaMediaCouro = (areaTotalCouros, numeroCouros) => {
  const area = parseFloat(areaTotalCouros);
  const numero = parseFloat(numeroCouros);

  if (isNaN(area) || isNaN(numero) || area <= 0 || numero <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = area / numero;
  return `A área média do couro é de ${result.toFixed(2)} m².`;
};

// Receita do couro por animal
export const calcReceitaCouroAnimal = (pesoCouro, precoKgCouro) => {
  const peso = parseFloat(pesoCouro);
  const preco = parseFloat(precoKgCouro);

  if (isNaN(peso) || isNaN(preco) || peso < 0 || preco < 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = peso * preco;
  return `A receita do couro por animal é de R$ ${result.toFixed(2)}.`;
};

// Receita do couro por lote
export const calcReceitaCouroLote = (receitaPorAnimal, numeroAnimais) => {
  const receita = parseFloat(receitaPorAnimal);
  const numero = parseFloat(numeroAnimais);

  if (isNaN(receita) || isNaN(numero) || receita < 0 || numero <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = receita * numero;
  return `A receita do couro por lote é de R$ ${result.toFixed(2)}.`;
};

// Percentual de aproveitamento
export const calcPercentualAproveitamento = (
  courosAproveitados,
  totalCouros
) => {
  const aproveitados = parseFloat(courosAproveitados);
  const total = parseFloat(totalCouros);

  if (isNaN(aproveitados) || isNaN(total) || aproveitados < 0 || total <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (aproveitados / total) * 100;
  return `O percentual de aproveitamento é de ${result.toFixed(2)}%.`;
};

// Qualidade do couro (escore)
export const calcQualidadeCouro = (pontuacaoTotal, numeroItensAvaliados) => {
  const pontuacao = parseFloat(pontuacaoTotal);
  const itens = parseFloat(numeroItensAvaliados);

  if (isNaN(pontuacao) || isNaN(itens) || pontuacao < 0 || itens <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = pontuacao / itens;
  return `O escore de qualidade do couro é de ${result.toFixed(1)}.`;
};

// Taxa de descarte por defeito
export const calcTaxaDescarteDefeito = (courosDescartados, totalCouros) => {
  const descartados = parseFloat(courosDescartados);
  const total = parseFloat(totalCouros);

  if (isNaN(descartados) || isNaN(total) || descartados < 0 || total <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (descartados / total) * 100;
  return `A taxa de descarte por defeito é de ${result.toFixed(2)}%.`;
};

// Relação couro/carcaça
export const calcRelacaoCouroCarcaca = (pesoCouro, pesoCarcaca) => {
  const couro = parseFloat(pesoCouro);
  const carcaca = parseFloat(pesoCarcaca);

  if (isNaN(couro) || isNaN(carcaca) || couro < 0 || carcaca <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (couro / carcaca) * 100;
  return `A relação couro/carcaça é de ${result.toFixed(2)}%.`;
};

// Receita anual com couro
export const calcReceitaAnualCouro = (receitaMensalCouro) => {
  const mensal = parseFloat(receitaMensalCouro);

  if (isNaN(mensal) || mensal < 0) {
    return `Por favor, insira um valor válido para receita mensal.`;
  }

  const result = mensal * 12;
  return `A receita anual com couro é de R$ ${result.toFixed(2)}.`;
};

// ========================================
// 7. 🐎 PECUÁRIA DE MONTARIA
// ========================================

// Peso vivo médio do cavalo
export const calcPesoVivoMedioCavalo = (pesoTotalCavalos, numeroCavalos) => {
  const peso = parseFloat(pesoTotalCavalos);
  const numero = parseFloat(numeroCavalos);

  if (isNaN(peso) || isNaN(numero) || peso <= 0 || numero <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = peso / numero;
  return `O peso vivo médio do cavalo é de ${result.toFixed(2)} kg.`;
};

// Capacidade de carga máxima
export const calcCapacidadeCargaMaxima = (cargaMaxima, pesoVivoCavalo) => {
  const carga = parseFloat(cargaMaxima);
  const peso = parseFloat(pesoVivoCavalo);

  if (isNaN(carga) || isNaN(peso) || carga < 0 || peso <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (carga / peso) * 100;
  return `A capacidade de carga máxima é de ${result.toFixed(
    2
  )}% do peso vivo.`;
};

// Velocidade média em trabalho
export const calcVelocidadeMediaTrabalho = (
  distanciaPercorrida,
  tempoTrabalho
) => {
  const distancia = parseFloat(distanciaPercorrida);
  const tempo = parseFloat(tempoTrabalho);

  if (isNaN(distancia) || isNaN(tempo) || distancia < 0 || tempo <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = distancia / tempo;
  return `A velocidade média em trabalho é de ${result.toFixed(2)} km/h.`;
};

// Distância percorrida/dia
export const calcDistanciaPercorridaDia = (velocidadeMedia, horasTrabalho) => {
  const velocidade = parseFloat(velocidadeMedia);
  const horas = parseFloat(horasTrabalho);

  if (isNaN(velocidade) || isNaN(horas) || velocidade < 0 || horas < 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = velocidade * horas;
  return `A distância percorrida/dia é de ${result.toFixed(2)} km.`;
};

// Consumo de energia em trabalho
export const calcConsumoEnergiaTrabalho = (
  pesoVivo,
  intensidadeTrabalho = 1.5
) => {
  const peso = parseFloat(pesoVivo);
  const intensidade = parseFloat(intensidadeTrabalho);

  if (isNaN(peso) || isNaN(intensidade) || peso <= 0 || intensidade <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const energiaBasal = peso * 0.021 + 0.975; // Mcal/dia
  const result = energiaBasal * intensidade;
  return `O consumo de energia em trabalho é de ${result.toFixed(2)} Mcal/dia.`;
};

// Necessidade hídrica diária cavalos
export const calcNecessidadeHidricaCavalos = (
  pesoVivo,
  intensidadeTrabalho = 1
) => {
  const peso = parseFloat(pesoVivo);
  const intensidade = parseFloat(intensidadeTrabalho);

  if (isNaN(peso) || isNaN(intensidade) || peso <= 0 || intensidade < 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const aguaBasica = peso * 0.05; // 5% do peso vivo
  const result = aguaBasica * (1 + intensidade);
  return `A necessidade hídrica diária é de ${result.toFixed(1)} L/dia.`;
};

// Consumo de concentrado/dia
export const calcConsumoConcentradoCavalo = (
  pesoVivo,
  percentualConsumo = 1.5
) => {
  const peso = parseFloat(pesoVivo);
  const percentual = parseFloat(percentualConsumo);

  if (isNaN(peso) || isNaN(percentual) || peso <= 0 || percentual < 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (peso * percentual) / 100;
  return `O consumo de concentrado/dia é de ${result.toFixed(2)} kg.`;
};

// Custo mensal de manutenção
export const calcCustoMensalManutencao = (
  custoAlimentacao,
  custoSanitario,
  custosFixos
) => {
  const alimentacao = parseFloat(custoAlimentacao);
  const sanitario = parseFloat(custoSanitario);
  const fixos = parseFloat(custosFixos);

  if (isNaN(alimentacao) || isNaN(sanitario) || isNaN(fixos)) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = alimentacao + sanitario + fixos;
  return `O custo mensal de manutenção é de R$ ${result.toFixed(2)}/animal.`;
};

// Índice de aproveitamento em montaria
export const calcIndiceAproveitamentoMontaria = (
  horasTrabalhadas,
  horasDisponiveis
) => {
  const trabalhadas = parseFloat(horasTrabalhadas);
  const disponiveis = parseFloat(horasDisponiveis);

  if (
    isNaN(trabalhadas) ||
    isNaN(disponiveis) ||
    trabalhadas < 0 ||
    disponiveis <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (trabalhadas / disponiveis) * 100;
  return `O índice de aproveitamento em montaria é de ${result.toFixed(2)}%.`;
};

// Vida útil média em trabalho
export const calcVidaUtilTrabalho = (idadeInicio, idadeDescarte) => {
  const inicio = parseFloat(idadeInicio);
  const descarte = parseFloat(idadeDescarte);

  if (isNaN(inicio) || isNaN(descarte) || inicio < 0 || descarte <= inicio) {
    return `Por favor, insira idades válidas para o cálculo.`;
  }

  const result = descarte - inicio;
  return `A vida útil média em trabalho é de ${result.toFixed(0)} anos.`;
};

// ========================================
// 8. 🌱 MANEJO DE PASTAGENS
// ========================================

// Produção de matéria seca
export const calcProducaoMateriaSeca = (biomassaVerde, percentualMS) => {
  const biomassa = parseFloat(biomassaVerde);
  const ms = parseFloat(percentualMS);

  if (isNaN(biomassa) || isNaN(ms) || biomassa < 0 || ms <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (biomassa * ms) / 100;
  return `A produção de matéria seca é de ${result.toFixed(2)} kg MS/ha.`;
};

// Taxa de crescimento do pasto
export const calcTaxaCrescimentoPasto = (
  producaoMSFinal,
  producaoMSInicial,
  dias
) => {
  const final = parseFloat(producaoMSFinal);
  const inicial = parseFloat(producaoMSInicial);
  const periodo = parseFloat(dias);

  if (isNaN(final) || isNaN(inicial) || isNaN(periodo) || periodo <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (final - inicial) / periodo;
  return `A taxa de crescimento do pasto é de ${result.toFixed(
    2
  )} kg MS/ha/dia.`;
};

// Capacidade de suporte
export const calcCapacidadeSuporte = (producaoMSDisponivel, consumoMSPorUA) => {
  const disponivel = parseFloat(producaoMSDisponivel);
  const consumo = parseFloat(consumoMSPorUA);

  if (isNaN(disponivel) || isNaN(consumo) || disponivel <= 0 || consumo <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = disponivel / consumo;
  return `A capacidade de suporte é de ${result.toFixed(2)} UA/ha.`;
};

// Carga animal instantânea
export const calcCargaAnimalInstantanea = (numeroUAPresentes, areaPastagem) => {
  const ua = parseFloat(numeroUAPresentes);
  const area = parseFloat(areaPastagem);

  if (isNaN(ua) || isNaN(area) || ua < 0 || area <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = ua / area;
  return `A carga animal instantânea é de ${result.toFixed(2)} UA/ha.`;
};

// Índice de lotação
export const calcIndiceLotacao = (numeroUA, areaHectares) => {
  const ua = parseFloat(numeroUA);
  const area = parseFloat(areaHectares);

  if (isNaN(ua) || isNaN(area) || ua < 0 || area <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (ua / area) * 100;
  return `O índice de lotação é de ${result.toFixed(2)} UA/100ha.`;
};

// Período de descanso da pastagem
export const calcPeriodoDescanso = (numeroPiquetes, diasOcupacao) => {
  const piquetes = parseFloat(numeroPiquetes);
  const ocupacao = parseFloat(diasOcupacao);

  if (isNaN(piquetes) || isNaN(ocupacao) || piquetes <= 1 || ocupacao <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = ocupacao * (piquetes - 1);
  return `O período de descanso da pastagem é de ${result.toFixed(0)} dias.`;
};

// Taxa de utilização da forragem
export const calcTaxaUtilizacaoForragem = (
  forragemConsumida,
  forragemDisponivel
) => {
  const consumida = parseFloat(forragemConsumida);
  const disponivel = parseFloat(forragemDisponivel);

  if (
    isNaN(consumida) ||
    isNaN(disponivel) ||
    consumida < 0 ||
    disponivel <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (consumida / disponivel) * 100;
  return `A taxa de utilização da forragem é de ${result.toFixed(2)}%.`;
};

// Produção anual de pasto
export const calcProducaoAnualPasto = (
  producaoDiaria,
  diasProdutivos = 300
) => {
  const diaria = parseFloat(producaoDiaria);
  const dias = parseFloat(diasProdutivos);

  if (isNaN(diaria) || isNaN(dias) || diaria < 0 || dias <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = diaria * dias;
  return `A produção anual de pasto é de ${result.toFixed(2)} kg MS/ha/ano.`;
};

// Perda de forragem por pastejo
export const calcPerdaForragemPastejo = (forragemPerdida, forragemTotal) => {
  const perdida = parseFloat(forragemPerdida);
  const total = parseFloat(forragemTotal);

  if (isNaN(perdida) || isNaN(total) || perdida < 0 || total <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (perdida / total) * 100;
  return `A perda de forragem por pastejo é de ${result.toFixed(2)}%.`;
};

// Eficiência de pastejo
export const calcEficienciaPastejo = (msConsumida, msProduzida) => {
  const consumida = parseFloat(msConsumida);
  const produzida = parseFloat(msProduzida);

  if (isNaN(consumida) || isNaN(produzida) || consumida < 0 || produzida <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (consumida / produzida) * 100;
  return `A eficiência de pastejo é de ${result.toFixed(2)}%.`;
};

// ========================================
// 9. 🧾 ECONOMIA PECUÁRIA
// ========================================

// Custo de produção por kg
export const calcCustoProducaoKg = (custoTotal, kgProduzidos) => {
  const custo = parseFloat(custoTotal);
  const kg = parseFloat(kgProduzidos);

  if (isNaN(custo) || isNaN(kg) || custo < 0 || kg <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = custo / kg;
  return `O custo de produção é de R$ ${result.toFixed(2)}/kg.`;
};

// Margem bruta por animal
export const calcMargemBruta = (receitaBruta, custosVariaveis) => {
  const receita = parseFloat(receitaBruta);
  const custos = parseFloat(custosVariaveis);

  if (isNaN(receita) || isNaN(custos)) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = receita - custos;
  return `A margem bruta por animal é de R$ ${result.toFixed(2)}.`;
};

// Receita bruta por hectare
export const calcReceitaBrutaHectare = (receitaTotal, areaUtilizada) => {
  const receita = parseFloat(receitaTotal);
  const area = parseFloat(areaUtilizada);

  if (isNaN(receita) || isNaN(area) || receita < 0 || area <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = receita / area;
  return `A receita bruta por hectare é de R$ ${result.toFixed(2)}/ha.`;
};

// Custo fixo mensal por animal
export const calcCustoFixoMensal = (custoFixoTotal, numeroAnimais) => {
  const custo = parseFloat(custoFixoTotal);
  const animais = parseFloat(numeroAnimais);

  if (isNaN(custo) || isNaN(animais) || custo < 0 || animais <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = custo / animais;
  return `O custo fixo mensal por animal é de R$ ${result.toFixed(2)}.`;
};

// Receita líquida anual do sistema
export const calcReceitaLiquidaAnual = (receitaTotal, custoTotal) => {
  const receita = parseFloat(receitaTotal);
  const custo = parseFloat(custoTotal);

  if (isNaN(receita) || isNaN(custo)) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = receita - custo;
  return `A receita líquida anual do sistema é de R$ ${result.toFixed(2)}.`;
};

// Retorno sobre investimento (ROI)
export const calcROI = (lucroLiquido, investimentoTotal) => {
  const lucro = parseFloat(lucroLiquido);
  const investimento = parseFloat(investimentoTotal);

  if (isNaN(lucro) || isNaN(investimento) || investimento <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (lucro / investimento) * 100;
  return `O retorno sobre investimento é de ${result.toFixed(2)}%.`;
};

// Ponto de equilíbrio
export const calcPontoEquilibrio = (
  custosFixos,
  precoVenda,
  custoVariavelUnitario
) => {
  const fixos = parseFloat(custosFixos);
  const preco = parseFloat(precoVenda);
  const variavel = parseFloat(custoVariavelUnitario);

  if (isNaN(fixos) || isNaN(preco) || isNaN(variavel) || preco <= variavel) {
    return `Por favor, insira valores válidos. O preço deve ser maior que o custo variável.`;
  }

  const result = fixos / (preco - variavel);
  return `O ponto de equilíbrio é de ${result.toFixed(0)} unidades.`;
};

// Custo da alimentação (% do total)
export const calcCustoAlimentacaoPercentual = (
  custoAlimentacao,
  custoTotal
) => {
  const alimentacao = parseFloat(custoAlimentacao);
  const total = parseFloat(custoTotal);

  if (isNaN(alimentacao) || isNaN(total) || alimentacao < 0 || total <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (alimentacao / total) * 100;
  return `O custo da alimentação representa ${result.toFixed(
    2
  )}% do custo total.`;
};

// Lucro por arroba ou litro
export const calcLucroPorUnidade = (precoVenda, custoProducao) => {
  const venda = parseFloat(precoVenda);
  const custo = parseFloat(custoProducao);

  if (isNaN(venda) || isNaN(custo)) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = venda - custo;
  return `O lucro por unidade é de R$ ${result.toFixed(2)}.`;
};

// Payback
export const calcPayback = (investimentoInicial, fluxoCaixaAnual) => {
  const investimento = parseFloat(investimentoInicial);
  const fluxo = parseFloat(fluxoCaixaAnual);

  if (isNaN(investimento) || isNaN(fluxo) || investimento <= 0 || fluxo <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = investimento / fluxo;
  return `O payback é de ${result.toFixed(1)} anos.`;
};

// ========================================
// 10. 🩺 SANIDADE ANIMAL
// ========================================

// Taxa de mortalidade do rebanho
export const calcTaxaMortalidadeRebanho = (animaisMortos, rebanhoTotal) => {
  const mortos = parseFloat(animaisMortos);
  const total = parseFloat(rebanhoTotal);

  if (isNaN(mortos) || isNaN(total) || mortos < 0 || total <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (mortos / total) * 100;
  return `A taxa de mortalidade do rebanho é de ${result.toFixed(2)}%.`;
};

// Custo anual com vacinas
export const calcCustoAnualVacinas = (
  custoPorDose,
  numeroAnimais,
  numeroAplicacoes
) => {
  const custo = parseFloat(custoPorDose);
  const animais = parseFloat(numeroAnimais);
  const aplicacoes = parseFloat(numeroAplicacoes);

  if (
    isNaN(custo) ||
    isNaN(animais) ||
    isNaN(aplicacoes) ||
    custo < 0 ||
    animais <= 0 ||
    aplicacoes <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = custo * animais * aplicacoes;
  return `O custo anual com vacinas é de R$ ${result.toFixed(2)}.`;
};

// Custo anual com vermífugos
export const calcCustoAnualVermifugos = (
  custoPorTratamento,
  numeroAnimais,
  numeroTratamentos
) => {
  const custo = parseFloat(custoPorTratamento);
  const animais = parseFloat(numeroAnimais);
  const tratamentos = parseFloat(numeroTratamentos);

  if (
    isNaN(custo) ||
    isNaN(animais) ||
    isNaN(tratamentos) ||
    custo < 0 ||
    animais <= 0 ||
    tratamentos <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = custo * animais * tratamentos;
  return `O custo anual com vermífugos é de R$ ${result.toFixed(2)}.`;
};

// Incidência de doenças
export const calcIncidenciaDoencas = (animaisDoentes, totalAnimais) => {
  const doentes = parseFloat(animaisDoentes);
  const total = parseFloat(totalAnimais);

  if (isNaN(doentes) || isNaN(total) || doentes < 0 || total <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (doentes / total) * 100;
  return `A incidência de doenças é de ${result.toFixed(2)}%.`;
};

// Perda de produção por enfermidade
export const calcPerdaProducaoEnfermidade = (producaoNormal, producaoAtual) => {
  const normal = parseFloat(producaoNormal);
  const atual = parseFloat(producaoAtual);

  if (isNaN(normal) || isNaN(atual) || normal <= 0 || atual < 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = ((normal - atual) / normal) * 100;
  return `A perda de produção por enfermidade é de ${result.toFixed(2)}%.`;
};

// Taxa de descarte sanitário
export const calcTaxaDescarteSanitario = (animaisDescartados, rebanhoTotal) => {
  const descartados = parseFloat(animaisDescartados);
  const total = parseFloat(rebanhoTotal);

  if (isNaN(descartados) || isNaN(total) || descartados < 0 || total <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (descartados / total) * 100;
  return `A taxa de descarte sanitário é de ${result.toFixed(2)}%.`;
};

// Gasto com medicamentos/animal/ano
export const calcGastoMedicamentos = (gastoTotal, numeroAnimais) => {
  const gasto = parseFloat(gastoTotal);
  const animais = parseFloat(numeroAnimais);

  if (isNaN(gasto) || isNaN(animais) || gasto < 0 || animais <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = gasto / animais;
  return `O gasto com medicamentos/animal/ano é de R$ ${result.toFixed(2)}.`;
};

// Índice de bem-estar animal
export const calcIndiceBemEstar = (pontuacaoTotal, pontuacaoMaxima) => {
  const total = parseFloat(pontuacaoTotal);
  const maxima = parseFloat(pontuacaoMaxima);

  if (isNaN(total) || isNaN(maxima) || total < 0 || maxima <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (total / maxima) * 100;
  return `O índice de bem-estar animal é de ${result.toFixed(2)}%.`;
};

// Mortalidade por categoria (bezerros)
export const calcMortalidadeBezerros = (bezerrosMortos, bezerrosTotal) => {
  const mortos = parseFloat(bezerrosMortos);
  const total = parseFloat(bezerrosTotal);

  if (isNaN(mortos) || isNaN(total) || mortos < 0 || total <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (mortos / total) * 100;
  return `A mortalidade de bezerros é de ${result.toFixed(2)}%.`;
};

// Taxa de animais recuperados após tratamento
export const calcTaxaRecuperacao = (animaisRecuperados, animaisTratados) => {
  const recuperados = parseFloat(animaisRecuperados);
  const tratados = parseFloat(animaisTratados);

  if (
    isNaN(recuperados) ||
    isNaN(tratados) ||
    recuperados < 0 ||
    tratados <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (recuperados / tratados) * 100;
  return `A taxa de recuperação é de ${result.toFixed(2)}%.`;
};

// ========================================
// FUNÇÕES AUXILIARES E CONVERSÕES
// ========================================

// Converter peso vivo em UA
export const calcUA = (pesoVivo) => {
  const peso = parseFloat(pesoVivo);

  if (isNaN(peso) || peso <= 0) {
    return `Por favor, insira um peso válido.`;
  }

  const result = peso / 450; // 1 UA = 450 kg
  return `O equivalente em UA é de ${result.toFixed(2)} UA.`;
};

// Converter kg para arrobas
export const kgParaArrobas = (kg) => {
  const peso = parseFloat(kg);
  if (isNaN(peso) || peso < 0) {
    return `Por favor, insira um peso válido.`;
  }
  const result = peso / 15;
  return `${peso} kg equivalem a ${result.toFixed(2)} arrobas.`;
};

// Converter arrobas para kg
export const arrobasParaKg = (arrobas) => {
  const arr = parseFloat(arrobas);
  if (isNaN(arr) || arr < 0) {
    return `Por favor, insira um valor válido.`;
  }
  const result = arr * 15;
  return `${arr} arrobas equivalem a ${result.toFixed(2)} kg.`;
};

// Calcular idade em meses a partir de duas datas
export const calcIdadeMeses = (dataNascimento, dataReferencia = new Date()) => {
  const nascimento = new Date(dataNascimento);
  const referencia = new Date(dataReferencia);

  if (isNaN(nascimento.getTime()) || isNaN(referencia.getTime())) {
    return `Por favor, insira datas válidas.`;
  }

  const meses =
    (referencia.getFullYear() - nascimento.getFullYear()) * 12 +
    (referencia.getMonth() - nascimento.getMonth());

  return `A idade é de ${meses} meses.`;
};

// Converter percentual de matéria seca para verde
export const calcBiomassaVerde = (materiaSeca, percentualMS) => {
  const ms = parseFloat(materiaSeca);
  const perc = parseFloat(percentualMS);

  if (isNaN(ms) || isNaN(perc) || ms < 0 || perc <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (ms * 100) / perc;
  return `A biomassa verde é de ${result.toFixed(2)} kg/ha.`;
};

// ========================================
// ORGANIZAÇÃO DAS SEÇÕES
// ========================================

export const GERAIS = {
  Alimentação: [
    {
      id: "CMS",
      label: "Consumo de Matéria Seca",
      func: calcCMS,
      inputs: ["Consumo de MS (kg)", "Peso vivo do animal (kg)"],
    },
    {
      id: "CA",
      label: "Conversão Alimentar",
      func: calcCA,
      inputs: ["Alimento ingerido (kg)", "Peso ganho (kg)"],
    },
    {
      id: "EM",
      label: "Energia Metabolizável da Dieta",
      func: calcEM,
      inputs: ["Consumo de MS (kg/dia)", "Energia (kcal/kg ou Mcal/kg)"],
    },
    {
      id: "PB",
      label: "Proteína Bruta Ingerida",
      func: calcPB,
      inputs: ["Consumo de MS (kg/dia)", "Proteína bruta (% da MS)"],
    },
    {
      id: "FDN",
      label: "Fibra em Detergente Neutro (FDN)",
      func: calcFDN,
      inputs: ["FDN do alimento (%)", "Inclusão do alimento na dieta (%)"],
    },
    {
      id: "FDA",
      label: "Fibra em Detergente Ácido (FDA)",
      func: calcFDA,
      inputs: ["FDA do alimento (%)", "Inclusão do alimento na dieta (%)"],
    },
    {
      id: "NH",
      label: "Necessidade Hídrica Diária",
      func: calcNH,
      inputs: [
        "Peso vivo (kg)",
        "Produção de leite (L/dia)",
        "Fator multiplicador (padrão 5)",
      ],
    },
    {
      id: "RC",
      label: "Ração Concentrada por Animal/Dia",
      func: calcRC,
      inputs: ["Peso vivo (kg)", "Percentual do PV (%)"],
    },
    {
      id: "SM",
      label: "Suplementação Mineral",
      func: calcSuplementacaoMineral,
      inputs: ["Peso vivo (kg)", "Percentual do PV (%)"],
    },
    {
      id: "CAPG",
      label: "Custo Alimentar por Kg de Ganho",
      func: calcCustoAlimentarPorKg,
      inputs: ["Custo total da alimentação (R$)", "Peso total ganho (kg)"],
    },
  ],

  Reprodução: [
    {
      id: "TP",
      label: "Taxa de Prenhez",
      func: calcTaxaPrenhez,
      inputs: ["Fêmeas prenhas (quant)", "Fêmeas cobertas (quant)"],
    },
    {
      id: "IP",
      label: "Intervalo entre Partos",
      func: calcIntervaloPartos,
      inputs: [
        "Dia do parto atual",
        "Mês do parto atual",
        "Ano do parto atual",
        "Dia do parto anterior",
        "Mês do parto anterior",
        "Ano do parto anterior",
      ],
    },
    {
      id: "TN",
      label: "Taxa de Natalidade",
      func: calcTaxaNatalidade,
      inputs: ["Nascimentos (quant)", "Fêmeas em reprodução (quant)"],
    },
    {
      id: "TMB",
      label: "Taxa de Mortalidade de Bezerros",
      func: calcTaxaMortalidadeBezerros,
      inputs: ["Bezerros mortos (quant)", "Bezerros nascidos (quant)"],
    },
    {
      id: "PCR",
      label: "Projeção de Crescimento do Rebanho",
      func: calcProjecaoCrescimentoRebanho,
      inputs: [
        "Taxa de natalidade (%)",
        "Taxa de mortalidade (%)",
        "Taxa de descarte (%)",
      ],
    },
    {
      id: "RTV",
      label: "Relação Touro/Vacas",
      func: calcRelacaoTouroVacas,
      inputs: ["Número de touros (quant)", "Número de vacas (quant)"],
    },
    {
      id: "IFR",
      label: "Índice de Fertilidade do Rebanho",
      func: calcIndiceFertilidade,
      inputs: ["Fêmeas prenhas (quant)", "Fêmeas acasaladas (quant)"],
    },
    {
      id: "TD",
      label: "Taxa de Desmame",
      func: calcTaxaDesmame,
      inputs: ["Bezerros desmamados (quant)", "Bezerros nascidos (quant)"],
    },
    {
      id: "PMN",
      label: "Peso Médio ao Nascimento",
      func: calcPesoMedioNascimento,
      inputs: ["Peso total dos bezerros (kg)", "Número de bezerros (quant)"],
    },
    {
      id: "TRM",
      label: "Taxa de Reposição de Matrizes",
      func: calcTaxaReposicaoMatrizes,
      inputs: ["Matrizes repostas (quant)", "Total de matrizes (quant)"],
    },
  ],

  Desempenho: [
    {
      id: "GMD",
      label: "Ganho Médio Diário",
      func: calcGMD,
      inputs: ["Peso final (kg)", "Peso inicial (kg)", "Período (dias)"],
    },
    {
      id: "PVML",
      label: "Peso Vivo Médio do Lote",
      func: calcPesoVivoMedioLote,
      inputs: ["Peso total do lote (kg)", "Número de animais (quant)"],
    },
    {
      id: "EA",
      label: "Eficiência Alimentar",
      func: calcEficienciaAlimentar,
      inputs: ["Ganho de peso (kg)", "Consumo de alimento (kg)"],
    },
    {
      id: "PA",
      label: "Produtividade por Área",
      func: calcProdutividadeArea,
      inputs: ["Produção total (kg)", "Área (ha)"],
    },
    {
      id: "LA",
      label: "Lotação Animal",
      func: calcLotacaoAnimal,
      inputs: ["Número de UA (quant)", "Área de pastagem (ha)"],
    },
    {
      id: "IPA",
      label: "Índice de Produtividade Anual",
      func: calcIndiceProdutividadeAnual,
      inputs: ["Produção anual (kg)", "Área total (ha)"],
    },
    {
      id: "IPP",
      label: "Idade ao Primeiro Parto",
      func: calcIdadePrimeiroParto,
      inputs: [
        "Dia do nascimento",
        "Mês do nascimento",
        "Ano do nascimento",
        "Dia do parto",
        "Mês do parto",
        "Ano do parto",
      ],
    },
    {
      id: "TCM",
      label: "Taxa de Crescimento Mensal",
      func: calcTaxaCrescimentoMensal,
      inputs: ["GMD (kg/dia)"],
    },
    {
      id: "MT",
      label: "Mortalidade Total",
      func: calcMortalidadeTotal,
      inputs: ["Animais mortos (quant)", "Total de animais (quant)"],
    },
    {
      id: "IEP",
      label: "Índice de Eficiência Produtiva",
      func: calcIndiceEficienciaProdutiva,
      inputs: ["Produção anual (kg)", "Número de animais (quant)"],
    },
  ],
};

export const CORTE = {
  Engorda: [
    {
      id: "CAC",
      label: "Conversão Alimentar em Confinamento",
      func: calcConversaoAlimentarConfinamento,
      inputs: ["Ração consumida (kg)", "Ganho de peso em confinamento (kg)"],
    },
    {
      id: "GMDC",
      label: "Ganho Médio Diário em Confinamento",
      func: calcGMDConfinamento,
      inputs: ["Peso final (kg)", "Peso inicial (kg)", "Dias de confinamento"],
    },
    {
      id: "CCB",
      label: "Consumo de Concentrado por Boi/Dia",
      func: calcConsumoConcentradoBoi,
      inputs: ["Peso vivo (kg)", "Percentual de consumo (%)"],
    },
    {
      id: "GPH",
      label: "Ganho de Peso por Hectare",
      func: calcGanhoPesoHectare,
      inputs: ["Ganho de peso total (kg)", "Área utilizada (ha)"],
    },
    {
      id: "SPS",
      label: "Suplementação Proteica na Seca",
      func: calcSuplementacaoProteicaSeca,
      inputs: ["Peso vivo (kg)", "Percentual suplemento (%)"],
    },
    {
      id: "LMP",
      label: "Lotação Máxima no Pasto",
      func: calcLotacaoMaximaPasto,
      inputs: ["Capacidade de suporte (UA/ha)", "Fator de segurança"],
    },
    {
      id: "CA",
      label: "Custo da Arroba Produzida",
      func: calcCustoArroba,
      inputs: ["Custo total (R$)", "Número de arrobas produzidas (quant)"],
    },
    {
      id: "CDE",
      label: "Custo Diário de Engorda/Animal",
      func: calcCustoDiarioEngorda,
      inputs: [
        "Custo total engorda (R$)",
        "Número de animais (quant)",
        "Dias de engorda",
      ],
    },
    {
      id: "RC",
      label: "Rendimento de Carcaça",
      func: calcRendimentoCarcaca,
      inputs: ["Peso da carcaça (kg)", "Peso vivo (kg)"],
    },
    {
      id: "PMC",
      label: "Peso Médio da Carcaça",
      func: calcPesoMedioCarcaca,
      inputs: ["Peso total das carcaças (kg)", "Número de carcaças (quant)"],
    },
  ],

  Rebanho: [
    {
      id: "IA",
      label: "Idade de Abate",
      func: calcIdadeAbate,
      inputs: ["Data de nascimento", "Data de abate"],
    },
    {
      id: "PMA",
      label: "Peso Médio ao Abate",
      func: calcPesoMedioAbate,
      inputs: [
        "Peso total ao abate (kg)",
        "Número de animais abatidos (quant)",
      ],
    },
    {
      id: "TD",
      label: "Taxa de Desfrute",
      func: calcTaxaDesfrute,
      inputs: ["Animais abatidos/vendidos (quant)", "Rebanho total (quant)"],
    },
    {
      id: "PA",
      label: "Produção de Arrobas/Ano",
      func: calcProducaoArrobas,
      inputs: ["Peso total abatido (kg)"],
    },
    {
      id: "MC",
      label: "Mortalidade em Confinamento",
      func: calcMortalidadeConfinamento,
      inputs: ["Animais mortos (quant)", "Total confinados (quant)"],
    },
    {
      id: "TAR",
      label: "Taxa de Abate do Rebanho",
      func: calcTaxaAbateRebanho,
      inputs: ["Animais abatidos (quant)", "Rebanho total (quant)"],
    },
    {
      id: "GCD",
      label: "Ganho de Carcaça por Dia",
      func: calcGanhoCarcacaDia,
      inputs: ["Rendimento de carcaça (%)", "GMD vivo (kg/dia)"],
    },
    {
      id: "ET",
      label: "Eficiência de Terminação",
      func: calcEficienciaTerminacao,
      inputs: ["Peso final (kg)", "Peso inicial (kg)", "Dias de terminação"],
    },
    {
      id: "RCN",
      label: "Rendimento de Cortes Nobres",
      func: calcRendimentoCortesNobres,
      inputs: ["Peso dos cortes nobres (kg)", "Peso da carcaça (kg)"],
    },
    {
      id: "RSB",
      label: "Rendimento de Subprodutos",
      func: calcRendimentoSubprodutos,
      inputs: ["Peso dos subprodutos (kg)", "Peso vivo (kg)"],
    },
  ],
};

export const LEITE = {
  Producao: [
    {
      id: "PLD",
      label: "Produção Média de Leite/Vaca/Dia",
      func: calcProducaoLeiteDia,
      inputs: ["Produção total (L/dia)", "Número de vacas"],
    },
    {
      id: "PTR",
      label: "Produção Total do Rebanho/Dia",
      func: calcProducaoTotalRebanho,
      inputs: [
        "Produção média por vaca (L/dia)",
        "Número de vacas em lactação",
      ],
    },
    {
      id: "PAV",
      label: "Produção Anual por Vaca",
      func: calcProducaoAnualVaca,
      inputs: ["Produção diária (L)", "Dias de lactação"],
    },
    {
      id: "PPH",
      label: "Produção por Hectare",
      func: calcProducaoPorHectare,
      inputs: ["Produção total anual (L)", "Área utilizada (ha)"],
    },
    {
      id: "PVL",
      label: "Percentual de Vacas em Lactação",
      func: calcPercentualVacasLactacao,
      inputs: ["Número de vacas em lactação", "Total de vacas"],
    },
    {
      id: "TGL",
      label: "Teor de Gordura no Leite",
      func: calcTeorGorduraLeite,
      inputs: ["Kg de gordura", "Litros de leite"],
    },
    {
      id: "TPL",
      label: "Teor de Proteína no Leite",
      func: calcTeorProteinaLeite,
      inputs: ["Kg de proteína", "Litros de leite"],
    },
    {
      id: "CCS",
      label: "CCS (Células Somáticas/mL)",
      func: calcCCS,
      inputs: ["Células contadas", "Volume da amostra (mL)"],
    },
    {
      id: "CBT",
      label: "CBT (Contagem Bacteriana Total)",
      func: calcCBT,
      inputs: ["Bactérias contadas", "Volume da amostra (mL)"],
    },
    {
      id: "PST",
      label: "Produção de Sólidos Totais",
      func: calcProducaoSolidosTotais,
      inputs: [
        "Produção de leite (L)",
        "Percentual de gordura (%)",
        "Percentual de proteína (%)",
        "Percentual de lactose (%)",
        "Percentual de cinzas (%)",
      ],
    },
  ],

  Ordenha: [
    {
      id: "PL",
      label: "Período de Lactação",
      func: calcPeriodoLactacao,
      inputs: ["Data da secagem", "Data do parto"],
    },
    {
      id: "PS",
      label: "Período Seco",
      func: calcPeriodoSeco,
      inputs: ["Data do novo serviço", "Data da secagem"],
    },
    {
      id: "TDA",
      label: "Taxa de Descarte Anual",
      func: calcTaxaDescarteAnual,
      inputs: ["Número de vacas descartadas", "Total de vacas"],
    },
    {
      id: "CAL",
      label: "Custo de Alimentação/Vaca em Lactação",
      func: calcCustoAlimentacaoVacaLactacao,
      inputs: ["Custo da ração (R$/kg)", "Consumo diário (kg)"],
    },
    {
      id: "RLD",
      label: "Receita do Leite/Dia",
      func: calcReceitaLeite,
      inputs: ["Produção diária (L)", "Preço por litro (R$)"],
    },
    {
      id: "RAV",
      label: "Receita Anual por Vaca",
      func: calcReceitaAnualVaca,
      inputs: ["Produção anual (L)", "Preço médio (R$/L)"],
    },
    {
      id: "LLL",
      label: "Lucro Líquido por Litro",
      func: calcLucroLiquidoLitro,
      inputs: ["Preço de venda (R$/L)", "Custo de produção (R$/L)"],
    },
    {
      id: "TPLL",
      label: "Taxa de Prenhez das Vacas em Lactação",
      func: calcTaxaPrenhezVacasLactacao,
      inputs: ["Número de vacas prenhas", "Total de vacas em lactação"],
    },
  ],
};

export const OVOS = {
  Producao: [
    {
      id: "TP",
      label: "Taxa de Postura (%)",
      func: calcTaxaPostura,
      inputs: [
        "Ovos produzidos (unid)",
        "Número de galinhas",
        "Período (dias)",
      ],
    },
    {
      id: "POD",
      label: "Produção de Ovos/Dia",
      func: calcProducaoOvosDia,
      inputs: ["Número de galinhas", "Taxa de postura (%)"],
    },
    {
      id: "PAG",
      label: "Produção Anual por Galinha",
      func: calcProducaoAnualGalinha,
      inputs: ["Taxa de postura (%)"],
    },
    {
      id: "PMO",
      label: "Peso Médio dos Ovos",
      func: calcPesoMedioOvos,
      inputs: ["Peso total dos ovos (g)", "Número de ovos"],
    },
    {
      id: "MOD",
      label: "Massa de Ovos Produzida/Dia",
      func: calcMassaOvosDia,
      inputs: ["Número de ovos", "Peso médio dos ovos (g)"],
    },
    {
      id: "CAO",
      label: "Conversão Alimentar em Ovos",
      func: calcConversaoAlimentarOvos,
      inputs: ["Ração consumida (kg)", "Ovos produzidos (kg)"],
    },
  ],

  Manejo: [
    {
      id: "TDO",
      label: "Taxa de Descarte (%)",
      func: calcTaxaDescarteOvos,
      inputs: ["Galinhas descartadas", "Total de galinhas"],
    },
    {
      id: "PPP",
      label: "Produtividade do Plantel (ovos/ave/ano)",
      func: calcProdutividadePlantel,
      inputs: ["Ovos produzidos por ano", "Número de aves"],
    },
    {
      id: "RDO",
      label: "Receita Diária com Venda de Ovos",
      func: calcReceitaDiariaOvos,
      inputs: ["Número de ovos vendidos", "Preço por ovo (R$)"],
    },
    {
      id: "LLD",
      label: "Lucro Líquido por Dúzia",
      func: calcLucroLiquidoDuzia,
      inputs: [
        "Preço de venda por dúzia (R$)",
        "Custo de produção por dúzia (R$)",
      ],
    },
  ],
};

export const LA = {
  Producao: [
    {
      id: "PLT",
      label: "Peso de Lã por Tosquia",
      func: calcPesoLaTosquia,
      inputs: ["Peso total de lã (kg)", "Número de ovelhas"],
    },
    {
      id: "RLL",
      label: "Rendimento da Lã Lavada (%)",
      func: calcRendimentoLaLavada,
      inputs: ["Peso da lã lavada (kg)", "Peso da lã suja (kg)"],
    },
    {
      id: "FLA",
      label: "Finura da Lã (micra)",
      func: calcFinuraLa,
      inputs: ["Valor da finura (micra)"],
    },
    {
      id: "DFB",
      label: "Densidade de Fibras",
      func: calcDensidadeFibras,
      inputs: ["Número de fibras", "Área da amostra (cm²)"],
    },
    {
      id: "CMM",
      label: "Comprimento Médio da Mecha",
      func: calcComprimentoMediaMecha,
      inputs: ["Comprimento total das mechas (cm)", "Número de mechas"],
    },
    {
      id: "PLH",
      label: "Produção de Lã por Hectare/Ano",
      func: calcProducaoLaHectare,
      inputs: ["Número de ovelhas/ha", "Produção de lã por ovelha/ano (kg)"],
    },
  ],

  Manejo: [
    {
      id: "IT",
      label: "Intervalo entre Tosquias (dias)",
      func: calcIntervaloTosquias,
      inputs: ["Data da tosquia anterior", "Data da tosquia atual"],
    },
    {
      id: "CAL",
      label: "Conversão Alimentar em Lã",
      func: calcConversaoAlimentarLa,
      inputs: ["Consumo de ração (kg)", "Produção de lã (kg)"],
    },
    {
      id: "RAL",
      label: "Receita por Animal/Ano com Lã",
      func: calcReceitaAnimalLa,
      inputs: ["Produção de lã por animal/ano (kg)", "Preço da lã (R$/kg)"],
    },
    {
      id: "RHL",
      label: "Receita por Hectare com Lã",
      func: calcReceitaHectareLa,
      inputs: ["Produção de lã por hectare (kg)", "Preço da lã (R$/kg)"],
    },
  ],
};

export const COURO = {
  Producao: [
    {
      id: "PMC",
      label: "Peso Médio do Couro/Animal",
      func: calcPesoMedioCouro,
      inputs: ["Peso total dos couros (kg)", "Número de animais"],
    },
    {
      id: "RC",
      label: "Rendimento do Couro (%)",
      func: calcRendimentoCouro,
      inputs: ["Peso do couro (kg)", "Peso vivo do animal (kg)"],
    },
    {
      id: "AMC",
      label: "Área Média do Couro",
      func: calcAreaMediaCouro,
      inputs: ["Área total dos couros (m²)", "Número de couros"],
    },
    {
      id: "PAC",
      label: "Percentual de Aproveitamento (%)",
      func: calcPercentualAproveitamento,
      inputs: ["Número de couros aproveitados", "Total de couros"],
    },
    {
      id: "QC",
      label: "Qualidade do Couro (escore)",
      func: calcQualidadeCouro,
      inputs: ["Pontuação total", "Número de itens avaliados"],
    },
    {
      id: "TDD",
      label: "Taxa de Descarte por Defeito (%)",
      func: calcTaxaDescarteDefeito,
      inputs: ["Couros descartados", "Total de couros"],
    },
    {
      id: "RCC",
      label: "Relação Couro/Carcaça (%)",
      func: calcRelacaoCouroCarcaca,
      inputs: ["Peso do couro (kg)", "Peso da carcaça (kg)"],
    },
  ],

  Receita: [
    {
      id: "RCA",
      label: "Receita do Couro por Animal",
      func: calcReceitaCouroAnimal,
      inputs: ["Peso do couro (kg)", "Preço por kg do couro (R$)"],
    },
    {
      id: "RCL",
      label: "Receita do Couro por Lote",
      func: calcReceitaCouroLote,
      inputs: ["Receita por animal (R$)", "Número de animais"],
    },
    {
      id: "RAC",
      label: "Receita Anual com Couro",
      func: calcReceitaAnualCouro,
      inputs: ["Receita mensal com couro (R$)"],
    },
  ],
};

export const MONTARIA = {
  Producao: [
    {
      id: "PVC",
      label: "Peso Vivo Médio do Cavalo",
      func: calcPesoVivoMedioCavalo,
      inputs: ["Peso total dos cavalos (kg)", "Número de cavalos"],
    },
    {
      id: "CCM",
      label: "Capacidade de Carga Máxima (%)",
      func: calcCapacidadeCargaMaxima,
      inputs: ["Carga máxima suportada (kg)", "Peso vivo do cavalo (kg)"],
    },
    {
      id: "VMT",
      label: "Velocidade Média em Trabalho (km/h)",
      func: calcVelocidadeMediaTrabalho,
      inputs: ["Distância percorrida (km)", "Tempo de trabalho (h)"],
    },
    {
      id: "DPD",
      label: "Distância Percorrida/Dia (km)",
      func: calcDistanciaPercorridaDia,
      inputs: ["Velocidade média (km/h)", "Horas de trabalho/dia"],
    },
    {
      id: "CET",
      label: "Consumo de Energia em Trabalho (Mcal/dia)",
      func: calcConsumoEnergiaTrabalho,
      inputs: [
        "Peso vivo do cavalo (kg)",
        "Intensidade do trabalho (opcional)",
      ],
    },
    {
      id: "NHC",
      label: "Necessidade Hídrica Diária (L/dia)",
      func: calcNecessidadeHidricaCavalos,
      inputs: [
        "Peso vivo do cavalo (kg)",
        "Intensidade do trabalho (opcional)",
      ],
    },
    {
      id: "CCC",
      label: "Consumo de Concentrado/Dia (kg)",
      func: calcConsumoConcentradoCavalo,
      inputs: [
        "Peso vivo do cavalo (kg)",
        "Percentual de consumo (%) opcional",
      ],
    },
  ],

  Custo: [
    {
      id: "CMM",
      label: "Custo Mensal de Manutenção",
      func: calcCustoMensalManutencao,
      inputs: [
        "Custo com alimentação (R$/mês)",
        "Custo sanitário (R$/mês)",
        "Custos fixos (R$/mês)",
      ],
    },
  ],

  Aproveitamento: [
    {
      id: "IAM",
      label: "Índice de Aproveitamento em Montaria (%)",
      func: calcIndiceAproveitamentoMontaria,
      inputs: ["Horas trabalhadas", "Horas disponíveis"],
    },
    {
      id: "VUT",
      label: "Vida Útil Média em Trabalho (anos)",
      func: calcVidaUtilTrabalho,
      inputs: ["Idade de início do trabalho", "Idade de descarte"],
    },
  ],
};

export const PASTAGENS = {
  Producao: [
    {
      id: "PMS",
      label: "Produção de Matéria Seca (kg MS/ha)",
      func: calcProducaoMateriaSeca,
      inputs: ["Biomassa verde (kg/ha)", "Percentual de MS (%)"],
    },
    {
      id: "TCP",
      label: "Taxa de Crescimento do Pasto (kg MS/ha/dia)",
      func: calcTaxaCrescimentoPasto,
      inputs: [
        "Produção de MS final (kg/ha)",
        "Produção de MS inicial (kg/ha)",
        "Período (dias)",
      ],
    },
    {
      id: "CS",
      label: "Capacidade de Suporte (UA/ha)",
      func: calcCapacidadeSuporte,
      inputs: [
        "Produção de MS disponível (kg/ha)",
        "Consumo de MS por UA (kg/UA)",
      ],
    },
    {
      id: "CAI",
      label: "Carga Animal Instantânea (UA/ha)",
      func: calcCargaAnimalInstantanea,
      inputs: ["Número de UA presentes", "Área da pastagem (ha)"],
    },
    {
      id: "IL",
      label: "Índice de Lotação (UA/100ha)",
      func: calcIndiceLotacao,
      inputs: ["Número de UA", "Área em hectares"],
    },
  ],

  Manejo: [
    {
      id: "PD",
      label: "Período de Descanso da Pastagem (dias)",
      func: calcPeriodoDescanso,
      inputs: ["Número de piquetes", "Dias de ocupação"],
    },
    {
      id: "TUF",
      label: "Taxa de Utilização da Forragem (%)",
      func: calcTaxaUtilizacaoForragem,
      inputs: ["Forragem consumida (kg)", "Forragem disponível (kg)"],
    },
    {
      id: "PAP",
      label: "Produção Anual de Pasto (kg MS/ha/ano)",
      func: calcProducaoAnualPasto,
      inputs: [
        "Produção diária (kg MS/ha)",
        "Dias produtivos (opcional, padrão 300)",
      ],
    },
    {
      id: "PFP",
      label: "Perda de Forragem por Pastejo (%)",
      func: calcPerdaForragemPastejo,
      inputs: ["Forragem perdida (kg)", "Forragem total (kg)"],
    },
    {
      id: "EP",
      label: "Eficiência de Pastejo (%)",
      func: calcEficienciaPastejo,
      inputs: ["MS consumida (kg)", "MS produzida (kg)"],
    },
  ],
};

export const ECONOMIA = {
  Custos: [
    {
      id: "CPK",
      label: "Custo de Produção por kg",
      func: calcCustoProducaoKg,
      inputs: ["Custo total (R$)", "Quantidade produzida (kg)"],
    },
    {
      id: "CFM",
      label: "Custo Fixo Mensal por Animal",
      func: calcCustoFixoMensal,
      inputs: ["Custo fixo total (R$)", "Número de animais"],
    },
    {
      id: "CAP",
      label: "Custo da Alimentação (% do total)",
      func: calcCustoAlimentacaoPercentual,
      inputs: ["Custo da alimentação (R$)", "Custo total (R$)"],
    },
  ],

  Receitas: [
    {
      id: "MB",
      label: "Margem Bruta por Animal",
      func: calcMargemBruta,
      inputs: ["Receita bruta (R$)", "Custos variáveis (R$)"],
    },
    {
      id: "RBH",
      label: "Receita Bruta por Hectare",
      func: calcReceitaBrutaHectare,
      inputs: ["Receita total (R$)", "Área utilizada (ha)"],
    },
    {
      id: "RLA",
      label: "Receita Líquida Anual do Sistema",
      func: calcReceitaLiquidaAnual,
      inputs: ["Receita total (R$)", "Custo total (R$)"],
    },
    {
      id: "LU",
      label: "Lucro por Unidade (arroba ou litro)",
      func: calcLucroPorUnidade,
      inputs: ["Preço de venda (R$/unidade)", "Custo de produção (R$/unidade)"],
    },
  ],

  Indicadores: [
    {
      id: "ROI",
      label: "Retorno sobre Investimento (ROI) (%)",
      func: calcROI,
      inputs: ["Lucro líquido (R$)", "Investimento total (R$)"],
    },
    {
      id: "PE",
      label: "Ponto de Equilíbrio (unidades)",
      func: calcPontoEquilibrio,
      inputs: [
        "Custos fixos (R$)",
        "Preço de venda por unidade (R$)",
        "Custo variável unitário (R$)",
      ],
    },
    {
      id: "PB",
      label: "Payback (anos)",
      func: calcPayback,
      inputs: ["Investimento inicial (R$)", "Fluxo de caixa anual (R$/ano)"],
    },
  ],
};

export const EXTRA = {
  Conversoes: [
    {
      id: "UA",
      label: "Converter Peso Vivo em UA",
      func: calcUA,
      inputs: ["Peso vivo (kg)"],
    },
    {
      id: "KG_AR",
      label: "Converter kg para Arrobas",
      func: kgParaArrobas,
      inputs: ["Peso (kg)"],
    },
    {
      id: "AR_KG",
      label: "Converter Arrobas para kg",
      func: arrobasParaKg,
      inputs: ["Quantidade (arrobas)"],
    },
    {
      id: "MS_VERDE",
      label: "Converter Matéria Seca para Verde",
      func: calcBiomassaVerde,
      inputs: ["Matéria seca (kg)", "Percentual de MS (%)"],
    },
  ],

  Datas: [
    {
      id: "IDADE_MESES",
      label: "Calcular Idade em Meses",
      func: calcIdadeMeses,
      inputs: ["Data de nascimento", "Data de referência (opcional)"],
    },
  ],
};

export const mapCalculosPec = () => {
  const all = {};

  const sections = [
    CORTE,
    COURO,
    ECONOMIA,
    EXTRA,
    GERAIS,
    LA,
    LEITE,
    MONTARIA,
    OVOS,
    PASTAGENS,
  ];

  sections.forEach((section) => {
    Object.values(section).forEach((arr) => {
      arr.forEach((calc) => {
        all[calc.id] = calc;
      });
    });
  });

  return all;
};
