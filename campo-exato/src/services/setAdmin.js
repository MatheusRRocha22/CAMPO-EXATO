import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
const uid = "D3Ink9I9OfYIalLAzl1DOm1YlsI2";

auth
  .setCustomUserClaims(uid, { admin: true })
  .then(() => console.log("Usuário promovido a admin 🚀"))
  .catch((error) => console.error("Erro:", error));
