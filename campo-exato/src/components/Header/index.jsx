import { auth } from "../../services/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { Headers } from "./styles";
import Logo from "../../assets/images/Logo.png";
import { signOut } from "firebase/auth";
import { useState, useEffect, useRef } from "react";
import Avatar from "../Avatar";

function Header() {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300);
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setIsLoggingOut(false);
      setIsDropdownOpen(false);
    }
  };

  const handleDashboard = () => {
    setIsDropdownOpen(false);
    navigate("/user");
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Headers>
      <header className="header">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="logo">
            <img id="imgLogo" src={Logo} alt="logo" />
            <div className="logoText">
              <span id="prinText">CampoExato</span>
              <span id="subText">Cálculos Agropecuários</span>
            </div>
          </div>
        </Link>

        <div className="userArea">
          {!user ? (
            <Link to="/login" className="loginBtn">
              Entrar
            </Link>
          ) : (
            <div
              className="userMenu"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="userInfo">
                <Avatar user={user} className="avatar" />
                <span className="username">
                  {user.displayName?.split(" ")[0] || "Usuário"}
                </span>
              </div>

              <div className={`dropdown ${isDropdownOpen ? "show" : ""}`}>
                <button
                  onClick={handleDashboard}
                  disabled={isLoggingOut}
                  title="Ir para Dashboard"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  title="Sair da conta"
                >
                  {isLoggingOut ? "⏳ Saindo..." : "Sair"}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </Headers>
  );
}

export default Header;
