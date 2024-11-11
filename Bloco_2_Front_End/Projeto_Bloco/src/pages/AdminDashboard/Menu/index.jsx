import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import {
  Container,
  Menu,
  MenuItem,
  MenuTitle,
  SubMenu,
  SubMenuItem,
  LogoutItem,
} from "./styles";
import { Link } from "react-router-dom";

export default function AdminMenu() {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <Container>
      <Menu>
        <MenuItem>
          <MenuTitle>Consultas</MenuTitle>
          <SubMenu>
            <SubMenuItem>
              <Link to="/admin-dashboard/consultas/fornecedores">
                Fornecedores
              </Link>
            </SubMenuItem>
            <SubMenuItem>
              <Link to="/admin-dashboard/consultas/produtos">Produtos</Link>
            </SubMenuItem>
            <SubMenuItem>
              <Link to="/admin-dashboard/consultas/contatos">Contatos</Link>
            </SubMenuItem>
          </SubMenu>
        </MenuItem>

        <MenuItem>
          <MenuTitle>Cadastros</MenuTitle>
          <SubMenu>
            <SubMenuItem>
              <Link to="/admin-dashboard/cadastros/fornecedores">
                Fornecedores
              </Link>
            </SubMenuItem>
            <SubMenuItem>
              <Link to="/admin-dashboard/cadastros/produtos">Produtos</Link>
            </SubMenuItem>
            <SubMenuItem>
              <Link to="/admin-dashboard/cadastros/contatos">Contatos</Link>
            </SubMenuItem>
          </SubMenu>
        </MenuItem>

        <MenuItem>
          <MenuTitle>Usuários</MenuTitle>
          <SubMenu>
            <SubMenuItem>
              <Link to="/admin-dashboard/gerenciamento/usuarios">
                Gerenciar Contas
              </Link>
            </SubMenuItem>
            <SubMenuItem>
              <Link to="/admin-dashboard/gerenciamento/cadastro-admin">
                Cadastrar Administrador
              </Link>
            </SubMenuItem>
          </SubMenu>
        </MenuItem>

        <MenuItem>
          <MenuTitle>
            <Link to="/admin-dashboard/requisicao/compra">
              Requisição de Compras
            </Link>
          </MenuTitle>
        </MenuItem>

        <LogoutItem onClick={() => [signout(), navigate("/")]}>
          <FiLogOut size={20} />
          Sair
        </LogoutItem>
      </Menu>
      <Outlet />
    </Container>
  );
}
