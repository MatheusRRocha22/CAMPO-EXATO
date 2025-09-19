import Background from "../../components/Background/index";
import Header from "../../components/Header/index";
import Navigation from "../../components/Navigation/index";
import AboutMe from "../../components/AboutMe";
import "./styles.css";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

const fallbackImage = "/fallback-agro.jpg";

const News = () => {
  const { user } = useContext(UserContext);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const cache = {};

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const region = user?.uf || "Brasil";

      const query =
        searchTerm.trim() ||
        "agropecuária OR agricultura OR pecuária OR gado leiteiro OR soja OR milho OR café";

      const cacheKey = `${query}-${region}`;
      if (cache[cacheKey]) {
        setNews(cache[cacheKey]);
        setLoading(false);
        return;
      }

      const res = await fetch(
        `http://localhost:4000/api/news?q=${encodeURIComponent(
          query
        )}&uf=${region}`
      );
      const data = await res.json();

      cache[cacheKey] = data;
      setNews(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao buscar notícias.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [user?.uf]);

  const formatDate = (dateString) => {
    if (!dateString) return "Data não disponível";
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Background />
      <Header />
      <Navigation />

      <div className="news-container">
        <div className="news-header">
          <h2>Notícias</h2>
          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar notícias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchNews();
                }
              }}
            />
            <button onClick={fetchNews}>🔍</button>
          </div>
        </div>

        <p className="news-info">
          {user?.uf
            ? `Notícias de ${user.uf}`
            : "Notícias do 🇧🇷. Faça login para ver notícias da sua região."}
        </p>

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        )}
        {error && <p className="news-message error">{error}</p>}
        {news.length === 0 && !loading && !error && (
          <p className="news-message">📰 Nenhuma notícia encontrada.</p>
        )}

        <div className="news-list">
          {news.map((article, idx) => (
            <div key={idx} className="news-card">
              <img
                src={article.thumbnail || fallbackImage}
                alt={article.title}
              />
              <div className="news-card-content">
                <h3>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.title}
                  </a>
                </h3>
                <p className="snippet">{article.snippet}</p>
                <p className="source">
                  {article.source} • {formatDate(article.publishedAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AboutMe />
    </>
  );
};

export default News;
