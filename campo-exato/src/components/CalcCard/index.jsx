import { useState, useEffect } from "react";
import { auth, db } from "../../services/firebaseConfig";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { FaStar, FaRegStar } from "react-icons/fa";
import "./styles.css";

export function CalcCard({ label, func, inputs, id, onUnfavorite }) {
  const [values, setValues] = useState(Array(inputs.length).fill(""));
  const [result, setResult] = useState("");
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    const checkFavorito = async () => {
      if (!auth.currentUser) return;
      const uid = auth.currentUser.uid;
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      const favs = userSnap.data()?.calc_fav || [];
      setFavorito(favs.includes(id));
    };
    checkFavorito();
  }, [id]);

  const handleChange = (index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  const handleCalc = () => {
    setResult(func(...values));
  };

  const toggleFavorito = async () => {
    if (!auth.currentUser) return;
    if (!id) {
      console.error("calcId não definido para este cálculo!");
      return;
    }

    const uid = auth.currentUser.uid;
    const userRef = doc(db, "users", uid);

    if (favorito) {
      await updateDoc(userRef, { calc_fav: arrayRemove(id) });
      setFavorito(false);
      if (onUnfavorite) onUnfavorite(id);
    } else {
      await updateDoc(userRef, { calc_fav: arrayUnion(id) });
      setFavorito(true);
    }
  };

  return (
    <div className="calc-card">
      <div className="card-header">
        <button onClick={toggleFavorito} className="favorito-btn">
          {favorito ? <FaStar color="gold" /> : <FaRegStar />}
        </button>
        <h3>{label}</h3>
      </div>

      {inputs.map((inputLabel, i) => (
        <div key={i} className="input-group">
          <label>{inputLabel}:</label>
          <input
            type="number"
            value={values[i]}
            onChange={(e) => handleChange(i, e.target.value)}
          />
        </div>
      ))}

      <button onClick={handleCalc} id="button">
        Calcular
      </button>
      {result && <p className="result">{result}</p>}
    </div>
  );
}
