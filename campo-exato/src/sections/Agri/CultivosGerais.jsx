import { CalcCard } from "../../components/CalcCard";
import { CULTIVOS_GERAIS } from "../../utils/calculosAgri";
import "./styles.css";

export function CultivosGerais() {
  return (
    <div>
      <h2 className="title">Cultivos Gerais</h2>

      {Object.entries(CULTIVOS_GERAIS).map(([secao, calculos]) => (
        <div key={secao} style={{ marginBottom: "2rem" }}>
          <h3 id="section">{secao}</h3>

          <div id="grid">
            {calculos.map((calc) => (
              <CalcCard
                key={calc.id}
                id={calc.id}
                label={calc.label}
                func={calc.func}
                inputs={calc.inputs}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
