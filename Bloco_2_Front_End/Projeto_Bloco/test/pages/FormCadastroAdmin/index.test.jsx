import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import FormularioCadastro from "../../../src/pages/FormCadastroAdmin";
import * as authHook from "../../../src/hooks/useAuth";

//Mock do hook useAuth
jest.mock("../../../src/hooks/useAuth");

describe("Testes Formulário p/ Cadastro de Admins", () => {
  beforeEach(() => {
    // Configura o mock da função signup
    const mockSignup = jest.fn().mockResolvedValue(null);
    authHook.default = jest.fn().mockReturnValue({ signup: mockSignup });
    window.alert = jest.fn(); // Espiona o alert
  });

  test("Verifica os campos presentes em tela.", () => {
    render(<FormularioCadastro />);

    //Valida se os campos são exibidos em tela
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

  test("Valida se os campos são obrigatórios.", async () => {
    render(<FormularioCadastro />);

    //Simula ação no botão de enviar
    fireEvent.click(screen.getByRole("button", { name: /Enviar/i }));

    expect(
      await screen.findByText(
        /Necessário informar o nome para continuar com a operação./i
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Necessário informar o email o para continuar com a operação./i
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Confirmação de email é obrigatória./i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Necessário informar a senha para continuar com a operação./i
      )
    ).toBeInTheDocument();
  });

  test("Valida se os emails preenchidos são iguais.", async () => {
    render(<FormularioCadastro />);

    //Simula preenchimento dos campos
    fireEvent.input(screen.getByPlaceholderText(/Informe seu email.../i), {
      target: { value: "teste@example.com" },
    });
    fireEvent.input(screen.getByPlaceholderText(/Confirme seu email.../i), {
      target: { value: "123456@example.com" },
    });

    //Simula ação no botão de enviar
    fireEvent.click(screen.getByRole("button", { name: /Enviar/i }));

    expect(
      await screen.findByText(
        /Necessário informar o nome para continuar com a operação./i
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Os emails não coincidem./i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Necessário informar a senha para continuar com a operação./i
      )
    ).toBeInTheDocument();
  });

  test("Valida regra de preenchimento do campo senha", async () => {
    render(<FormularioCadastro />);

    //Simula preenchimento dos campos
    fireEvent.input(screen.getByPlaceholderText(/Informe seu email.../i), {
      target: { value: "teste@example.com" },
    });
    fireEvent.input(screen.getByPlaceholderText(/Confirme seu email.../i), {
      target: { value: "teste@example.com" },
    });
    fireEvent.input(screen.getByPlaceholderText(/Informe seu nome.../i), {
      target: { value: "Luana" },
    });
    fireEvent.input(screen.getByPlaceholderText(/Digite sua senha.../i), {
      target: { value: "senha123" },
    });

    //Simula ação no botão de enviar
    fireEvent.click(screen.getByRole("button", { name: /Enviar/i }));

    expect(
      await screen.findByText(
        /Digite um valor: De 8 a 20 caracteres - Com pelo menos 1 letra maiusculas, minusculas, número e caracter especial./i
      )
    ).toBeInTheDocument();
  });
});
