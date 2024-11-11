from datetime import datetime 

class Tarefa:
    """Classe que representa uma Tarefa.

        Atributos:
            id (str): ID da tarefa
            titulo (str): Título da tarefa
            status (str): Indica o status da tarefa: 'NAO_INICIADA, EM_ANDAMENTO ou CONCLUIDA'.
            prazoFinal (str): Indica a data final de entrega.
            prioridade (str): Indica a prioridade da tarefa 'Essencial, Importante ou Desejável'.
            dataCriacao (str): Data e hora em que a tarefa foi criada.
            dataUtimaAtualizacao (str): Data e hora em que a tarefa foi atualizada.
    """
    def __init__(self, id, titulo, descricao, status, prazoFinal, prioridade):
        """Inicializa uma nova tarefa com os dados fornecidos.

        Args:
            id (str): ID da tarefa
            titulo (str): Título da tarefa
            status (str): Indica o status da tarefa: 'NAO_INICIADA, EM_ANDAMENTO ou CONCLUIDA'.
            prazoFinal (str): Indica a data final de entrega.
            prioridade (str): Indica a prioridade da tarefa 'Essencial, Importante ou Desejável'.
        """
        self.id = 'TRF' + id
        self.titulo = titulo
        self.descricao = descricao
        self.status = status
        self.prazoFinal = prazoFinal
        self.prioridade = self.descricao_prioridade(prioridade)
        self.dataCriacao = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
        self.dataUtimaAtualizacao = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
        
    def __str__(self):
        """Exibe os dados da tarefa com formatação específica.

        Returns:
            str: String com os dados da tarefa.
        """
        return f'ID: {self.id}\nTítulo: {self.titulo}\nStatus: {self.status}\nPrioridade: {self.prioridade}\nPrazo Final: {self.prazoFinal}\nCriado Em: {self.dataCriacao}\nAtualizado Em: {self.dataUtimaAtualizacao}\nDescrição: {self.descricao}\n'
   
    def atualizar_status(self, status):
        """Atualiza o status da tarefa com o dado fornecido.

        Args:
            status (str): Indica o status da tarefa: 'NAO_INICIADA, EM_ANDAMENTO ou CONCLUIDA'.

        Returns:
            Self@Tarefa: Retorna o objeto de Tarefa.
        """
        self.status = status
        self.dataUtimaAtualizacao = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
        return self

    def descricao_prioridade(self, prioridade):
        """Retorna a prioridade correpondente de acordo com o valor númerico.

        Args:
            prioridade (int): Representa a ordem de importância da atividade.

        Returns:
            str: Retorna o descritivo da prioridade 'Essencial, Importante ou Desejável'.
        """
        if prioridade == 0:
            return "Essencial"
        elif prioridade == 1:
            return "Importante"
        else:
            return "Desejável"