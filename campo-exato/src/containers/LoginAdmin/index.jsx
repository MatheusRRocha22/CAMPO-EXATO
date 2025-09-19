import Background from "../../components/Background";
import Logo from "../../assets/images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebaseConfig";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

export function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mensageError, setMensageError] = useState("");

  const [SignInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();

  const ADMIN_UID = "D3Ink9I9OfYIalLAzl1DOm1YlsI2";

  async function handleSignIn(e) {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let hasError = false;

    if (!email.trim()) {
      setEmailError("E-mail é obrigatório");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Senha é obrigatória");
      hasError = true;
    }

    if (hasError) return;

    try {
      await SignInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setMensageError("Ocorreu um erro inesperado. Tente novamente.");
    }
  }

  useEffect(() => {
    if (user) {
      if (user.user.uid === ADMIN_UID) {
        navigate("/admin");
      } else {
        setMensageError("Acesso não autorizado");
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!error) return;

    switch (error.code) {
      case "auth/user-not-found":
        setMensageError("Usuário não encontrado");
        break;
      case "auth/wrong-password":
        setPasswordError("Senha incorreta");
        break;
      case "auth/invalid-email":
        setEmailError("Digite um e-mail válido");
        break;
      case "auth/user-disabled":
        setMensageError("Esta conta foi desabilitada");
        break;
      case "auth/too-many-requests":
        setMensageError("Muitas tentativas. Tente novamente mais tarde");
        break;
      case "auth/invalid-credential":
        setMensageError("E-mail ou senha incorretos");
        break;
      default:
        setMensageError("Ocorreu um erro. Tente novamente.");
    }
  }, [error]);

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

        <form onSubmit={handleSignIn}>
          <span id="titleLog">ADMIN</span>
          <div className="imputContainer">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <div
                style={{
                  display: "flex",
                  color: "red",
                  fontSize: "17px",
                  marginBottom: "-2px",
                  marginTop: "-15px",
                  justifyContent: "center",
                }}
              >
                {emailError}
              </div>
            )}
          </div>

          <div className="inputContainer">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <div
                style={{
                  display: "flex",
                  color: "red",
                  fontSize: "17px",
                  marginBottom: "-15px",
                  marginTop: "-5px",
                  justifyContent: "center",
                }}
              >
                {passwordError}
              </div>
            )}
          </div>

          {mensageError && (
            <div
              style={{
                display: "flex",
                color: "red",
                fontSize: "20px",
                marginBottom: "-50px",
                marginTop: "20px",
                justifyContent: "center",
              }}
            >
              {mensageError}
            </div>
          )}

          <button type="submit" className="button" id="login">
            Entrar
          </button>
        </form>
      </div>
    </>
  );
}
