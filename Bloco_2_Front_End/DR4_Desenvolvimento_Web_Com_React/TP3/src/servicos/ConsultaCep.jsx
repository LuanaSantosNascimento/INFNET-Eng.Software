export async function ObterEnderecoViaCep(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  const mensagemErro = "Erro na consulta do CEP ";

  try {
    const resposta = await fetch(url);
    if (!resposta.ok) {
      throw new Error(`Erro ao consultar o CEP ${cep}`);
    }

    const endereco = await resposta.json();
    if (endereco.erro) {
      throw new Error(`Erro ao consultar o CEP ${cep} é inválido`);
    }
    return endereco;
  } catch (erro) {
    console.error(`${mensagemErro} ${cep}: ${erro}`);
    throw new Error(`${mensagemErro} ${cep}: ${erro}`);
  }
}
