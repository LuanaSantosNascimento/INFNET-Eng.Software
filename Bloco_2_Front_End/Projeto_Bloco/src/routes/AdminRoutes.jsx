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
</Routes>
);

export default AdminRoutes;