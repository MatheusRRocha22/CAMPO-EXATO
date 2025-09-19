import Background from "../../components/Background";
import "./stylesBlocked.css";

export function Blocked() {
  return (
    <>
      <Background />
      <div
        style={{
          backgroundColor: "white",
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <h1>Conta Bloqueada</h1>
        <p>
          Sua conta foi bloqueada pelo administrador. Entre em contato para mais
          informações.
        </p>
      </div>
    </>
  );
}
