import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FormularioCadastro from "./index";

describe("FormularioCadastro", () => {
  test("Verifica os campos presentes em tela.", () => {
    render(<FormularioCadastro />);

    expect(
      screen.getByPlaceholderText(/Informe seu nome.../i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Informe seu email.../i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Confirme seu email.../i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Digite sua senha.../i)
    ).toBeInTheDocument();
  });
});
