export function formatarData(data) {
  if (!data) return "";

  const dataObj = new Date(data.seconds * 1000);
  const dia = String(dataObj.getDate()).padStart(2, "0");
  const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
  const ano = dataObj.getFullYear();
  const horas = String(dataObj.getHours()).padStart(2, "0");
  const minutos = String(dataObj.getMinutes()).padStart(2, "0");
  const segundos = String(dataObj.getSeconds()).padStart(2, "0");

  return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
}
