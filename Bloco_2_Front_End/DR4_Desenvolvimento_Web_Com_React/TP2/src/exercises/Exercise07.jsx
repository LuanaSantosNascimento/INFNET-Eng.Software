import "../css/Calculadora.css";
import React, { useMemo, useState } from "react";

export default function Exercise07() {
  const calcularFatorial = (n) => {
    if (n < 0) return "Informe um valor maior que zero.";
    if (n === 0 || n === 1) return 1;

    let resultado = 1;
    for (let i = 2; i <= n; i++) {
      resultado *= i;
    }

    return resultado;
  };

  const [numero, setNumero] = useState("");
  const fatorial = useMemo(() => calcularFatorial(parseInt(numero)), [numero]);

  return (
    <div className="container">
      <h1>Exercício 07</h1>
      <div className="inputContainer">
        <input
          type="number"
          placeholder="Informe um número..."
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          className="input"
        />
      </div>
      <div className="containerResultado">
        {numero !== "" && (
          <h4>
            {fatorial === "Informe um valor maior que zero."
              ? fatorial
              : `Fatorial de ${numero} é ${fatorial}`}
          </h4>
        )}
      </div>
    </div>
  );
}
