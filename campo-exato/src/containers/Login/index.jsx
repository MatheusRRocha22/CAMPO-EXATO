import Logo from "../../assets/images/Logo.png";
import GoogleIcon from "../../assets/images/google_icon.png";
import "./stylesLog.css";
import { useState, useEffect } from "react";
import { auth, db } from "../../services/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [SignInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();

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
      const result = await SignInWithEmailAndPassword(email, password);

      if (result && result.user) {
        const userDocRef = doc(db, "users", result.user.uid);
        const snap = await getDoc(userDocRef);

        if (snap.exists()) {
          const data = snap.data();

          if (data.blocked) {
            await signOut(auth);
            navigate("/blocked");
            return;
          }
          if (data.cep) {
            navigate("/");
          } else {
            navigate("/cep");
          }
        }
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setEmailError("Ocorreu um erro inesperado. Tente novamente.");
    }
  }

  async function handleGoogleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const userDocRef = doc(db, "users", result.user.uid);
      const snap = await getDoc(userDocRef);

      if (snap.exists()) {
        const data = snap.data();

        if (data.blocked) {
          await signOut(auth);
          navigate("/blocked");
          return;
        }

        if (data.cep) {
          navigate("/");
        } else {
          navigate("/cep");
        }
      } else {
        navigate("/cep");
      }
    } catch (err) {
      console.error("Erro ao fazer login com Google:", err);
      setEmailError("Não foi possível entrar com o Google.");
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        navigate("/user");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!error) return;

    switch (error.code) {
      case "auth/user-not-found":
        setEmailError("Usuário não encontrado");
        break;
      case "auth/wrong-password":
        setPasswordError("Senha incorreta");
        break;
      case "auth/invalid-email":
        setEmailError("Digite um e-mail válido");
        break;
      case "auth/user-disabled":
        setEmailError("Esta conta foi desabilitada");
        break;
      case "auth/too-many-requests":
        setEmailError("Muitas tentativas. Tente novamente mais tarde");
        break;
      case "auth/invalid-credential":
        setEmailError("E-mail ou senha incorretos");
        break;
      default:
        setEmailError("Ocorreu um erro. Tente novamente.");
    }
  }, [error]);

  return (
    <>
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
          <span id="titleLog">LOGIN</span>
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
                  fontSize: "15px",
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
                  fontSize: "15px",
                  marginBottom: "-12px",
                  marginTop: "-5px",
                  justifyContent: "center",
                }}
              >
                {passwordError}
              </div>
            )}
          </div>

          <button type="submit" className="button" id="login">
            Entrar
          </button>

          <button
            type="button"
            className="googleLog"
            onClick={handleGoogleSignIn}
          >
            <img id="googleIconLog" src={GoogleIcon} alt="Google" />
            Entrar com Google
          </button>

          <div className="footer" id="navLog">
            <p>Você não tem uma conta?</p>
            <Link style={{ color: "rgb(0, 33, 2)" }} to="/register">
              Crie a sua conta aqui
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
