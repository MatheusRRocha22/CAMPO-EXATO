import { FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import "./stylesAbout.css";

function AboutMe() {
  return (
    <>
      <div className="about">
        <h1 className="titleAbout">Equipe</h1>
        <div className="infos">
          <div className="matheus">
            <img src="../foto_matheus.png" alt="foto_matheus.png" />
            <h2 className="nameMatheus">Matheus Rocha</h2>
            <hr />
            <h3 className="competencesMatheus">
              Full-Stack Developer
              <br />- Campo Exato -
            </h3>
            <hr />
            <div className="icons">
              <a
                href="https://wa.me/+5534998294136"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp"
              >
                <FaWhatsapp />
              </a>

              <a
                href="https://www.instagram.com/_matheus.rrocha/"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.linkedin.com/in/matheus-r-b6bab3302/"
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin"
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:matheus.rocha22@ufu.br"
                target="_blank"
                rel="noopener noreferrer"
                className="email"
              >
                <MdEmail />
              </a>
            </div>
          </div>

          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="logo">
              <img id="imgLogo" src={Logo} alt="logo" />
              <div className="logoText">
                <span id="prinText">CampoExato</span>
                <span id="subText">Cálculos Agropecuários</span>
              </div>
            </div>
          </Link>

          <div className="iury">
            <img src="../foto_iury.png" alt="foto_matheus.png" />
            <h2 className="nameIury">Iury Pattrick</h2>
            <hr />
            <h3 className="competencesIury">
              Melhoramento Genético
              <br />
              Diretor de RH - ConCampo EJ
            </h3>
            <hr />
            <div className="icons">
              <a
                href="https://wa.me/+5538998005634"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp"
              >
                <FaWhatsapp />
              </a>

              <a
                href="https://www.linkedin.com/in/matheus-r-b6bab3302/"
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin"
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:Iurysragro@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="email"
              >
                <MdEmail />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutMe;
