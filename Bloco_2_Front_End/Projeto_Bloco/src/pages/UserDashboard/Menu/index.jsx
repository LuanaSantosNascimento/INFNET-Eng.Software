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

export default function UserMenu() {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <Container>
      <Menu>
        <MenuItem>
          <MenuTitle>Consultas</MenuTitle>
          <SubMenu>
            <SubMenuItem>
              <a href="/user-dashboard/consultas/fornecedores">Fornecedores</a>
            </SubMenuItem>
            <SubMenuItem>
              <a href="/user-dashboard/consultas/cotacoes">Cotações</a>
            </SubMenuItem>
            <SubMenuItem>
              <a href="/user-dashboard/consultas/produtos">Produtos</a>
            </SubMenuItem>
            <SubMenuItem>
              <a href="/user-dashboard/consultas/contatos">Contatos</a>
            </SubMenuItem>
          </SubMenu>
        </MenuItem>

        <MenuItem>
          <MenuTitle>Cadastros</MenuTitle>
          <SubMenu>
            <SubMenuItem>
              <a href="/user-dashboard/cadastros/fornecedores">Fornecedores</a>
            </SubMenuItem>
            <SubMenuItem>
              <a href="/user-dashboard/cadastros/cotacoes">Cotações</a>
            </SubMenuItem>
            <SubMenuItem>
              <a href="/user-dashboard/cadastros/produtos">Produtos</a>
            </SubMenuItem>
            <SubMenuItem>
              <a href="/user-dashboard/cadastros/contatos">Contatos</a>
            </SubMenuItem>
          </SubMenu>
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
