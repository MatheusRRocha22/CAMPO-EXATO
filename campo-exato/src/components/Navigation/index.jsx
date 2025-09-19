// navigation.jsx
import { Nav } from "./styles.jsx";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useEffect, useState } from "react";

function Navigation() {
  const [menu, setMenu] = useState(window.innerWidth >= 800);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMenu(window.innerWidth >= 800);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleMenu = () => {
    if (menu) {
      setIsHiding(true);
      setTimeout(() => {
        setMenu(false);
        setIsHiding(false);
      }, 1000);
    } else {
      setMenu(true);
    }
  };

  return (
    <Nav>
      <FiMenu className="icon" size={25} onClick={handleToggleMenu} />
      {(menu || isHiding) && (
        <div className={`links ${isHiding ? "hide" : ""}`}>
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/news" className="nav-link">
            Notícias
          </Link>
          <Link to="/cotations" className="nav-link">
            Cotações
          </Link>
        </div>
      )}
    </Nav>
  );
}

export default Navigation;
