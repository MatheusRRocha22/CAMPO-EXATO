import { CalcCard } from "../../components/CalcCard";
import { MONTARIA } from "../../utils/calculosPec";
import "./styles.css";

export function Montaria() {
  return (
    <>
      <div>
        <h2 className="title">Montaria</h2>

        {Object.entries(MONTARIA).map(([secao, calculos]) => (
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
