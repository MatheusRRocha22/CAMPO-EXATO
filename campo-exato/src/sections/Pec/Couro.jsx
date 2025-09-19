import { CalcCard } from "../../components/CalcCard";
import { COURO } from "../../utils/calculosPec";
import "./styles.css";

export function Couro() {
  return (
    <>
      <div>
        <h2 className="title">Couro</h2>

        {Object.entries(COURO).map(([secao, calculos]) => (
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
