import React, { useState } from "react";
import { cadastrarDados } from "../../servicos/firebase/cadastrarDados";
import { ObterEnderecoViaCep } from "../../servicos/endereco/ObterEnderecoViaCep";
import "../../css/FormCadastros.css";

export default function FormFornecedores() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCNPJ] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cep, setCep] = useState("");

  async function consultarCEP() {
    if (cep.length === 8) {
      try {
        const retornoEndereco = await ObterEnderecoViaCep(cep);
        console.log(retornoEndereco);

        setBairro(retornoEndereco.bairro || "");
        setRua(retornoEndereco.logradouro || "");
        setEstado(retornoEndereco.uf || "");
        setCidade(retornoEndereco.localidade || "");
      } catch (error) {
        console.error("Erro ao consultar cep", error);
        limparCamposEndereco();
      }
    } else {
      limparCamposEndereco();
    }
  }

  const limparCamposEndereco = () => {
    setBairro("");
    setRua("");
    setEstado("");
    setCidade("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const idDocumento = await cadastrarDados(
        {
          nome,
          email,
          razaoSocial,
          cnpj,
          endereco: {
            bairro,
            rua,
            numero,
            estado,
            cidade,
            complemento,
            cep
          },
        },
        "fornecedores",
      );

      alert(`Dados do fornecedor '${razaoSocial}' cadastrados com sucesso!`);
      console.log(`ID do registro gerado: ${idDocumento}`);
      limparFormulario();
    } catch (error) {
      console.error("Erro ao cadastrar fornecedor", error);
    }
  };

  const limparFormulario = () => {
    setNome("");
    setEmail("");
    setRazaoSocial("");
    setCNPJ("");
    limparCamposEndereco();
  };

  return (
    <div className="container-formulario">
      <h3>Cadastrar Novo Fornecedor</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-linha">
          <div className="form-coluna">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              placeholder="Informe o nome..."
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Informe o email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="razaoSocial">Razão Social:</label>
            <input
              type="text"
              id="razaoSocial"
              placeholder="Informe a razão social..."
              value={razaoSocial}
              onChange={(e) => setRazaoSocial(e.target.value)}
              required
            />

            <label htmlFor="cnpj">CNPJ:</label>
            <input
              type="text"
              id="cnpj"
              placeholder="Informe o CNPJ..."
              value={cnpj}
              onChange={(e) => setCNPJ(e.target.value)}
              required
            />
          </div>

          <div className="form-coluna">
            <label htmlFor="cep">CEP:</label>
            <input
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              onBlur={consultarCEP}
              placeholder="Digite o CEP..."
              maxLength={8}
              required
            />

            <label htmlFor="bairro">Bairro:</label>
            <input
              type="text"
              id="bairro"
              placeholder="Informe a bairro..."
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              required
            />

            <label htmlFor="rua">Rua:</label>
            <input
              type="text"
              id="rua"
              placeholder="Informe a rua..."
              value={rua}
              onChange={(e) => setRua(e.target.value)}
              required
            />

            <label htmlFor="numero">Número:</label>
            <input
              type="text"
              id="numero"
              placeholder="Informe o número..."
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              required
            />
          </div>

          <div className="form-coluna">
            <label htmlFor="estado">Estado:</label>
            <input
              type="text"
              id="estado"
              placeholder="Informe o estado..."
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              required
            />

            <label htmlFor="cidade">Cidade:</label>
            <input
              type="text"
              id="cidade"
              value={cidade}
              placeholder="Informe a cidade..."
              onChange={(e) => setCidade(e.target.value)}
              required
            />

            <label htmlFor="complemento">Complemento:</label>
            <input
              type="text"
              id="complemento"
              value={complemento}
              placeholder="Próximo a..."
              onChange={(e) => setComplemento(e.target.value)}
            />
          </div>
        </div>

        <button type="submit">Cadastrar novo fornecedor</button>
      </form>
    </div>
  );
}
