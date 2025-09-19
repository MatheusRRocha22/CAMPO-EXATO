import { CalcCard } from "../../components/CalcCard";
import { CANA_DE_ACUCAR } from "../../utils/calculosAgri";
import "./styles.css";

export function CanaDeAcucar() {
  return (
    <>
      <div>
        <h2 className="title">Cana-de-Açúcar</h2>

        {Object.entries(CANA_DE_ACUCAR).map(([secao, calculos]) => (
          <div key={secao}>
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
    </>
  );
}
