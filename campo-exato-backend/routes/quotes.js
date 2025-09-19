import express from "express";
import fetch from "node-fetch";
import Papa from "papaparse";
import fs from "fs";
import path from "path";

const router = express.Router();
const FALLBACKS_FILE = path.join("data", "fallbacks.json");
const FALLBACKS = JSON.parse(fs.readFileSync(FALLBACKS_FILE, "utf-8"));

const COMMODITIES_LIST = [
  // 🌾 Agricultura
  {
    code: "WHEAT",
    label: "Trigo",
    category: "agricultura",
    url: "https://www.conab.gov.br/info-agro/precos-agropecuarios/trigo.csv",
    unit: "R$/sc 60kg",
  },
  {
    code: "CORN",
    label: "Milho",
    category: "agricultura",
    url: "https://www.conab.gov.br/info-agro/precos-agropecuarios/milho.csv",
    unit: "R$/sc 60kg",
  },
  {
    code: "SOYBEANS",
    label: "Soja",
    category: "agricultura",
    url: "https://www.conab.gov.br/info-agro/precos-agropecuarios/soja.csv",
    unit: "R$/sc 60kg",
  },
  {
    code: "RICE",
    label: "Arroz",
    category: "agricultura",
    url: "https://www.cepea.esalq.usp.br/br/indicadores/arroz.csv",
    unit: "R$/sc 50kg",
  },
  {
    code: "COFFEE",
    label: "Café",
    category: "agricultura",
    url: "https://www.cepea.esalq.usp.br/br/indicadores/cafe.csv",
    unit: "R$/sc 60kg",
  },
  {
    code: "SUGAR",
    label: "Açúcar",
    category: "agricultura",
    url: "https://www.cepea.esalq.usp.br/br/indicadores/acucar.csv",
    unit: "R$/sc 50kg",
  },
  {
    code: "COTTON",
    label: "Algodão",
    category: "agricultura",
    url: null,
    unit: "R$/@",
  },
  {
    code: "COCOA",
    label: "Cacau",
    category: "agricultura",
    url: null,
    unit: "R$/arroba",
  },
  {
    code: "BARLEY",
    label: "Cevada",
    category: "agricultura",
    url: null,
    unit: "R$/sc 60kg",
  },
  {
    code: "OATS",
    label: "Aveia",
    category: "agricultura",
    url: null,
    unit: "R$/sc 60kg",
  },
  {
    code: "MILLET",
    label: "Milhete",
    category: "agricultura",
    url: null,
    unit: "R$/sc 60kg",
  },
  {
    code: "SORGHUM",
    label: "Sorgo",
    category: "agricultura",
    url: null,
    unit: "R$/sc 60kg",
  },
  {
    code: "PEANUT",
    label: "Amendoim",
    category: "agricultura",
    url: null,
    unit: "R$/sc 25kg",
  },

  // 🐄 Pecuária
  {
    code: "CATTLE",
    label: "Boi Gordo",
    category: "pecuaria",
    url: "https://www.cepea.esalq.usp.br/br/indicadores/boi.csv",
    unit: "R$/@",
  },
  {
    code: "HOGS",
    label: "Suínos",
    category: "pecuaria",
    url: "https://www.cepea.esalq.usp.br/br/indicadores/suinos.csv",
    unit: "R$/kg vivo",
  },
  {
    code: "MILK",
    label: "Leite",
    category: "pecuaria",
    url: "https://www.cepea.esalq.usp.br/br/indicadores/leite.csv",
    unit: "R$/litro",
  },
  {
    code: "CHICKEN",
    label: "Frango",
    category: "pecuaria",
    url: null,
    unit: "R$/kg vivo",
  },
  {
    code: "EGG",
    label: "Ovos",
    category: "pecuaria",
    url: null,
    unit: "R$/cx 30 dz",
  },
  {
    code: "LAMB",
    label: "Carne de Cordeiro",
    category: "pecuaria",
    url: null,
    unit: "R$/kg carcaça",
  },
  {
    code: "GOAT",
    label: "Carne de Cabra",
    category: "pecuaria",
    url: null,
    unit: "R$/kg carcaça",
  },
  {
    code: "TURKEY",
    label: "Peru",
    category: "pecuaria",
    url: null,
    unit: "R$/kg",
  },
  {
    code: "DUCK",
    label: "Pato",
    category: "pecuaria",
    url: null,
    unit: "R$/kg",
  },
  {
    code: "FISH",
    label: "Peixe",
    category: "pecuaria",
    url: null,
    unit: "R$/kg",
  },
  {
    code: "SHRIMP",
    label: "Camarão",
    category: "pecuaria",
    url: null,
    unit: "R$/kg",
  },
  {
    code: "PIGLET",
    label: "Leitão",
    category: "pecuaria",
    url: null,
    unit: "R$/kg vivo",
  },
  {
    code: "BEEF_CUT",
    label: "Cortes de Carne",
    category: "pecuaria",
    url: null,
    unit: "R$/kg",
  },
  {
    code: "CHEESE",
    label: "Queijo",
    category: "pecuaria",
    url: null,
    unit: "R$/kg",
  },
  {
    code: "BUTTER",
    label: "Manteiga",
    category: "pecuaria",
    url: null,
    unit: "R$/kg",
  },

  // 🍊 Hortifruti
  {
    code: "BANANA",
    label: "Banana",
    category: "hortifruti",
    url: null,
    unit: "R$/kg",
  },
  {
    code: "MANGO",
    label: "Manga",
    category: "hortifruti",
    url: null,
    unit: "R$/kg",
  },
  {
    code: "ORANGE",
    label: "Laranja",
    category: "hortifruti",
    url: null,
    unit: "R$/cx 40kg",
  },
  {
    code: "APPLE",
    label: "Maçã",
    category: "hortifruti",
    url: null,
    unit: "R$/kg",
  },
  {
    code: "PEAR",
    label: "Pera",
    category: "hortifruti",
    url: null,
    unit: "R$/kg",
  },
  {
    code: "GRAPE",
    label: "Uva",
    category: "hortifruti",
    url: null,
    unit: "R$/cx 8kg",
  },
  {
    code: "PINEAPPLE",
    label: "Abacaxi",
    category: "hortifruti",
    url: null,
    unit: "R$/unidade",
  },
  {
    code: "WATERMELON",
    label: "Melancia",
    category: "hortifruti",
    url: null,
    unit: "R$/kg",
  },
  {
    code: "MELON",
    label: "Melão",
    category: "hortifruti",
    url: null,
    unit: "R$/kg",
  },
  {
    code: "STRAWBERRY",
    label: "Morango",
    category: "hortifruti",
    url: null,
    unit: "R$/cx 250g",
  },
  {
    code: "TOMATO_HF",
    label: "Tomate HF",
    category: "hortifruti",
    url: null,
    unit: "R$/cx 23kg",
  },
  {
    code: "CARROT",
    label: "Cenoura",
    category: "hortifruti",
    url: null,
    unit: "R$/kg",
  },
  {
    code: "LETTUCE",
    label: "Alface",
    category: "hortifruti",
    url: null,
    unit: "R$/maço",
  },
  {
    code: "ONION_HF",
    label: "Cebola HF",
    category: "hortifruti",
    url: null,
    unit: "R$/sc 20kg",
  },
  {
    code: "GARLIC",
    label: "Alho",
    category: "hortifruti",
    url: null,
    unit: "R$/kg",
  },

  // 💰 Economia
  {
    code: "USD",
    label: "Dólar",
    category: "economia",
    url: null,
    unit: "R$/US$",
  },
  { code: "EUR", label: "Euro", category: "economia", url: null, unit: "R$/€" },
  {
    code: "GBP",
    label: "Libra",
    category: "economia",
    url: null,
    unit: "R$/£",
  },
  { code: "JPY", label: "Iene", category: "economia", url: null, unit: "R$/¥" },
  {
    code: "GOLD",
    label: "Ouro",
    category: "economia",
    url: null,
    unit: "US$/oz troy",
  },
  {
    code: "SILVER",
    label: "Prata",
    category: "economia",
    url: null,
    unit: "US$/oz troy",
  },
  {
    code: "OIL_WTI",
    label: "Petróleo WTI",
    category: "economia",
    url: null,
    unit: "US$/barril",
  },
  {
    code: "OIL_BRENT",
    label: "Petróleo Brent",
    category: "economia",
    url: null,
    unit: "US$/barril",
  },
  {
    code: "NATURAL_GAS",
    label: "Gás Natural",
    category: "economia",
    url: null,
    unit: "US$/MMBtu",
  },
  {
    code: "COPPER",
    label: "Cobre",
    category: "economia",
    url: null,
    unit: "US$/t",
  },
  {
    code: "ALUMINUM",
    label: "Alumínio",
    category: "economia",
    url: null,
    unit: "US$/t",
  },
  {
    code: "COAL",
    label: "Carvão",
    category: "economia",
    url: null,
    unit: "US$/t",
  },
  {
    code: "PLATINUM",
    label: "Platina",
    category: "economia",
    url: null,
    unit: "US$/oz troy",
  },
  {
    code: "PALLADIUM",
    label: "Paládio",
    category: "economia",
    url: null,
    unit: "US$/oz troy",
  },
  {
    code: "BITCOIN",
    label: "Bitcoin",
    category: "economia",
    url: null,
    unit: "US$/BTC",
  },
];

