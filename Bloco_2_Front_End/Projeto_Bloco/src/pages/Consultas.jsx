import ConsultaFornecedores from "./consultas/ConsultaFornecedores";
import ConsultaContatos from "./consultas/ConsultaContatos";
import ConsultaProdutos from "./consultas/ConsultaProdutos";
import ConsultaCotacoes from "./consultas/ConsultaCotacoes";

export default function Consultas() {
  return (
    <div>
      <h2>Listagem</h2>
      <ConsultaFornecedores />
      <ConsultaContatos />
      <ConsultaProdutos />
      <ConsultaCotacoes />
    </div>
  );
}
