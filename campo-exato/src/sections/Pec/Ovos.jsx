import { CalcCard } from "../../components/CalcCard";
import { OVOS } from "../../utils/calculosPec";
import "./styles.css";

export function Ovos() {
  return (
    <>
      <div>
        <h2 className="title">Ovos</h2>

        {Object.entries(OVOS).map(([secao, calculos]) => (
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
