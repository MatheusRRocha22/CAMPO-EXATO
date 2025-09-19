/*
    Cálculos da Agricultura Organizados por Culturas
*/

// ========================================
// CULTIVOS GERAIS (Servem para TODAS as culturas, incluindo café)
// ========================================

// Seção: Semeadura
export const calcPPH = (espPlantas, espLinhas) => {
  const plantas = parseFloat(espPlantas);
  const linhas = parseFloat(espLinhas);

  if (isNaN(plantas) || isNaN(linhas) || plantas <= 0 || linhas <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (1000 / (linhas / 100)) * (1 / (plantas / 100));
  return `A população de plantas por hectare é de aproximadamente ${result.toFixed(
    1
  )} plantas/ha.`;
};

export const calcDSem = (pesoKg, peso1000, areaHa) => {
  const kg = parseFloat(pesoKg);
  const g1000 = parseFloat(peso1000);
  const area = parseFloat(areaHa);

  if (
    isNaN(kg) ||
    kg <= 0 ||
    isNaN(g1000) ||
    g1000 <= 0 ||
    isNaN(area) ||
    area <= 0
  ) {
    return `Por favor, insira valores válidos para todos os campos.`;
  }

  const sementesTotais = (kg * 1000) / g1000;
  const sementesPorM2 = sementesTotais / (area * 10000);
  return `A densidade de semeadura é de ${(sementesPorM2 * 1000).toFixed(
    1
  )} sementes/m².`;
};

export const calcVelSem = (area, tempo, largBarra) => {
  const a = parseFloat(area);
  const t = parseFloat(tempo);
  const largB = parseFloat(largBarra);

  if (isNaN(a) || isNaN(t) || isNaN(largB) || a <= 0 || t <= 0 || largB <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (a * 10) / (t * largB);
  return `A velocidade ideal para semeadura é de aproximadamente ${result.toFixed(
    2
  )} km/h.`;
};

// Seção: Cultivo
export const calcIAF = (areaFolhas, areaOcup) => {
  const aF = parseFloat(areaFolhas);
  const aO = parseFloat(areaOcup);

  if (isNaN(aF) || isNaN(aO) || aF <= 0 || aO <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = aF / aO;
  return `O Índice de Área Foliar (IAF) é de aproximadamente ${result.toFixed(
    1
  )}.`;
};

export const calcAPH = (nutriRec, nutriConc) => {
  const nRec = parseFloat(nutriRec);
  const nConc = parseFloat(nutriConc);

  if (isNaN(nRec) || isNaN(nConc) || nRec <= 0 || nConc <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (nRec * 100) / nConc;
  return `A adubação por hectare necessária é de aproximadamente ${result.toFixed(
    1
  )} kg/ha.`;
};

export const calcETo = (tempMax, tempMin, umidadeRel, velocVento, radSolar) => {
  const tMax = parseFloat(tempMax);
  const tMin = parseFloat(tempMin);
  const ur = parseFloat(umidadeRel);
  const u2 = parseFloat(velocVento);
  const rs = parseFloat(radSolar);

  if (
    isNaN(tMax) ||
    isNaN(tMin) ||
    isNaN(ur) ||
    isNaN(u2) ||
    isNaN(rs) ||
    tMax < -50 ||
    tMax > 60 ||
    tMin < -50 ||
    tMin > 60 ||
    ur < 0 ||
    ur > 100 ||
    u2 < 0 ||
    rs < 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const tMed = (tMax + tMin) / 2;
  const delta =
    (4098 * (0.6108 * Math.exp((17.27 * tMed) / (tMed + 237.3)))) /
    Math.pow(tMed + 237.3, 2);
  const gamma = 0.665;
  const u2Factor = 0.34 * u2;
  const radFactor = 0.408 * rs;

  const eTo =
    (delta * radFactor + gamma * u2Factor * (tMax - tMin) * (1 - ur / 100)) /
    (delta + gamma);
  const result = Math.max(0, eTo);

  return `A evapotranspiração de referência (ETo) é de aproximadamente ${result.toFixed(
    1
  )} mm/dia.`;
};

export const calcPrecipEfetiva = (precipitacao, tipoSolo = "2") => {
  const p = parseFloat(precipitacao);
  const tipo = parseFloat(tipoSolo);

  if (isNaN(p) || p < 0 || isNaN(tipo) || tipo < 1 || tipo > 3) {
    return `Por favor, insira valores válidos.`;
  }

  let precipEfetiva;

  if (p <= 25) {
    precipEfetiva = p * 0.8;
  } else if (p <= 75) {
    precipEfetiva = 20 + (p - 25) * 0.6;
  } else {
    precipEfetiva = 50 + (p - 75) * 0.1;
  }

  const fatorSoloMap = {
    1: 0.8,
    2: 1.0,
    3: 1.1,
  };

  precipEfetiva *= fatorSoloMap[tipo] || 1.0;
  precipEfetiva = Math.min(precipEfetiva, p);

  return `A precipitação efetiva é de aproximadamente ${precipEfetiva.toFixed(
    1
  )} mm.`;
};

export const calcNIrrig = (evap, precipEfe) => {
  const e = parseFloat(evap);
  const pEfe = parseFloat(precipEfe);

  if (isNaN(e) || isNaN(pEfe) || e < 0 || pEfe < 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = Math.max(0, e - pEfe);
  return `A necessidade de irrigação é de aproximadamente ${result.toFixed(
    2
  )} mm/dia.`;
};

export const calcVAI = (neces) => {
  const n = parseFloat(neces);

  if (isNaN(n) || n <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = n * 10;
  return `O volume de água necessário para irrigação é de aproximadamente ${result.toFixed(
    1
  )} m³/ha/dia.`;
};

export const calcEUA = (prod, lamina) => {
  const p = parseFloat(prod);
  const l = parseFloat(lamina);

  if (isNaN(p) || isNaN(l) || p <= 0 || l <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = p / l;
  return `A eficiência do uso de água é de aproximadamente ${result.toFixed(
    1
  )} kg/m³.`;
};

export const calcEUF = (prodCA, prodSA, aduboApli) => {
  const pCA = parseFloat(prodCA);
  const pSA = parseFloat(prodSA);
  const aApli = parseFloat(aduboApli);

  if (
    isNaN(pCA) ||
    isNaN(pSA) ||
    isNaN(aApli) ||
    pCA <= 0 ||
    pSA <= 0 ||
    aApli <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (pCA - pSA) / aApli;
  return `A eficiência do uso de fertilizante é de aproximadamente ${result.toFixed(
    1
  )} kg Prod/kg Adub.`;
};
export const calcCTC = (ca, mg, k, al, h) => {
  const calcio = parseFloat(ca);
  const magnesio = parseFloat(mg);
  const potassio = parseFloat(k);
  const aluminio = parseFloat(al) || 0;
  const hidrogenio = parseFloat(h);

  if (
    isNaN(calcio) ||
    isNaN(magnesio) ||
    isNaN(potassio) ||
    isNaN(hidrogenio) ||
    calcio < 0 ||
    magnesio < 0 ||
    potassio < 0 ||
    aluminio < 0 ||
    hidrogenio < 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const ctc = calcio + magnesio + potassio + aluminio + hidrogenio;
  let classificacao = "";
  if (ctc > 15) classificacao = "Alta CTC";
  else if (ctc > 8) classificacao = "Média CTC";
  else classificacao = "Baixa CTC";

  return `A Capacidade de Troca Catiônica é de ${ctc.toFixed(
    2
  )} cmolc/dm³. ${classificacao}.`;
};

export const calcSaturacaoBases = (ca, mg, k, ctc) => {
  const calcio = parseFloat(ca);
  const magnesio = parseFloat(mg);
  const potassio = parseFloat(k);
  const capacidade = parseFloat(ctc);

  if (
    isNaN(calcio) ||
    isNaN(magnesio) ||
    isNaN(potassio) ||
    isNaN(capacidade) ||
    calcio < 0 ||
    magnesio < 0 ||
    potassio < 0 ||
    capacidade <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const sb = calcio + magnesio + potassio;
  const saturacao = (sb / capacidade) * 100;

  let status = "";
  if (saturacao >= 70) status = "Alto teor de bases";
  else if (saturacao >= 50) status = "Médio teor de bases";
  else status = "Baixo teor de bases";

  return `A Saturação por Bases é de ${saturacao.toFixed(1)}%. ${status}.`;
};

export const calcNecessidadeCalcario = (
  saturacaoAtual,
  saturacaoDesejada,
  ctc,
  prnt
) => {
  const satAtual = parseFloat(saturacaoAtual);
  const satDesejada = parseFloat(saturacaoDesejada);
  const capacidade = parseFloat(ctc);
  const poder = parseFloat(prnt) || 100;

  if (
    isNaN(satAtual) ||
    isNaN(satDesejada) ||
    isNaN(capacidade) ||
    satAtual < 0 ||
    satDesejada <= satAtual ||
    capacidade <= 0 ||
    poder <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const necessidade = ((satDesejada - satAtual) * capacidade) / poder;
  return `A necessidade de calcário é de ${necessidade.toFixed(
    2
  )} t/ha com PRNT ${poder}% para elevar a saturação de ${satAtual}% para ${satDesejada}%.`;
};

// Seção: Colheita
export const calcProd = (produtividade, areaCol) => {
  const prod = parseFloat(produtividade);
  const aCol = parseFloat(areaCol);

  if (isNaN(prod) || isNaN(aCol) || prod <= 0 || aCol <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = prod * aCol;
  return `A produção total é de aproximadamente ${result.toFixed(1)} kg ou ${(
    result / 60
  ).toFixed(1)} sacas.`;
};

export const calcPerdas = (graosSolo, rendEsperado) => {
  const gSolo = parseFloat(graosSolo);
  const rEsp = parseFloat(rendEsperado);

  if (isNaN(gSolo) || isNaN(rEsp) || gSolo < 0 || rEsp <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (gSolo / rEsp) * 100;
  return `A perda na colheita é de aproximadamente ${result.toFixed(1)}%.`;
};

// ========================================
// CULTURAS ANUAIS (Milho, Soja, Feijão, Arroz, etc.)
// ========================================

// Seção: Semeadura
export const calcQSH = (popIdeal, pesoSem, taxaGerm, taxaPur) => {
  const populacaoIdeal = parseFloat(popIdeal);
  const pesoSemente = parseFloat(pesoSem);
  const taxaGerminacao = parseFloat(taxaGerm);
  const taxaPureza = parseFloat(taxaPur);

  if (
    isNaN(populacaoIdeal) ||
    isNaN(pesoSemente) ||
    isNaN(taxaGerminacao) ||
    isNaN(taxaPureza) ||
    populacaoIdeal <= 0 ||
    pesoSemente <= 0 ||
    taxaGerminacao <= 0 ||
    taxaPureza <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result =
    (populacaoIdeal * pesoSemente) / (taxaGerminacao * taxaPureza * 10);

  return `A quantidade de semente gasta por hectare é de ${result.toFixed(
    1
  )} kg/ha ou ${(result / 25).toFixed(1)} sacas/ha.`;
};

export const calcCDS = (doseDes, germ, pureza) => {
  const doseDesejada = parseFloat(doseDes);
  const germinacao = parseFloat(germ);
  const pur = parseFloat(pureza);

  if (
    isNaN(doseDesejada) ||
    isNaN(germinacao) ||
    isNaN(pur) ||
    doseDesejada <= 0 ||
    germinacao <= 0 ||
    pur <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = doseDesejada / ((germinacao * pur) / 10000);
  return `A dose corrigida de sementes é de ${result.toFixed(1)} kg/ha.`;
};

export const calcVSem = (massaTotal, densSem) => {
  const massaT = parseFloat(massaTotal);
  const densSemente = parseFloat(densSem);

  if (isNaN(massaT) || isNaN(densSemente) || massaT <= 0 || densSemente <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = massaT / densSemente;
  return `O volume de sementes por hectare é de aproximadamente ${result.toFixed(
    1
  )} L/ha.`;
};

// Seção: Colheita
export const calcRIouC = (pesoL, pesoB) => {
  const pL = parseFloat(pesoL);
  const pB = parseFloat(pesoB);

  if (isNaN(pL) || isNaN(pB) || pL <= 0 || pB <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const result = (pL / pB) * 100;
  return `O Rendimento Industrial é de aproximadamente ${result.toFixed(1)}%.`;
};

// Função específica para culturas anuais
export const calcStand = (
  plantasContadas,
  metrosLineares,
  espacamentoLinhas
) => {
  const plantas = parseFloat(plantasContadas);
  const metros = parseFloat(metrosLineares);
  const espacamento = parseFloat(espacamentoLinhas);

  if (
    isNaN(plantas) ||
    isNaN(metros) ||
    isNaN(espacamento) ||
    plantas < 0 ||
    metros <= 0 ||
    espacamento <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const plantasPorMetroLinear = plantas / metros;
  const plantasPorHa = (plantasPorMetroLinear * 10000) / espacamento;

  return `O stand atual é de ${plantasPorMetroLinear.toFixed(
    1
  )} plantas/metro linear ou ${plantasPorHa.toFixed(0)} plantas/ha.`;
};

export const calcGrausUmidade = (pesoUmido, pesoSeco) => {
  const umido = parseFloat(pesoUmido);
  const seco = parseFloat(pesoSeco);

  if (isNaN(umido) || isNaN(seco) || umido <= 0 || seco <= 0 || seco > umido) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const umidade = ((umido - seco) / umido) * 100;
  return `O grau de umidade dos grãos é de ${umidade.toFixed(1)}%.`;
};

// ========================================
// CAFEICULTURA (Específicas do café)
// ========================================

// Seção: Semeadura
export const calcMudasCafe = (
  espacFileiras,
  espacPlantas,
  areaHa,
  percentReserva
) => {
  const espFileiras = parseFloat(espacFileiras);
  const espPlantas = parseFloat(espacPlantas);
  const area = parseFloat(areaHa);
  const reserva = parseFloat(percentReserva) || 10;

  if (
    isNaN(espFileiras) ||
    isNaN(espPlantas) ||
    isNaN(area) ||
    espFileiras <= 0 ||
    espPlantas <= 0 ||
    area <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const mudasPorHa = 10000 / (espFileiras * espPlantas);
  const mudasTotal = mudasPorHa * area;
  const mudasComReserva = mudasTotal * (1 + reserva / 100);

  return `A densidade de plantio é de ${mudasPorHa.toFixed(
    0
  )} mudas por hectare. Para ${area} hectares são necessárias ${mudasTotal.toFixed(
    0
  )} mudas. Considerando ${reserva}% de reserva: ${mudasComReserva.toFixed(
    0
  )} mudas.`;
};

export const calcSementeiraCafe = (
  mudaDesejadas,
  percentGerminacao,
  gramasPor1000Sementes
) => {
  const mudas = parseFloat(mudaDesejadas);
  const germinacao = parseFloat(percentGerminacao);
  const pesoMilSementes = parseFloat(gramasPor1000Sementes);

  if (
    isNaN(mudas) ||
    isNaN(germinacao) ||
    isNaN(pesoMilSementes) ||
    mudas <= 0 ||
    germinacao <= 0 ||
    germinacao > 100 ||
    pesoMilSementes <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const sementesNecessarias = (mudas * 100) / germinacao;
  const pesoSementesGramas = (sementesNecessarias * pesoMilSementes) / 1000;
  const pesoSementesKg = pesoSementesGramas / 1000;

  return `Para produzir ${mudas} mudas com ${germinacao}% de germinação, são necessárias ${sementesNecessarias.toFixed(
    0
  )} sementes, totalizando ${pesoSementesKg.toFixed(3)} kg de sementes.`;
};

export const calcViveiroCafe = (
  mudaDesejadas,
  mudasPorMetro,
  percentMortalidade
) => {
  const mudas = parseFloat(mudaDesejadas);
  const mudasPorM = parseFloat(mudasPorMetro);
  const mortalidade = parseFloat(percentMortalidade) || 5;

  if (isNaN(mudas) || isNaN(mudasPorM) || mudas <= 0 || mudasPorM <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const mudaComMortalidade = mudas * (1 + mortalidade / 100);
  const areaViveiro = mudaComMortalidade / mudasPorM;
  const sacosSubstrato = Math.ceil((mudaComMortalidade * 0.5) / 50);

  return `O viveiro deve ter ${areaViveiro.toFixed(
    2
  )} m² para acomodar ${mudaComMortalidade.toFixed(
    0
  )} mudas (incluindo ${mortalidade}% de mortalidade). Serão necessários ${sacosSubstrato} sacos de 50L de substrato.`;
};

// Seção: Cultivo
export const calcPodaCafe = (alturaPlanta, alturaCorte, tipoCorte) => {
  const altura = parseFloat(alturaPlanta);
  const corte = parseFloat(alturaCorte);
  const tipo = parseFloat(tipoCorte);

  if (
    isNaN(altura) ||
    isNaN(corte) ||
    altura <= 0 ||
    corte <= 0 ||
    corte >= altura ||
    isNaN(tipo) ||
    tipo < 1 ||
    tipo > 3
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const tiposDeCorte = {
    1: "recepa",
    2: "decote",
    3: "poda comum",
  };

  const tipoPodaString = tiposDeCorte[tipo];

  const percentualPodado = ((altura - corte) / altura) * 100;
  let tempoRecuperacao = 0;

  if (tipoPodaString === "recepa") {
    tempoRecuperacao = 3;
  } else if (tipoPodaString === "decote") {
    tempoRecuperacao = 2;
  } else {
    tempoRecuperacao = Math.ceil(percentualPodado / 25);
  }

  return `A poda remove ${percentualPodado.toFixed(
    1
  )}% da altura da planta. Tipo de poda: ${tipoPodaString}. Tempo estimado para recuperação produtiva é de ${tempoRecuperacao} anos.`;
};

export const calcEsqueletamentoCafe = (
  diametroTronco,
  numeroRamosAtuais,
  alturaPlanta
) => {
  const diametro = parseFloat(diametroTronco);
  const ramosAtuais = parseFloat(numeroRamosAtuais);
  const altura = parseFloat(alturaPlanta);

  if (
    isNaN(diametro) ||
    isNaN(ramosAtuais) ||
    isNaN(altura) ||
    diametro <= 0 ||
    ramosAtuais < 0 ||
    altura <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const ramosIdeaisPorMetro = 8;
  const ramosIdeaisTotal = Math.floor((altura / 100) * ramosIdeaisPorMetro);
  const ajusteDiametro = diametro < 3 ? 0.7 : diametro > 6 ? 1.3 : 1;
  const ramosRecomendados = Math.floor(ramosIdeaisTotal * ajusteDiametro);
  const diferenca = ramosAtuais - ramosRecomendados;

  return `Para um cafeeiro com tronco de ${diametro}cm e altura de ${altura}cm, o ideal é manter ${ramosRecomendados} ramos plagiotrópicos. ${
    diferenca > 0
      ? `Recomenda-se remover ${diferenca} ramos em excesso.`
      : diferenca < 0
      ? `Pode-se manter mais ${Math.abs(diferenca)} ramos se necessário.`
      : "O número atual está adequado."
  }`;
};

export const calcAdubacaoFoliarCafe = (
  areaHa,
  concentracaoSolucao,
  litrosPorHa
) => {
  const area = parseFloat(areaHa);
  const concentracao = parseFloat(concentracaoSolucao);
  const litros = parseFloat(litrosPorHa);

  if (
    isNaN(area) ||
    isNaN(concentracao) ||
    isNaN(litros) ||
    area <= 0 ||
    concentracao <= 0 ||
    litros <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const produtoTotalKg = (area * litros * concentracao) / 100;
  const aguaTotal = area * litros;
  const numeroTanques = Math.ceil(aguaTotal / 2000);

  return `Para aplicação foliar em ${area} hectares, são necessários ${produtoTotalKg.toFixed(
    2
  )} kg de produto e ${aguaTotal} L de água. Serão utilizados aproximadamente ${numeroTanques} tanques de 2000L.`;
};

export const calcBienalidade = (producaoAno1, producaoAno2, producaoAno3) => {
  const ano1 = parseFloat(producaoAno1);
  const ano2 = parseFloat(producaoAno2);
  const ano3 = parseFloat(producaoAno3);

  if (
    isNaN(ano1) ||
    isNaN(ano2) ||
    isNaN(ano3) ||
    ano1 < 0 ||
    ano2 < 0 ||
    ano3 < 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const mediaProducao = (ano1 + ano2 + ano3) / 3;
  const coeficienteVariacao =
    (Math.sqrt(
      ((ano1 - mediaProducao) ** 2 +
        (ano2 - mediaProducao) ** 2 +
        (ano3 - mediaProducao) ** 2) /
        3
    ) /
      mediaProducao) *
    100;

  let intensidade = "";
  if (coeficienteVariacao < 15)
    intensidade = "baixa bienalidade - produção estável";
  else if (coeficienteVariacao < 30) intensidade = "moderada bienalidade";
  else intensidade = "alta bienalidade - produção instável";

  return `O coeficiente de variação é de ${coeficienteVariacao.toFixed(
    1
  )}%, indicando ${intensidade}. A produção média dos três anos foi de ${mediaProducao.toFixed(
    2
  )} sacas por hectare.`;
};

// Seção: Colheita
export const calcPontoColheita = (
  frutosVerdes,
  frutosCerejas,
  frutosPassos
) => {
  const verdes = parseFloat(frutosVerdes);
  const cerejas = parseFloat(frutosCerejas);
  const passos = parseFloat(frutosPassos);

  if (
    isNaN(verdes) ||
    isNaN(cerejas) ||
    isNaN(passos) ||
    verdes < 0 ||
    cerejas < 0 ||
    passos < 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const total = verdes + cerejas + passos;
  const percentCerejas = (cerejas / total) * 100;
  const percentPassos = (passos / total) * 100;
  const percentVerdes = (verdes / total) * 100;

  let status = "";
  let qualidade = "";

  if (percentCerejas >= 70) {
    status = "Ponto ideal de colheita";
    qualidade = "Café especial";
  } else if (percentCerejas >= 50) {
    status = "Ponto bom para colheita";
    qualidade = "Café superior";
  } else if (percentPassos > 30) {
    status = "Colheita atrasada";
    qualidade = "Qualidade comprometida";
  } else {
    status = "Aguardar mais maturação";
    qualidade = "Ainda não ideal";
  }

  return `A análise dos frutos mostra: ${percentCerejas.toFixed(
    1
  )}% cerejas, ${percentVerdes.toFixed(1)}% verdes e ${percentPassos.toFixed(
    1
  )}% passos. ${status} para produção de ${qualidade.toLowerCase()}.`;
};

export const calcRendimentoColheita = (
  cafeColhidoKg,
  tempoHoras,
  numColhedores,
  metodoColheita
) => {
  const colhido = parseFloat(cafeColhidoKg);
  const tempo = parseFloat(tempoHoras);
  const colhedores = parseFloat(numColhedores);
  const metodo = parseInt(metodoColheita);

  if (
    isNaN(colhido) ||
    isNaN(tempo) ||
    isNaN(colhedores) ||
    colhido <= 0 ||
    tempo <= 0 ||
    colhedores <= 0 ||
    (metodo !== 1 && metodo !== 2)
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const rendimentoHoraPessoa = colhido / (tempo * colhedores);
  const rendimentoDiaPessoa = rendimentoHoraPessoa * 8;
  const sacasDia = rendimentoDiaPessoa / 60;

  let benchmarkMetodo = "";
  if (metodo === 1) {
    benchmarkMetodo = "Benchmark derriça: 200-400 kg/dia/pessoa";
  } else if (metodo === 2) {
    benchmarkMetodo = "Benchmark catação: 80-150 kg/dia/pessoa";
  }

  return `O rendimento de colheita é de ${rendimentoDiaPessoa.toFixed(
    2
  )} kg por dia por pessoa ou ${sacasDia.toFixed(
    2
  )} sacas por dia por pessoa. ${benchmarkMetodo}.`;
};

export const calcSecagemCafe = (
  umidadeInicial,
  umidadeFinal,
  pesoCafeUmido
) => {
  const umidadeIni = parseFloat(umidadeInicial);
  const umidadeFin = parseFloat(umidadeFinal);
  const pesoUmido = parseFloat(pesoCafeUmido);

  if (
    isNaN(umidadeIni) ||
    isNaN(umidadeFin) ||
    isNaN(pesoUmido) ||
    umidadeIni <= umidadeFin ||
    umidadeIni > 70 ||
    umidadeFin < 10 ||
    pesoUmido <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const pesoSeco = pesoUmido * ((100 - umidadeIni) / (100 - umidadeFin));
  const perdaAgua = pesoUmido - pesoSeco;
  const diasSecagem = Math.ceil((umidadeIni - umidadeFin) / 2);

  return `Após a secagem de ${umidadeIni}% para ${umidadeFin}% de umidade, o peso final será de ${pesoSeco.toFixed(
    2
  )} kg. Perda de água: ${perdaAgua.toFixed(
    2
  )} kg. Tempo estimado de secagem: ${diasSecagem} dias.`;
};

export const calcClassificacaoPeneira = (
  peneira19,
  peneira18,
  peneira17,
  peneira16,
  peneira15,
  fundo
) => {
  const p19 = parseFloat(peneira19) || 0;
  const p18 = parseFloat(peneira18) || 0;
  const p17 = parseFloat(peneira17) || 0;
  const p16 = parseFloat(peneira16) || 0;
  const p15 = parseFloat(peneira15) || 0;
  const fundos = parseFloat(fundo) || 0;

  const total = p19 + p18 + p17 + p16 + p15 + fundos;

  if (total <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const graosGrandes = p19 + p18 + p17;
  const graosMedios = p16 + p15;
  const percentualGrandes = (graosGrandes / total) * 100;
  const percentualMedios = (graosMedios / total) * 100;
  const percentualPequenos = (fundos / total) * 100;

  let classificacao = "";
  if (percentualGrandes >= 70) classificacao = "Café Premium - grãos grandes";
  else if (percentualGrandes >= 50)
    classificacao = "Café Superior - grãos médios/grandes";
  else if (percentualMedios >= 60) classificacao = "Café Bom - grãos médios";
  else classificacao = "Café Regular - grãos pequenos";

  return `A classificação por peneiras mostra: ${percentualGrandes.toFixed(
    1
  )}% grãos grandes (peneiras 17-19), ${percentualMedios.toFixed(
    1
  )}% grãos médios (peneiras 15-16) e ${percentualPequenos.toFixed(
    1
  )}% grãos pequenos. Classificação: ${classificacao}.`;
};

// ========================================
// CANA-DE-AÇÚCAR
// ========================================

export const calcATR = (pol, pureza, fibra) => {
  const polCana = parseFloat(pol);
  const purezaCaldo = parseFloat(pureza);
  const fibraCana = parseFloat(fibra);

  if (
    isNaN(polCana) ||
    isNaN(purezaCaldo) ||
    isNaN(fibraCana) ||
    polCana <= 0 ||
    purezaCaldo <= 0 ||
    fibraCana < 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const atr = (polCana * 10 * (purezaCaldo - 40) * 1.25) / 100;
  let qualidade = "";
  if (atr >= 160) qualidade = "Excelente qualidade";
  else if (atr >= 140) qualidade = "Boa qualidade";
  else if (atr >= 120) qualidade = "Qualidade regular";
  else qualidade = "Baixa qualidade";

  return `O ATR (Açúcar Total Recuperável) é de ${atr.toFixed(
    2
  )} kg/t. ${qualidade}.`;
};

export const calcRendimentoCana = (toneladas, atr, precoATR) => {
  const peso = parseFloat(toneladas);
  const acucar = parseFloat(atr);
  const preco = parseFloat(precoATR);

  if (
    isNaN(peso) ||
    isNaN(acucar) ||
    isNaN(preco) ||
    peso <= 0 ||
    acucar <= 0 ||
    preco <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const acucarTotal = (peso * acucar) / 1000;
  const receita = acucarTotal * preco;
  return `Rendimento: ${acucarTotal.toFixed(
    2
  )} toneladas de açúcar. Receita estimada: R$ ${receita.toFixed(2)}.`;
};

export const calcBrotacaoSoqueira = (
  perfilhosContados,
  metrosAvaliados,
  espacamento
) => {
  const perfilhos = parseFloat(perfilhosContados);
  const metros = parseFloat(metrosAvaliados);
  const espac = parseFloat(espacamento);

  if (
    isNaN(perfilhos) ||
    isNaN(metros) ||
    isNaN(espac) ||
    perfilhos < 0 ||
    metros <= 0 ||
    espac <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const perfilhosMetro = perfilhos / metros;
  const perfilhosHa = (perfilhosMetro * 10000) / espac;

  let qualidade = "";
  if (perfilhosHa >= 120000) qualidade = "Excelente brotação";
  else if (perfilhosHa >= 100000) qualidade = "Boa brotação";
  else if (perfilhosHa >= 80000) qualidade = "Brotação regular";
  else qualidade = "Brotação deficiente";

  return `Brotação da soqueira: ${perfilhosMetro.toFixed(
    1
  )} perfilhos/metro ou ${perfilhosHa.toFixed(0)} perfilhos/ha. ${qualidade}.`;
};

// ========================================
// CITROS
// ========================================

export const calcDensidadeCitros = (
  espacFileiras,
  espacPlantas,
  sistemaPlantio
) => {
  const fileiras = parseFloat(espacFileiras);
  const plantas = parseFloat(espacPlantas);
  const sistema = parseInt(sistemaPlantio);

  if (
    isNaN(fileiras) ||
    isNaN(plantas) ||
    fileiras <= 0 ||
    plantas <= 0 ||
    isNaN(sistema) ||
    (sistema !== 1 && sistema !== 2)
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const tipoPlantio = {
    1: "adensado",
    2: "tradicional",
  };

  const sistemaPlantioString = tipoPlantio[sistema];

  const densidade = 10000 / (fileiras * plantas);
  let recomendacao = "";

  if (sistemaPlantioString === "adensado" && densidade > 500) {
    recomendacao = "Plantio muito adensado";
  } else if (sistemaPlantioString === "tradicional" && densidade < 200) {
    recomendacao = "Plantio tradicional espaçado";
  } else {
    recomendacao = "Densidade adequada para o sistema";
  }

  return `Densidade de plantio para citros: ${densidade.toFixed(
    0
  )} plantas/ha. ${recomendacao}.`;
};

export const calcProducaoCitros = (
  plantasPorHa,
  producaoPlanta,
  idadePomar
) => {
  const plantas = parseFloat(plantasPorHa);
  const producao = parseFloat(producaoPlanta);
  const idade = parseFloat(idadePomar);

  if (
    isNaN(plantas) ||
    isNaN(producao) ||
    isNaN(idade) ||
    plantas <= 0 ||
    producao <= 0 ||
    idade <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  let fatorIdade = 1;
  if (idade < 3) fatorIdade = 0.2;
  else if (idade < 5) fatorIdade = 0.5;
  else if (idade < 8) fatorIdade = 0.8;
  else if (idade > 20) fatorIdade = 0.9;

  const producaoTotal = plantas * producao * fatorIdade;
  const caixas = producaoTotal / 27; // 27 kg por caixa

  return `Produção estimada: ${producaoTotal.toFixed(
    0
  )} kg/ha ou ${caixas.toFixed(0)} caixas/ha para pomar de ${idade} anos.`;
};

// ========================================
// PASTAGENS
// ========================================

export const calcTaxaLotacao = (pesoPasto, consumoDiario, areaHa) => {
  const peso = parseFloat(pesoPasto);
  const consumo = parseFloat(consumoDiario);
  const area = parseFloat(areaHa);

  if (
    isNaN(peso) ||
    isNaN(consumo) ||
    isNaN(area) ||
    peso <= 0 ||
    consumo <= 0 ||
    area <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const capacidade = (peso * 0.03) / consumo; // 3% do peso vivo em consumo
  const lotacaoHa = capacidade / area;
  const ua = lotacaoHa / 450; // 450kg = 1 UA

  return `Capacidade de suporte: ${lotacaoHa.toFixed(
    2
  )} animais/ha ou ${ua.toFixed(2)} UA/ha.`;
};

export const calcProducaoMS = (pesoPasto, percentMS) => {
  const peso = parseFloat(pesoPasto);
  const ms = parseFloat(percentMS);

  if (isNaN(peso) || isNaN(ms) || peso <= 0 || ms <= 0 || ms > 100) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const materiaSecaKg = (peso * ms) / 100;
  const materiaSecaTon = materiaSecaKg / 1000;

  return `Produção de matéria seca: ${materiaSecaKg.toFixed(
    0
  )} kg/ha ou ${materiaSecaTon.toFixed(2)} toneladas/ha.`;
};

// ========================================
// SILVICULTURA
// ========================================

export const calcVolumeEucalipto = (dap, altura, fatorForma) => {
  const diametro = parseFloat(dap);
  const h = parseFloat(altura);
  const ff = parseFloat(fatorForma) || 0.45;

  if (isNaN(diametro) || isNaN(h) || diametro <= 0 || h <= 0 || ff <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const area = (Math.PI * Math.pow(diametro / 2, 2)) / 10000;
  const volume = area * h * ff;

  return `Volume individual da árvore: ${volume.toFixed(
    4
  )} m³. DAP: ${diametro}cm, Altura: ${h}m.`;
};

export const calcCrescimentoDAP = (dapInicial, dapFinal, tempoAnos) => {
  const inicial = parseFloat(dapInicial);
  const final = parseFloat(dapFinal);
  const tempo = parseFloat(tempoAnos);

  if (
    isNaN(inicial) ||
    isNaN(final) ||
    isNaN(tempo) ||
    inicial <= 0 ||
    final <= inicial ||
    tempo <= 0
  ) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const crescimento = (final - inicial) / tempo;
  let ritmo = "";
  if (crescimento >= 2) ritmo = "Crescimento rápido";
  else if (crescimento >= 1.5) ritmo = "Crescimento médio";
  else ritmo = "Crescimento lento";

  return `Incremento diamétrico: ${crescimento.toFixed(
    2
  )} cm/ano. ${ritmo} para eucalipto.`;
};

export const calcRendimentoVolumetrico = (volumePorHa, idadeAnos) => {
  const volume = parseFloat(volumePorHa);
  const idade = parseFloat(idadeAnos);

  if (isNaN(volume) || isNaN(idade) || volume <= 0 || idade <= 0) {
    return `Por favor, insira valores válidos para o cálculo.`;
  }

  const ima = volume / idade;
  let produtividade = "";
  if (ima >= 45) produtividade = "Alta produtividade";
  else if (ima >= 30) produtividade = "Média produtividade";
  else produtividade = "Baixa produtividade";

  return `Incremento Médio Anual: ${ima.toFixed(
    1
  )} m³/ha/ano aos ${idade} anos. ${produtividade}.`;
};

// Divisão de Seções

export const CULTIVOS_GERAIS = {
  Semeadura: [
    {
      id: "PPH",
      label: "População de Plantas por Hectare",
      func: calcPPH,
      inputs: [
        "Espaçamento entre plantas (cm)",
        "Espaçamento entre linhas (cm)",
      ],
    },
    {
      id: "Dsem",
      label: "Densidade de Semeadura",
      func: calcDSem,
      inputs: [
        "Peso de sementes a semear (kg)",
        "Peso de 1000 sementes (g)",
        "Área a semear (ha)",
      ],
    },
    {
      id: "VelSem",
      label: "Velocidade Ideal de Semeadura",
      func: calcVelSem,
      inputs: [
        "Área a semear (ha)",
        "Tempo disponível (h)",
        "Largura da barra (m)",
      ],
    },
  ],
  Cultivo: [
    {
      id: "IAF",
      label: "Índice de Área Foliar (IAF)",
      func: calcIAF,
      inputs: ["Área foliar (m²)", "Área ocupada (m²)"],
    },
    {
      id: "APH",
      label: "Adubação por Hectare",
      func: calcAPH,
      inputs: ["Nutriente necessário (kg)", "Concentração do fertilizante (%)"],
    },
    {
      id: "EUF",
      label: "Eficiência do Uso de Fertilizantes",
      func: calcEUF,
      inputs: [
        "Produção com adubo (kg/ha)",
        "Produção sem adubo (kg/ha)",
        "Adubo aplicado (kg/ha)",
      ],
    },
    {
      id: "CTC",
      label: "Capacidade de Troca Catiônica (CTC)",
      func: calcCTC,
      inputs: [
        "Cálcio (Ca²⁺) - cmolc/dm³",
        "Magnésio (Mg²⁺) - cmolc/dm³",
        "Potássio (K⁺) - cmolc/dm³",
        "Alumínio (Al³⁺) - cmolc/dm³",
        "Hidrogênio (H⁺) - cmolc/dm³",
      ],
    },
    {
      id: "SaturacaoBases",
      label: "Saturação por Bases",
      func: calcSaturacaoBases,
      inputs: [
        "Cálcio (Ca²⁺) - cmolc/dm³",
        "Magnésio (Mg²⁺) - cmolc/dm³",
        "Potássio (K⁺) - cmolc/dm³",
        "CTC (Capacidade de Troca Catiônica) - cmolc/dm³",
      ],
    },
    {
      id: "NecessidadeCalcario",
      label: "Necessidade de Calcário",
      func: calcNecessidadeCalcario,
      inputs: [
        "Saturação atual de bases (V%)",
        "Saturação desejada de bases (V%)",
        "CTC (Capacidade de Troca Catiônica) - cmolc/dm³",
        "PRNT do calcário (%)",
      ],
    },
    {
      id: "ETo",
      label: "Evapotranspiração Diária",
      func: calcETo,
      inputs: [
        "Temperatura máxima (°C)",
        "Temperatura mínima (°C)",
        "Umidade relativa (%)",
        "Velocidade do vento (m/s)",
        "Horas de sol por dia [0-14](h)",
      ],
    },
    {
      id: "PrecipEfe",
      label: "Precipitação Efetiva",
      func: calcPrecipEfetiva,
      inputs: [
        "Precipitação total (mm)",
        "Tipo de solo(1- Arenoso | 2- Médio | 3-Argiloso)",
      ],
    },
    {
      id: "NIrrig",
      label: "Necessidade de Irrigação",
      func: calcNIrrig,
      inputs: ["Evapotranspiração (mm/dia)", "Precipitação efetiva (mm/dia)"],
    },
    {
      id: "VAI",
      label: "Volume de Água para Irrigação",
      func: calcVAI,
      inputs: ["Necessidade de irrigação (mm/dia)"],
    },
    {
      id: "EUA",
      label: "Eficiência do Uso de Água",
      func: calcEUA,
      inputs: ["Produção (kg/ha)", "Lâmina de irrigação (mm)"],
    },
  ],
  Colheita: [
    {
      id: "Prod",
      label: "Produção Total",
      func: calcProd,
      inputs: ["Produtividade (kg/ha)", "Área de colheita (ha)"],
    },
    {
      id: "Perdas",
      label: "Perdas na Colheita",
      func: calcPerdas,
      inputs: ["Grãos no solo (kg)", "Rendimento esperado (kg)"],
    },
  ],
};

export const CULTURAS_ANUAIS = {
  Semeadura: [
    {
      id: "QSH",
      label: "Quantidade de Semente por Hectare",
      func: calcQSH,
      inputs: [
        "População ideal (plantas/ha)",
        "Peso da semente (g)",
        "Taxa de germinação (%)",
        "Taxa de pureza (%)",
      ],
    },
    {
      id: "CDS",
      label: "Dose Corrigida de Semente",
      func: calcCDS,
      inputs: ["Dose desejada (kg/ha)", "Germinação (%)", "Pureza (%)"],
    },
    {
      id: "VSem",
      label: "Volume de Semente por Hectare",
      func: calcVSem,
      inputs: ["Massa total de sementes (kg)", "Densidade da semente (kg/L)"],
    },
  ],
  Cultivo: [
    {
      id: "RIouC",
      label: "Rendimento Industrial(Comercial)",
      func: calcRIouC,
      inputs: ["Peso líquido (kg)", "Peso bruto (kg)"],
    },
    {
      id: "Stand",
      label: "Stand Atual",
      func: calcStand,
      inputs: [
        "Plantas contadas (unid)",
        "Metros Lineares (m)",
        "Espaçamentro entre linhas (m)",
      ],
    },
  ],
  Colheita: [
    {
      id: "GrausUmidade",
      label: "Grau de Umidade dos Grãos",
      func: calcGrausUmidade,
      inputs: ["Peso úmido (kg)", "Peso seco (kg)"],
    },
  ],
};

export const CAFEICULTURA = {
  Semeadura: [
    {
      id: "MudasCafe",
      label: "Número de Mudas Necessárias",
      func: calcMudasCafe,
      inputs: [
        "Espaçamento entre fileiras (m)",
        "Espaçamento entre plantas (m)",
        "Área (ha)",
        "Percentual de reserva (%)",
      ],
    },
    {
      id: "SementeiraCafe",
      label: "Produção de Sementes para Mudas",
      func: calcSementeiraCafe,
      inputs: [
        "Número de mudas desejadas (unid)",
        "Percentual de germinação (%)",
        "Peso de 1000 sementes (g)",
      ],
    },
    {
      id: "ViveiroCafe",
      label: "Área do Viveiro",
      func: calcViveiroCafe,
      inputs: [
        "Número de mudas (unid)",
        "Mudas por metro (unid)",
        "Percentual de mortalidade (%)",
      ],
    },
  ],
  Cultivo: [
    {
      id: "PodaCafe",
      label: "Poda do Cafeeiro",
      func: calcPodaCafe,
      inputs: [
        "Altura da planta (m)",
        "Altura do corte (m)",
        "Tipo de corte (1-Recepa | 2-Decote | 3-Comum)",
      ],
    },
    {
      id: "EsqueletamentoCafe",
      label: "Esqueletamento de Ramos",
      func: calcEsqueletamentoCafe,
      inputs: [
        "Diâmetro do tronco (cm)",
        "Número de ramos atuais (unid)",
        "Altura da planta (cm)",
      ],
    },
    {
      id: "AFC",
      label: "Adubação Foliar do Café",
      func: calcAdubacaoFoliarCafe,
      inputs: [
        "Área (ha)",
        "Concentração da solução (%)",
        "Litros por hectare (L/ha)",
      ],
    },
    {
      id: "Bienalidade",
      label: "Intensidade de Bienalidade",
      func: calcBienalidade,
      inputs: [
        "Produção ano 1 (sacas/ha)",
        "Produção ano 2 (sacas/ha)",
        "Produção ano 3 (sacas/ha)",
      ],
    },
  ],
  Colheita: [
    {
      id: "PontoColheita",
      label: "Análise Ponto de Colheita",
      func: calcPontoColheita,
      inputs: [
        "Frutos verdes (unid/planta)",
        "Frutos cerejas (unid/planta)",
        "Frutos passos (unid/planta)",
      ],
    },
    {
      id: "RendimentoColheita",
      label: "Rendimento De Colheita por Pessoa",
      func: calcRendimentoColheita,
      inputs: [
        "Café colhido (kg)",
        "Tempo (h)",
        "Número de colhedores",
        "Método de colheita (1-Derriça || 2-Catação)",
      ],
    },
    {
      id: "SecagemCafe",
      label: "Secagem de Café",
      func: calcSecagemCafe,
      inputs: [
        "Umidade inicial (%)",
        "Umidade final (%)",
        "Peso do café úmido (kg)",
      ],
    },
    {
      id: "ClassificacaoPeneira",
      label: "Classificação por Peneiras",
      func: calcClassificacaoPeneira,
      inputs: [
        "Peneira 19 (grãos)",
        "Peneira 18 (grãos)",
        "Peneira 17 (grãos)",
        "Peneira 16 (grãos)",
        "Peneira 15 (grãos)",
        "Fundo (grãos)",
      ],
    },
  ],
};

export const CANA_DE_ACUCAR = {
  Geral: [
    {
      id: "ATR",
      label: "Açúcar Total Recuperável (ATR)",
      func: calcATR,
      inputs: ["Pol da cana (%)", "Pureza do caldo (%)", "Fibra da cana (%)"],
    },
    {
      id: "RendimentoCana",
      label: "Rendimento e Receita",
      func: calcRendimentoCana,
      inputs: ["Produção de cana (t)", "ATR (kg/t)", "Preço do ATR (R$/kg)"],
    },
    {
      id: "BrotacaoSoqueira",
      label: "Brotação da Soqueira",
      func: calcBrotacaoSoqueira,
      inputs: [
        "Perfilhos contados (unid)",
        "Metros avaliados (m)",
        "Espaçamento entre linhas (m)",
      ],
    },
  ],
};

export const CITROS = {
  Geral: [
    {
      id: "DensidadeCitros",
      label: "Densidade de Plantio de Citros",
      func: calcDensidadeCitros,
      inputs: [
        "Espaçamento entre fileiras (m)",
        "Espaçamento entre plantas (m)",
        "Sistema de plantio (1-Tradicional | 2-Adensado)",
      ],
    },
    {
      id: "ProducaoCitros",
      label: "Produção Estimada de Citros",
      func: calcProducaoCitros,
      inputs: [
        "Plantas por hectare (un/ha)",
        "Produção média por planta (kg)",
        "Idade do pomar (anos)",
      ],
    },
  ],
};

export const SILVICULTURA = {
  Geral: [
    {
      id: "VolumeEucalipto",
      label: "Volume Individual de Eucalipto",
      func: calcVolumeEucalipto,
      inputs: ["DAP (cm)", "Altura (m)", "Fator de forma (0,45 padrão)"],
    },
    {
      id: "CrescimentoDAP",
      label: "Incremento Diamétrico Anual (IDA)",
      func: calcCrescimentoDAP,
      inputs: ["DAP inicial (cm)", "DAP final (cm)", "Tempo (anos)"],
    },
    {
      id: "RendimentoVolumetrico",
      label: "Incremento Médio Anual (IMA)",
      func: calcRendimentoVolumetrico,
      inputs: ["Volume por hectare (m³)", "Idade do povoamento (anos)"],
    },
  ],
};

export const mapCalculosAgri = () => {
  const all = {};

  const sections = [
    CULTIVOS_GERAIS,
    CULTURAS_ANUAIS,
    CAFEICULTURA,
    CANA_DE_ACUCAR,
    CITROS,
    SILVICULTURA,
  ];

  sections.forEach((section) => {
    Object.values(section).forEach((arrOrObj) => {
      if (Array.isArray(arrOrObj)) {
        arrOrObj.forEach((calc) => {
          all[calc.id] = calc;
        });
      } else if (typeof arrOrObj === "object") {
        Object.values(arrOrObj).forEach((innerArr) => {
          innerArr.forEach((calc) => {
            all[calc.id] = calc;
          });
        });
      }
    });
  });

  return all;
};
