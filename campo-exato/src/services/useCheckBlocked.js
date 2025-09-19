import { useEffect } from "react";
import { auth, db } from "./firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export function useCheckBlocked() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const unsubscribeSnapshot = onSnapshot(userRef, async (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.blocked) {
            await auth.signOut();
            navigate("/blocked");
          }
        }
      });

      return () => unsubscribeSnapshot();
    });

    return () => unsubscribeAuth();
  }, [navigate]);
}
