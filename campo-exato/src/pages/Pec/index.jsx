import { useState } from "react";
import Background from "../../components/Background";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import AboutMe from "../../components/AboutMe";
import { Corte } from "../../sections/Pec/Corte";
import { Couro } from "../../sections/Pec/Couro";
import { Economia } from "../../sections/Pec/Economia";
import { Extra } from "../../sections/Pec/Extra";
import { Gerais } from "../../sections/Pec/Gerais";
import { La } from "../../sections/Pec/La";
import { Leite } from "../../sections/Pec/Leite";
import { Montaria } from "../../sections/Pec/Montaria";
import { Ovos } from "../../sections/Pec/Ovos";
import { Pastagens } from "../../sections/Pec/Pastagens";
import "./styles.css";

export default function Pec() {
  const [finalidade, setFinalidade] = useState("gerais");

  return (
    <>
      <Background />
      <Header />
      <Navigation />
      <div className="pec-container">
        <h1 style={{ textAlign: "center" }}>Cálculos Pecuaristas</h1>
        <div id="line"></div>
        <div className="buttons" style={{ margin: "20px" }}>
          <button
            className={finalidade === "gerais" ? "active" : ""}
            onClick={() => setFinalidade("gerais")}
          >
            Gerais
          </button>
          <button
            className={finalidade === "corte" ? "active" : ""}
            onClick={() => setFinalidade("corte")}
          >
            Corte
          </button>
          <button
            className={finalidade === "leite" ? "active" : ""}
            onClick={() => setFinalidade("leite")}
          >
            Leite
          </button>
          <button
            className={finalidade === "pastagens" ? "active" : ""}
            onClick={() => setFinalidade("pastagens")}
          >
            Pastagens
          </button>
          <button
            className={finalidade === "couro" ? "active" : ""}
            onClick={() => setFinalidade("couro")}
          >
            Couro
          </button>
          <button
            className={finalidade === "la" ? "active" : ""}
            onClick={() => setFinalidade("la")}
          >
            Lã
          </button>
          <button
            className={finalidade === "ovos" ? "active" : ""}
            onClick={() => setFinalidade("ovos")}
          >
            Ovos
          </button>
          <button
            className={finalidade === "montaria" ? "active" : ""}
            onClick={() => setFinalidade("montaria")}
          >
            Montaria
          </button>
          <button
            className={finalidade === "extra" ? "active" : ""}
            onClick={() => setFinalidade("extra")}
          >
            Extra
          </button>
          <button
            className={finalidade === "economia" ? "active" : ""}
            onClick={() => setFinalidade("economia")}
          >
            Economia
          </button>
        </div>
        {finalidade === "gerais" && <Gerais />}
        {finalidade === "corte" && <Corte />}
        {finalidade === "leite" && <Leite />}
        {finalidade === "pastagens" && <Pastagens />}
        {finalidade === "couro" && <Couro />}
        {finalidade === "la" && <La />}
        {finalidade === "ovos" && <Ovos />}
        {finalidade === "montaria" && <Montaria />}
        {finalidade === "extra" && <Extra />}
        {finalidade === "economia" && <Economia />}
      </div>
      <AboutMe />
    </>
  );
}
