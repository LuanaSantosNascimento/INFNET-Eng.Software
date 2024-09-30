import AdminDashboard from "../pages/AdminDashboard";
import { Route, Routes } from "react-router-dom";
import FormFornecedores from "../pages/cadastros/FormFornecedores";
import FormContatos from "../pages/cadastros/FormContatos";
import FormProdutos from "../pages/cadastros/FormProdutos";
import FormCotacoes from "../pages/cadastros/FormCotacoes";
import ConsultaFornecedores from "../pages/consultas/ConsultaFornecedores";
import ConsultaContatos from "../pages/consultas/ConsultaContatos";
import ConsultaProdutos from "../pages/consultas/ConsultaProdutos";
import ConsultaCotacoes from "../pages/consultas/ConsultaCotacoes";
import RequisicaoCompra from "../pages/RequisicaoCompra";
import GerenciamentoConta from "../pages/GerenciamentoContas";
import FormCadastroAdmin from "../pages/FormCadastroAdmin";

const AdminRoutes = () => (
  <Routes>
    <Route path="/home" element={<AdminDashboard />} />
    <Route path="*" element={<AdminDashboard />} />
    <Route path="/consultas" element={<AdminDashboard />}>
      <Route index element={<AdminDashboard />} />
      <Route path="fornecedores" element={<ConsultaFornecedores />} />
      <Route path="contatos" element={<ConsultaContatos />} />
      <Route path="cotacoes" element={<ConsultaCotacoes />} />
      <Route path="produtos" element={<ConsultaProdutos />} />
    </Route>
    <Route path="/cadastros" element={<AdminDashboard />}>
      <Route index element={<AdminDashboard />} />
      <Route path="fornecedores" element={<FormFornecedores />} />
      <Route path="contatos" element={<FormContatos />} />
      <Route path="cotacoes" element={<FormCotacoes />} />
      <Route path="produtos" element={<FormProdutos />} />
    </Route>
    <Route path="/requisicao" element={<AdminDashboard />}>
      <Route index element={<AdminDashboard />} />
      <Route path="compra" element={<RequisicaoCompra />} />
    </Route>
    <Route path="/gerenciamento" element={<AdminDashboard />}>
      <Route index element={<AdminDashboard />} />
      <Route path="usuarios" element={<GerenciamentoConta />} />
      <Route path="cadastro-admin" element={<FormCadastroAdmin />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
