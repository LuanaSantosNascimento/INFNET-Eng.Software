import { Link } from "react-router-dom";

export default function LayoutConsultas() {
  return (
    <>
      <Link to="fornecedores">Fornecedores</Link>
      <Link to="cotacoes">Cotações</Link>
      <Link to="produtos">Produtos</Link>
      <Link to="contatos">Contatos</Link>
    </>
  );
}