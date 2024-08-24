export async function listarUFs(){
  let retorno = {};
  const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome";

  await fetch(url)
    .then((resposta) => resposta.json())
    .then((ufs) => {
      retorno = ufs;
      console.log("Estados - Consulta finalizada");
    })
    .catch((erro) => retorno.erro = erro);

  return retorno;
}


export async function obterMunicipios(idEstado){
  let retorno = {};
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/municipios`;

  await fetch(url)
    .then((resposta) => resposta.json())
    .then((pais) => {
      retorno = pais;
      console.log("Munícipios - Consulta finalizada");
    })
    .catch((erro) => retorno.erro = erro);

  return retorno;
}