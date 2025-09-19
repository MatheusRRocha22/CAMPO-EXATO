import { CalcCard } from "../../components/CalcCard";
import { CORTE } from "../../utils/calculosPec";
import "./styles.css";

export function Corte() {
  return (
    <>
      <div>
        <h2 className="title">Corte</h2>

        {Object.entries(CORTE).map(([secao, calculos]) => (
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
