import { useState } from "react";
import { useForm } from "react-hook-form";
import "../../css/FormCadastrosCotacoes.css";
import useAuth from "../../hooks/useAuth";

import { InputLabel, Button, TextField } from "@mui/material";

export default function CadastroAdmin() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({});
  const admin = true;
  const [error, setError] = useState("");
  const { signup } = useAuth();

  const handleEnviar = async (dados) => {
    const res = await signup(dados.email, dados.senha, dados.nome, admin);
    if (res) {
      setError(res);
      return;
    }

    alert("Usuário cadastrado com sucesso!");
    reset();
  };

  return (
    <div className="container-formulario">
      <h3>Cadastrar Administrador</h3>

      <form onSubmit={handleSubmit(handleEnviar)} className="form-linha">
        <div className="form-coluna">
          <InputLabel>Nome:</InputLabel>
          <TextField
            type="text"
            placeholder="Informe seu nome..."
            {...register("nome", {
              required:
                "Necessário informar o nome para continuar com a operação.",
            })}
            helperText={errors?.nome?.message}
            variant="standard"
          />
          <InputLabel>Email:</InputLabel>
          <TextField
            type="text"
            placeholder="Informe seu email..."
            {...register("email", {
              required:
                "Necessário informar o email o para continuar com a operação.",
            })}
            helperText={errors?.email?.message}
            variant="standard"
          />
        </div>

        <div className="form-coluna">
          <InputLabel>Confirme seu email:</InputLabel>
          <TextField
            type="email"
            placeholder="Confirme seu email..."
            {...register("confirmacaoEmail", {
              required: "Confirmação de email é obrigatória.",
              validate: (value) => {
                const { email } = getValues();
                return value === email || "Os emails não coincidem.";
              },
            })}
            helperText={errors?.confirmacaoEmail?.message}
            variant="standard"
          />

          <InputLabel>Senha:</InputLabel>
          <TextField
            type="password"
            placeholder="Digite sua senha..."
            variant="standard"
            {...register("senha", {
              required:
                "Necessário informar a senha para continuar com a operação.",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                message:
                  "Digite um valor: De 8 a 20 caracteres - Com pelo menos 1 letra maiusculas, minusculas, número e caracter especial.",
              },
            })}
            helperText={errors?.senha?.message}
          />
        </div>
        {error && <InputLabel>{error}</InputLabel>}
        <Button variant="contained" type="submit">
          Enviar
        </Button>
      </form>
    </div>
  );
}
