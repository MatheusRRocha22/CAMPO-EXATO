import express from "express";
import fetch from "node-fetch";

const router = express.Router();

const CACHE_TIME = 30 * 60 * 1000;
const cache = {};

function normalize(text = "") {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegex(str = "") {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const BASE_QUERY =
  "agropecuária OR agricultura OR pecuária OR gado leiteiro OR soja OR milho OR café";

const VALID_TERMS = [
  // 🌱 Setores principais
  "agropecuária",
  "agricultura",
  "pecuária",
  "gado",
  "gado leiteiro",
  "leite",
  "gado de corte",
  "frango",
  "suínos",
  "avicultura",
  "hortifrúti",
  "floricultura",
  "silvicultura",
  "piscicultura",
  "apicultura",
  "ovinos",
  "caprinos",
  "camarão",
  "carne bovina",
  "carne suína",
  "carne de frango",
  "laticínios",

  // 🌾 Produtos agrícolas
  "soja",
  "milho",
  "café",
  "arroz",
  "feijão",
  "trigo",
  "algodão",
  "cana-de-açúcar",
  "frutas",
  "vegetais",
  "citrus",
  "laranja",
  "limão",
  "banana",
  "manga",
  "uva",
  "abacaxi",
  "tomate",
  "batata",
  "cenoura",
  "mandioca",
  "milho verde",
  "milho safrinha",
  "amendoim",
  "caju",
  "goiaba",
  "abóbora",
  "pepino",
  "ervilha",

  // 🌾 Insumos e técnicas
  "fertilizante",
  "adubo",
  "defensivo",
  "agrotóxico",
  "sementes",
  "irrigação",
  "poda",
  "colheita",
  "plantio",
  "rotação de culturas",
  "biotecnologia",
  "maquinário agrícola",
  "tratores",
  "colheitadeiras",
  "implementos agrícolas",
  "drones agrícolas",
  "sensoriamento remoto",
  "controle biológico",
  "agricultura de precisão",
  "plantio direto",
  "adubação",
  "compostagem",

  // 💰 Economia e mercado
  "preço da soja",
  "preço do milho",
  "exportação agrícola",
  "importação agrícola",
  "commodity",
  "agronegócio",
  "produção agrícola",
  "custo de produção",
  "bolsa de valores agrícola",
  "previsão de safra",
  "demanda agrícola",
  "safra",
  "estoque agrícola",
  "negócios rurais",
  "mercado agrícola",
  "cotação agrícola",

  // 🏛️ Políticas e legislação
  "política agrícola",
  "subsídios agrícolas",
  "incentivo rural",
  "crédito rural",
  "empréstimo rural",
  "agroindústria",
  "sustentabilidade agrícola",
  "certificação orgânica",
  "legislação agrícola",
  "regulamentação agrícola",
  "reforma agrária",
  "seguro rural",
  "zoneamento agrícola",
  "programas do governo rural",

  // 💻 Tecnologia e inovação
  "agrotecnologia",
  "precision farming",
  "agricultura digital",
  "smart farming",
  "internet das coisas agrícola",
  "IoT agrícola",
  "gestão agrícola",
  "software agrícola",
  "sensor agrícola",
  "monitoramento remoto",
  "big data agrícola",
  "inteligência artificial agrícola",
  "robotização agrícola",

  // 🌍 Sustentabilidade e meio ambiente
  "agroecologia",
  "orgânico",
  "produção sustentável",
  "conservação do solo",
  "recuperação de pastagem",
  "manejo florestal",
  "agrofloresta",
  "proteção ambiental",
  "redução de emissões",
  "carbono neutro agrícola",
  "biomassa",
  "energia renovável rural",

  // 🔬 Pesquisa e desenvolvimento
  "engenharia agrícola",
  "genética vegetal",
  "melhoramento genético",
  "pesquisa agrícola",
  "extensão rural",
  "ensaios de campo",
  "laboratório agrícola",
];

const NORMALIZED_VALID_TERMS = VALID_TERMS.map((t) => normalize(t));

router.get("/", async (req, res) => {
  try {
    const SERPAPI_KEY = process.env.SERPAPI_KEY;
    if (!SERPAPI_KEY) {
      return res.status(500).json({ error: "SERPAPI_KEY não definida!" });
    }

    const debug = req.query.debug === "1";

    const rawQuery = req.query.q ? String(req.query.q).trim() : null;
    const safeRawQuery = rawQuery ? rawQuery.replace(/"/g, "").trim() : null;
    const userQueryNormalized = safeRawQuery ? normalize(safeRawQuery) : null;

    const userUF = req.query.uf ? `AND (${req.query.uf})` : "";

    const isUserTermValid =
      !!userQueryNormalized &&
      NORMALIZED_VALID_TERMS.some((kw) => kw.includes(userQueryNormalized));

    let finalQuery;
    if (isUserTermValid) {
      const qTerm = safeRawQuery;
      finalQuery = `(intitle:"${qTerm}" OR intext:"${qTerm}") AND (${BASE_QUERY}) ${userUF} Brasil`;
    } else {
      finalQuery = `${BASE_QUERY} ${userUF} Brasil`;
    }

    if (
      cache[finalQuery] &&
      Date.now() - cache[finalQuery].timestamp < CACHE_TIME
    ) {
      if (debug) console.log("[cache hit] query:", finalQuery);
      return res.json(cache[finalQuery].data);
    }

    const url = `https://serpapi.com/search.json?engine=google_news&q=${encodeURIComponent(
      finalQuery
    )}&hl=pt&gl=br&api_key=${SERPAPI_KEY}`;

    if (debug) console.log("Buscando notícias SerpApi:", url);

    const response = await fetch(url);
    const data = await response.json();

    let articles = (data.news_results || []).map((item) => ({
      title: item.title || "",
      snippet: item.snippet || "",
      link: item.link,
      thumbnail: item.thumbnail || null,
      source: item.source_name || "SerpApi",
      publishedAt: item.date || null,
      // para debug: mantemos raw item
      _raw: item,
    }));

    articles = articles.filter((item) => {
      const txt = normalize(`${item.title} ${item.snippet}`);

      const temTermoValido = NORMALIZED_VALID_TERMS.some((kw) =>
        txt.includes(kw)
      );

      const temTermoUsuario = isUserTermValid
        ? txt.includes(userQueryNormalized)
        : true;

      return temTermoValido && temTermoUsuario;
    });

    if (debug) {
      console.log(">>> Debug: primeiros 10 artigos após filtro:");
      articles.slice(0, 10).forEach((a, i) => {
        const txt = normalize(`${a.title} ${a.snippet}`);
        const hasUser = userQueryNormalized
          ? new RegExp("\\b" + escapeRegex(userQueryNormalized) + "\\b").test(
              txt
            )
          : false;
        const matchedValid = NORMALIZED_VALID_TERMS.filter((kw) =>
          txt.includes(kw)
        );
        console.log(
          `#${i + 1} — title: ${a.title}\n  source: ${
            a.source
          }\n  hasUserTerm:${hasUser} matchedValid:[${matchedValid.join(
            ", "
          )}]\n  link: ${a.link}\n`
        );
      });
      console.log(">>> total após filtro:", articles.length);
      console.log(">>> total raw results:", (data.news_results || []).length);
    }

    const resultToCache = articles.map(({ _raw, ...keep }) => keep);
    cache[finalQuery] = { data: resultToCache, timestamp: Date.now() };

    res.json(resultToCache);
  } catch (err) {
    console.error("Erro ao buscar notícias:", err);
    res.status(500).json({ error: "Erro ao buscar notícias" });
  }
});

export default router;
