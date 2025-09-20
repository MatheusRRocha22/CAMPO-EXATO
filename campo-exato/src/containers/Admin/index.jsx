import { useEffect, useState } from "react";
import { db, auth } from "../../services/firebaseConfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Background from "../../components/Background/index";
import Header from "../../components/Header/index";
import Navigation from "../../components/Navigation/index";
import Avatar from "../../components/Avatar";
import "./stylesAdmin.css";

export function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const ADMIN_UID = "gWrmM8if9XPti0eMfaukeYZa3ru1";

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login_admin");
        return;
      }

      if (user.uid === ADMIN_UID) {
        setIsAdmin(true);
      } else {
        alert("Acesso negado: você não é admin!");
        navigate("/");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const snapshot = await getDocs(usersCollection);
        console.log("snapshot.docs:", snapshot.docs);
        setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Erro ao buscar usuários:", error.message);
      }
    };

    fetchUsers();
  }, [isAdmin]);

  const toggleBlocked = async (id, blocked) => {
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, { blocked: !blocked });
      setUsers(
        users.map((u) => (u.id === id ? { ...u, blocked: !blocked } : u))
      );
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error.message);
    }
  };

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Carregando painel Admin...
      </p>
    );

  return (
    <>
      <Background />
      <Header />
      <Navigation />
      <div className="admin-container">
        <h1 className="admin-title">Usuários</h1>
        <div className="users-cards">
          {users.map((user) => (
            <div key={user.id} className="cards">
              <h2 className="name">
                {user.displayName?.split(" ")[0] || "Usuário"}
              </h2>
              <Avatar user={user} size={150} className="avatar" />

              <h3 className="user-email">{user.email}</h3>
              <h4 className={`block ${user.blocked ? "blocked" : "active"}`}>
                {user.blocked ? "Bloqueado" : "Ativo"}
              </h4>
              <button
                className={`block-button ${user.blocked ? "unblock" : "block"}`}
                onClick={() => toggleBlocked(user.id, user.blocked)}
              >
                {user.blocked ? "Desbloquear" : "Bloquear"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
