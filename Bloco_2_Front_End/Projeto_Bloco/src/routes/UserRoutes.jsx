import { Route, Routes } from "react-router-dom";
import UserDashboard from "../pages/UserDashboard";
import FormFornecedores from "../pages/cadastros/FormFornecedores";
import FormContatos from "../pages/cadastros/FormContatos";
import FormProdutos from "../pages/cadastros/FormProdutos";
import FormCotacoes from "../pages/cadastros/FormCotacoes";
import RequisicaoCompra from "../pages/RequisicaoCompra";
import ConsultaFornecedores from "../pages/consultas/ConsultaFornecedores";
import ConsultaContatos from "../pages/consultas/ConsultaContatos";
import ConsultaProdutos from "../pages/consultas/ConsultaProdutos";
import ConsultaCotacoes from "../pages/consultas/ConsultaCotacoes";

const UserRoutes = () => (
    <Routes>
      <Route path="/home" element={<UserDashboard />} />
      <Route path="*" element={<UserDashboard />} />
      <Route path="/consultas" element={<UserDashboard />}>
        <Route index element={<UserDashboard />} />
        <Route path="fornecedores" element={<ConsultaFornecedores />} />
        <Route path="contatos" element={<ConsultaContatos />} />
        <Route path="produtos" element={<ConsultaProdutos />} />
      </Route>
      <Route path="/requisicao" element={<UserDashboard />}>
        <Route index element={<UserDashboard />} />
        <Route path="compra" element={<RequisicaoCompra />} />
      </Route>
    </Routes>
);



export default UserRoutes;