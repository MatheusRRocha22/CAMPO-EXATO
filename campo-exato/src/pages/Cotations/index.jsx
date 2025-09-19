import Background from "../../components/Background/index";
import Header from "../../components/Header/index";
import Navigation from "../../components/Navigation/index";
import AboutMe from "../../components/AboutMe";
import "./stylesCotations.css";
import { useEffect, useState } from "react";

export default function Cotations() {
  const [area, setArea] = useState("agricultura");
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:4000/api/quotes/category/${area}`
        );
        if (!res.ok) {
          throw new Error(`Erro ao buscar cotações: ${res.status}`);
        }
        const data = await res.json();
        setQuotes(data);
      } catch (err) {
        console.log("Erro ao buscar cotações:", err);
        setQuotes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, [area]);

  return (
    <>
      <Background />
      <Header />
      <Navigation />

      <div className="cotations-container">
        <div className="cotations-button-row">
          <button
            className={area === "agricultura" ? "active" : ""}
            onClick={() => setArea("agricultura")}
          >
            Agricultura
          </button>
          <button
            className={area === "hortifruti" ? "active" : ""}
            onClick={() => setArea("hortifruti")}
          >
            Hortifruti
          </button>
          <button
            className={area === "pecuaria" ? "active" : ""}
            onClick={() => setArea("pecuaria")}
          >
            Pecuária
          </button>
          <button
            className={area === "economia" ? "active" : ""}
            onClick={() => setArea("economia")}
          >
            Economia
          </button>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="cotations-cards-grid">
            {quotes.map((item) => (
              <div key={item.code} className="cotations-card">
                <h3>{item.label}</h3>
                <p>
                  <strong>Preço:</strong>{" "}
                  {item.preco && item.preco !== "-"
                    ? `R$ ${item.preco}`
                    : "Indisponível"}{" "}
                </p>
                {item.unidade && (
                  <p>
                    <strong>Unidade:</strong> {item.unidade}
                  </p>
                )}
                {item.fonte && (
                  <p>
                    <strong>Fonte:</strong> {item.fonte}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <AboutMe />
    </>
  );
}
