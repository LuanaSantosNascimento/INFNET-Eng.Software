import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
`;

export const Menu = styled.div`
  display: flex; /* Flexbox para alinhar os menus lado a lado */
  gap: 20px;
  justify-content: center;
`;

export const MenuItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const MenuTitle = styled.h2`
  cursor: pointer;
  margin: 0;
  padding: 10px 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  text-align: center;
  a {
    text-decoration: none;
    color: #333;
  }
  &:hover {
    background-color: #e9e9e9;
  }
`;

export const SubMenu = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin: 0;
  position: absolute;
  top: 100%; /* Coloca o submenu logo abaixo do título */
  left: 0;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  display: none; /* Esconde o submenu inicialmente */
  z-index: 1000; /* Garante que o submenu fique acima de outros elementos */

  ${MenuItem}:hover & {
    display: block; /* Mostra o submenu ao passar o mouse */
  }
`;

export const SubMenuItem = styled.li`
  margin: 0;
  padding: 10px 20px;

  a {
    text-decoration: none;
    color: #333;
    display: block;

    &:hover {
      background-color: #e9e9e9;
    }
  }
`;

export const LogoutItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center; /* Centraliza o conteúdo */
  width: 150px; /* Define a largura fixa para o item de sair */
  padding: 10px 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e9e9e9;
  }
`;