async function fetchCommodityData(commodity) {
  let preco = null;
  let fonte = null;

  try {
    if (commodity.url) {
      const res = await fetch(commodity.url);
      const text = await res.text();
      const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
      const data = parsed.data;
      if (data && data.length > 0) {
        const lastRow = data[data.length - 1];
        const priceCol = Object.keys(lastRow).find((k) =>
          /preco|valor/i.test(k)
        );
        if (priceCol) {
          preco = parseFloat(lastRow[priceCol].replace(",", "."));
          fonte = "API/CSV";
        }
      }
    }

    if (preco === null || isNaN(preco)) {
      preco = (FALLBACKS[commodity.category] || {})[commodity.code] ?? "N/A";
      fonte = "CEPEA";
    }

    return {
      code: commodity.code,
      label: commodity.label,
      preco: typeof preco === "number" ? preco.toFixed(2) : preco,
      unidade: commodity.unit,
      fonte,
      data: new Date().toISOString().split("T")[0],
      category: commodity.category,
    };
  } catch (err) {
    const precoFallback =
      (FALLBACKS[commodity.category] || {})[commodity.code] ?? "N/A";
    return {
      code: commodity.code,
      label: commodity.label,
      preco:
        typeof precoFallback === "number"
          ? precoFallback.toFixed(2)
          : precoFallback,
      unidade: commodity.unit,
      fonte: "CEPEA",
      data: new Date().toISOString().split("T")[0],
      category: commodity.category,
      error: err.message,
    };
  }
}

router.get("/all", async (req, res) => {
  const results = [];
  for (const c of COMMODITIES_LIST) {
    results.push(await fetchCommodityData(c));
  }
  res.json(results);
});

router.get("/category/:categoryName", async (req, res) => {
  const { categoryName } = req.params;
  const results = [];
  for (const c of COMMODITIES_LIST) {
    if (c.category === categoryName) {
      results.push(await fetchCommodityData(c));
    }
  }
  if (results.length === 0)
    return res.status(404).json({ error: "Categoria não encontrada" });
  res.json(results);
});

router.get("/:code", async (req, res) => {
  const code = req.params.code.toUpperCase();
  const commodity = COMMODITIES_LIST.find((c) => c.code === code);
  if (!commodity)
    return res.status(404).json({ error: "Commodity não encontrada" });

  const data = await fetchCommodityData(commodity);
  res.json(data);
});

export default router;
