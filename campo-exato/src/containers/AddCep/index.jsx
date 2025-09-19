import Background from "../../components/Background";
import Logo from "../../assets/images/Logo.png";
import "./stylesCep.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, db } from "../../services/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export function AddCep() {
  const [cep, setCep] = useState("");
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || "");
    } else {
      navigate("/");
    }
  }, [navigate]);

  async function validarCep(cep) {
    try {
      const formattedCep = cep.replace(/\D/g, "");
      const response = await fetch(
        `https://viacep.com.br/ws/${formattedCep}/json/`
      );
      const data = await response.json();
      if (data.erro) {
        return null;
      }
      return data.uf;
    } catch (err) {
      console.error("Erro ao validar CEP:", err);
      return null;
    }
  }

  async function handleSaveCep(e) {
    e.preventDefault();
    setErrorMessage("");

    if (!cep) {
      setErrorMessage("Informe um CEP.");
      return;
    }

    const uf = await validarCep(cep);

    if (!uf) {
      setErrorMessage("CEP inválido. Verifique e tente novamente.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Usuário não encontrado");

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        cep: cep,
        uf: uf,
        updatedAt: new Date(),
      });

      navigate("/user");
    } catch (err) {
      console.error("Erro ao salvar CEP:", err);
      setErrorMessage("Erro ao salvar o CEP. Tente novamente.");
    }
  }

  return (
    <>
      <Background />
      <div className="container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <header className="header">
            <div className="logo">
              <img id="imgLogo" src={Logo} alt="logo" />
              <div className="logoText">
                <span id="prinText">CampoExato</span>
                <span id="subText">Cálculos Agropecuários</span>
              </div>
            </div>
          </header>
        </Link>

        <form onSubmit={handleSaveCep}>
          <span id="displayName" style={{ fontSize: "35px" }}>
            Olá {userName?.split(" ")[0]}!
          </span>
          <span id="title">Informe seu CEP</span>

          <div className="imputContainer">
            <label htmlFor="cep">CEP</label>
            <input
              type="text"
              name="cep"
              id="cep"
              placeholder="00000-000"
              onChange={(e) => setCep(e.target.value)}
              required
            />
          </div>

          {errorMessage && (
            <div
              className="error-message"
              style={{
                color: "red",
                marginTop: "-10px",
                marginBottom: "5px",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="button"
            id="saveCep"
            onClick={handleSaveCep}
          >
            Salvar
          </button>
        </form>
      </div>
    </>
  );
}
