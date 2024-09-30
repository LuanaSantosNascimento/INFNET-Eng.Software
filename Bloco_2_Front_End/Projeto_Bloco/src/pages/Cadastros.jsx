import FormFornecedores from "./cadastro/FormFornecedores";
import FormContatos from "./cadastro/FormContatos";
import FormProdutos from "./cadastro/FormProdutos";
import FormCotacoes from "./cadastro/FormCotacoes";

export default function Consultas() {
  return (
    <div>
      <h2>Cadastros</h2>
      <FormFornecedores />
      <FormContatos />
      <FormProdutos />
      <FormCotacoes />
    </div>
  );
}
