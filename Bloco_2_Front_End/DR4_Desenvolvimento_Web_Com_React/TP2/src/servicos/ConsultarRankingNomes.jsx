export async function consultarRakingNomes(decada) {
  let retorno = [];
  const url = `https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking/?decada=${decada}`;

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    console.log("Dados recebidos:", dados);
    if (Array.isArray(dados)) {
      retorno = dados.flatMap((item) => item.res || []);
      console.log("Ranking de nomes - Consulta finalizada");
    } else {
      console.error("Formato inesperado na resposta da API", dados);
      throw new Error("Formato inesperado na resposta da API");
    }
  } catch (erro) {
    console.error("Erro ao consultar ranking de nomes:", erro);
    retorno = [];
  }

  return retorno;
}
