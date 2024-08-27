import { Outlet, Link } from "react-router-dom";

export default function LayoutCadastros() {
  return (
    <div className="container">
      <div className="menu">
        <nav>
          <ul>
            <li>
              {/*<Link to={"/user-dashboard/cadastros"} >Cadastros</Link>*/}

              <ul className="submenu">
                  <li><Link to="fornecedores">Fornecedores</Link></li>
                  <li><Link to="cotacoes">Cotações</Link></li>
                  <li><Link to="produtos">Produtos</Link></li>
                  <li><Link to="contatos">Contatos</Link></li>
              </ul>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
