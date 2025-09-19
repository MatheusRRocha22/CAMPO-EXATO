import { useState } from "react";
import Background from "../../components/Background";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import { CultivosGerais } from "../../sections/Agri/CultivosGerais";
import { CulturasAnuais } from "../../sections/Agri/CulturasAnuais";
import { Cafeicultura } from "../../sections/Agri/Cafeicultura";
import { CanaDeAcucar } from "../../sections/Agri/CanaDeAcucar";
import { Citros } from "../../sections/Agri/Citros";
import { Silvicultura } from "../../sections/Agri/Silvicultura";
import "./styles.css";
import AboutMe from "../../components/AboutMe";

export default function Agri() {
  const [cultivo, setCultivo] = useState("gerais");

  return (
    <>
      <Background />
      <Header />
      <Navigation />
      <div className="agri-container">
        <h1>Cálculos Agrícolas</h1>
        <div id="line"></div>
        <div className="buttons" style={{ margin: "20px" }}>
          <button
            className={cultivo === "gerais" ? "active" : ""}
            onClick={() => setCultivo("gerais")}
          >
            Cultivos Gerais
          </button>
          <button
            className={cultivo === "anuais" ? "active" : ""}
            onClick={() => setCultivo("anuais")}
          >
            Culturas Anuais
          </button>
          <button
            className={cultivo === "cafeicultura" ? "active" : ""}
            onClick={() => setCultivo("cafeicultura")}
          >
            Cafeicultura
          </button>
          <button
            className={cultivo === "cana" ? "active" : ""}
            onClick={() => setCultivo("cana")}
          >
            Cana-de-Açúcar
          </button>
          <button
            className={cultivo === "citros" ? "active" : ""}
            onClick={() => setCultivo("citros")}
          >
            Citros
          </button>
          <button
            className={cultivo === "silvicultura" ? "active" : ""}
            onClick={() => setCultivo("silvicultura")}
          >
            Silvicultura
          </button>
        </div>
        {cultivo === "gerais" && <CultivosGerais />}
        {cultivo === "anuais" && <CulturasAnuais />}
        {cultivo === "cafeicultura" && <Cafeicultura />}
        {cultivo === "cana" && <CanaDeAcucar />}
        {cultivo === "citros" && <Citros />}
        {cultivo === "silvicultura" && <Silvicultura />}
      </div>
      <AboutMe />
    </>
  );
}
