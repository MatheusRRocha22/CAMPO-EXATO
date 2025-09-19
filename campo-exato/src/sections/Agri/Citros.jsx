import { CalcCard } from "../../components/CalcCard";
import { CITROS } from "../../utils/calculosAgri";
import "./styles.css";

export function Citros() {
  return (
    <>
      <div>
        <h2 className="title">Citros</h2>

        {Object.entries(CITROS).map(([secao, calculos]) => (
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
