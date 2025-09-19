import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import quotesRouter from "./routes/quotes.js";
import newsRouter from "./routes/news.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(process.cwd(), "public")));

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' https://serpapi.com; img-src 'self' data:;"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Servidor do Campo Exato rodando! Use /api/quotes e /api/news.");
});

app.use("/api/quotes", quotesRouter);

app.use("/api/news", newsRouter);

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
