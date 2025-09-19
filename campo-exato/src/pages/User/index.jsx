import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../services/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useCheckBlocked } from "../../services/useCheckBlocked";
import { CalcCard } from "../../components/CalcCard";
import { mapCalculosAgri } from "../../utils/calculosAgri";
import { mapCalculosPec } from "../../utils/calculosPec";
import AboutMe from "../../components/AboutMe";
import Background from "../../components/Background";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import "./styles.css";

export function User() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [favoritos, setFavoritos] = useState([]);
  const [userId, setUserId] = useState(null);

  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    cep: "",
    uf: "",
  });

  const [formData, setFormData] = useState({
    nome: "",
    cep: "",
  });

  const [editando, setEditando] = useState(false);

  const CALCULOS_AGRI_LOOKUP = mapCalculosAgri();
  const CALCULOS_PEC_LOOKUP = mapCalculosPec();

  useCheckBlocked();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setUserData((prev) => ({
          ...prev,
          email: user.email || "",
        }));
        setLoading(false);
      } else {
        navigate("/login");
      }
    });
    return unsubscribeAuth;
  }, [navigate]);

  const fetchUserData = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        setUserData((prev) => ({
          ...prev,
          nome: data.nome || "",
          cep: data.cep || "",
          uf: data.uf || "",
        }));
        return data.calc_fav || [];
      } else {
        return [];
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      return [];
    }
  };

  useEffect(() => {
    if (!userId) return;
    const getFavoritos = async () => {
      const favs = await fetchUserData(userId);
      setFavoritos(favs);
    };
    getFavoritos();
  }, [userId]);

  const handleUnfavorite = async (calcId) => {
    if (!userId) return;
    const newFavs = favoritos.filter((id) => id !== calcId);
    setFavoritos(newFavs);

    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, { calc_fav: newFavs });
  };

  const validarCep = async (cep) => {
    try {
      const formattedCep = (cep || "").replace(/\D/g, "");
      if (!formattedCep || formattedCep.length !== 8) return null;
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
  };

  const startEdit = () => {
    setFormData({
      nome: userData.nome || "",
      cep: userData.cep || "",
    });
    setEditando(true);
  };

  const handleSalvar = async () => {
    if (!userId) return;

    if (!formData.cep) {
      alert("Informe um CEP.");
      return;
    }

    const uf = await validarCep(formData.cep);

    if (!uf) {
      alert("CEP inválido. Verifique e tente novamente.");
      return;
    }

    try {
      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, {
        nome: formData.nome,
        cep: formData.cep,
        uf,
        updatedAt: new Date(),
      });

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: formData.nome });
        await auth.currentUser.reload();
      }

      // Atualiza estado local
      setUserData((prev) => ({
        ...prev,
        nome: formData.nome,
        cep: formData.cep,
        uf,
      }));

      setEditando(false);
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      alert("Erro ao atualizar seus dados.");
    }
  };

  const favoritosAgricultura = favoritos.filter(
    (id) => CALCULOS_AGRI_LOOKUP[id]
  );
  const favoritosPecuaria = favoritos.filter((id) => CALCULOS_PEC_LOOKUP[id]);

  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>Carregando...</p>
    );
  }

  return (
    <>
      <Background />
      <Header />
      <Navigation />

      <div className="containerUser">
        <div className="data">
          <h2 className="dataTitle">Seus dados</h2>

          {editando ? (
            <div className="user-edit">
              <label>Nome:</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, nome: e.target.value }))
                }
                placeholder="Nome"
              />

              <label>CEP:</label>
              <input
                type="text"
                value={formData.cep}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, cep: e.target.value }))
                }
                placeholder="CEP (00000-000)"
              />

              <div style={{ marginTop: 12 }}>
                <button onClick={handleSalvar}>Salvar</button>
                <button
                  onClick={() => {
                    setEditando(false);
                  }}
                  style={{ marginLeft: 8 }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="user-info">
              <p>
                <b>Nome:</b> {userData.nome}
              </p>
              <p>
                <b>Email:</b> {userData.email}
              </p>
              <p>
                <b>CEP:</b> {userData.cep}
              </p>
              <p>
                <b>UF:</b> {userData.uf}
              </p>
              <button onClick={startEdit}>Editar</button>
            </div>
          )}
        </div>

        <div className="calcsFav">
          <h2 className="favAgri">Agricultura</h2>
          <div className="cardsAgri">
            {favoritosAgricultura.length === 0 ? (
              <p className="sem-favoritos">
                Nenhum cálculo agrícola favoritado ainda.
              </p>
            ) : (
              favoritosAgricultura.map((id) => {
                const calcData = CALCULOS_AGRI_LOOKUP[id];
                if (!calcData) return null;
                return (
                  <CalcCard
                    key={id}
                    id={id}
                    {...calcData}
                    onUnfavorite={handleUnfavorite}
                  />
                );
              })
            )}
          </div>

          <h2 className="favPec">Pecuária</h2>
          <div className="cardsPec">
            {favoritosPecuaria.length === 0 ? (
              <p className="sem-favoritos">
                Nenhum cálculo pecuário favoritado ainda.
              </p>
            ) : (
              favoritosPecuaria.map((id) => {
                const calcData = CALCULOS_PEC_LOOKUP[id];
                if (!calcData) return null;
                return (
                  <CalcCard
                    key={id}
                    id={id}
                    {...calcData}
                    onUnfavorite={handleUnfavorite}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>

      <AboutMe />
    </>
  );
}
