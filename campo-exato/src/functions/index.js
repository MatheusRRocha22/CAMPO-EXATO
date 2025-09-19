import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import cors from "cors";

admin.initializeApp();

const corsHandler = cors({ origin: true });

export const listUsers = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const listUsersResult = await admin.auth().listUsers();
      const users = listUsersResult.users.map((user) => ({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
      }));

      res.status(200).json({ users });
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  });
});

export const deleteUser = functions.https.onCall(async (data, context) => {
  if (!context.auth?.token.admin) {
    throw new functions.https.HttpsError("permission-denied", "Acesso negado");
  }

  const { uid } = data;
  if (!uid) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "UID é obrigatório"
    );
  }

  try {
    await admin.auth().deleteUser(uid);
    return { message: "Usuário excluído com sucesso" };
  } catch (error) {
    throw new functions.https.HttpsError("unknown", error.message);
  }
});
