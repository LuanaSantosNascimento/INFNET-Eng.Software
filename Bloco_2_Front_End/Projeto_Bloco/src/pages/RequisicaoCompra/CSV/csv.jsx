import { convertArrayToCSV } from "convert-array-to-csv";
import { formatarData } from "../../../servicos/utils/StringFormatter";

export function downloadCSV(requisicao, cotacoes){
    const titulosCSV = {
        idRequisicao: "ID Requisição",
        dataRequisicao: "Data Requisição",
        produto: "Produto",
        usuario: "Usuário",
        status: "Status Requisição",
        idCotacao: "ID Cotação",
        dataCotacao: "Data Cotação",
        fornecedor: "Fornecedor",
        quantidade: "Quantidade",
        precoUnitario: "Preço Unitário",
        valorTotal: "Valor Total",
      };
  
      const dadosCSV = [];
      dadosCSV.push(Object.values(titulosCSV));
  
      cotacoes.forEach((c) => {
        const objeto = {
          idRequisicao: requisicao.id,
          dataRequisicao: formatarData(requisicao.requisicao.data),
          produto: requisicao.produto.nome,
          usuario: requisicao.usuario.nome,
          status: requisicao.requisicao.status,
          idCotacao: c.id,
          dataCotacao: formatarData(c.cotacao.data),
          fornecedor: c.fornecedor.nome,
          quantidade: c.cotacao.quantidade,
          precoUnitario: c.cotacao.precoUnitario,
          valorTotal: c.cotacao.valorTotalCotacao,
        };
  
        dadosCSV.push(Object.values(objeto));
      });
  
      const conteudoCSV = convertArrayToCSV(dadosCSV);

      //Byte Order Mark (BOM) define a codificação correta, para resolver os problemas com caracteres especiais
      const bom = '\uFEFF'; 
      const csvComBOM = bom + conteudoCSV;
  
      const blob = new Blob([csvComBOM], { type: "text/csv;charset=utf-8," });
      const blobUrl = URL.createObjectURL(blob);
  
      // Link temporário para download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", "cotacao.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
}