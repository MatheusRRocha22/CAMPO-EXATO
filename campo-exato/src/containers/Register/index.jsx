import Logo from "../../assets/images/Logo.png";
import GoogleIcon from "../../assets/images/google_icon.png";
import "./stylesReg.css";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "../../services/firebaseConfig";
import { useState, useEffect } from "react";
import {
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !email.trim() || !password) {
      setErrorMessage("Preencha todos os campos.");
      return;
    }

    const res = await createUserWithEmailAndPassword(email, password);

    if (res && res.user) {
      await updateProfile(res.user, {
        displayName: name,
        photoURL: "https://example.com/default-avatar.png",
      });

      await setDoc(doc(db, "users", res.user.uid), {
        nome: res.user.displayName,
        email: res.user.email,
        cep: null,
        uf: null,
        role: "user",
        blocked: false,
        calc_fav: [],
        photoURL: res.user.photoURL,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      navigate("/cep");
    }
  }

  async function handleGoogleRegister() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.cep) {
          navigate("/user");
        } else {
          navigate("/cep");
        }
      } else {
        await setDoc(userRef, {
          nome: user.displayName || "",
          email: user.email,
          cep: null,
          uf: null,
          role: "user",
          blocked: false,
          calc_fav: [],
          photoURL: user.photoURL || "https://example.com/default-avatar.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        navigate("/cep");
      }
    } catch (err) {
      console.error(err);

      if (err.code === "auth/account-exists-with-different-credential") {
        const emailConflict = err.customData?.email;
        if (emailConflict) {
          const signInMethods = await fetchSignInMethodsForEmail(
            auth,
            emailConflict
          );
          if (signInMethods.includes("password")) {
            setErrorMessage(
              "Este e-mail já está cadastrado com e-mail e senha."
            );
          } else if (signInMethods.includes("google.com")) {
            setErrorMessage("Este e-mail já está cadastrado com Google.");
          } else {
            setErrorMessage("Este e-mail já está cadastrado.");
          }
        } else {
          setErrorMessage("Este e-mail já está cadastrado.");
        }
      } else if (err.code === "auth/popup-closed-by-user") {
        setErrorMessage("Login cancelado.");
      } else {
        setErrorMessage("Erro ao entrar com Google.");
      }
    }
  }

  useEffect(() => {
    if (!error) return;
    switch (error.code) {
      case "auth/weak-password":
        setErrorMessage("Senha deve ter no mínimo 6 caracteres");
        break;
      case "auth/invalid-email":
        setErrorMessage("Digite um e-mail válido");
        break;
      case "auth/email-already-in-use":
        setErrorMessage("Este e-mail já está em uso");
        break;
      default:
        setErrorMessage("Ocorreu um erro. Tente novamente.");
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

        <form onSubmit={handleRegister}>
          <span id="title">CADASTRAR</span>

          <div className="imputContainer">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="João"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="imputContainer">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
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
          </div>

          {errorMessage && (
            <div
              className="error-message"
              style={{
                color: "red",
                marginTop: "-20px",
                marginBottom: "1px",
                fontSize: "17px",
                textAlign: "center",
              }}
            >
              {errorMessage}
            </div>
          )}

          <button
            type="button"
            className="googleReg"
            onClick={handleGoogleRegister}
          >
            <img id="googleIconReg" src={GoogleIcon} alt="Google" />
            Cadastrar com Google
          </button>

          <button type="submit" className="button" id="register">
            Cadastrar
          </button>

          <div className="footer" id="navCad">
            <p>Você já tem uma conta?</p>
            <Link
              style={{ textDecoration: "", color: "rgb(0, 33, 2)" }}
              to="/login"
            >
              Acesse sua conta aqui
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
