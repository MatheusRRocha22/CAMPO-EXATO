import Agri from "../../assets/images/logoAgricultura.png";
import Pec from "../../assets/images/logoPecuaria.png";
import Background from "../../components/Background";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import "./styles.css";
import { Link } from "react-router-dom";
import AboutMe from "../../components/AboutMe";

export function Home() {
  return (
    <>
      <Background />
      <Header />
      <Navigation />

      <div className="calculos">
        <h1 className="titleCalc">Cálculos Agropecuários</h1>
        <div className="buttonsCenter">
          <div className="agricultura">
            <Link to={"/agricultura"}>
              <button className="btnAgri">
                <img id="imgAgri" src={Agri} alt="Imagem Agri." />
                AGRICULTURA
              </button>
            </Link>
          </div>
          <div className="pecuaria">
            <Link to={"/pecuaria"}>
              <button className="btnPec">
                <img id="imgPec" src={Pec} alt="Imagem Pec." />
                PECUÁRIA
              </button>
            </Link>
          </div>
        </div>
      </div>

      <AboutMe />
    </>
  );
}
