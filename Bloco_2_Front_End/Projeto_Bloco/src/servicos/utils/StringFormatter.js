export function formatarData(data) {
    if (!data) return "";

    const dataObj = new Date(data);
    const dia = dataObj.getDate() + 1;
    const mes = dataObj.getMonth() + 1;
    const ano = dataObj.getFullYear();

    return `${dia}/${mes}/${ano}`;
};