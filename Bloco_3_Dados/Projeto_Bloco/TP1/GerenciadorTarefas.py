from Tarefa import Tarefa
import sys

def main():
    """Executa o fluxo principal do programa
    """
    exibir_menu()

def exibir_menu():
    """Exibe o menu em loop com as operações disponíveis.
    """
    
    tarefas = []
    print("\nBem vindo ao seu gerenciador de tarefas! O que deseja executar hoje?")

    while True:
        print('-'*12 + " Menu " + '-'*12)
        print("[1] - Listar tarefas.")
        print("[2] - Remover tarefa.")
        print("[3] - Adicionar Tarefa.")
        print("[4] - Marcar tarefa como iniciada.")
        print("[5] - Marcar tarefa como concluída.")
        print("[9] - Sair.")
        
        acao = int(input("(Apenas números):  "))
        print('-'*30)
        
        executar_operacao(acao, tarefas) 
   

def executar_operacao(acao, listaTarefas):
    """Executa a operação escolhida pelo usuário.

    Args:
        acao (int): Indica qual ação será executada.
        listaTarefas (list): Lista com as tarefas existentes.
    """
    resultado = False
    
    match acao:
        case 1:
            resultado = verificar_itens_lista(listaTarefas)
            if resultado:
                listar_tarefas(listaTarefas)
        case 2:
            resultado = verificar_itens_lista(listaTarefas)
            if resultado:
                remover_tarefa(listaTarefas)
        case 3:
            adicionar_tarefa(listaTarefas)
        case 4:
            resultado = verificar_itens_lista(listaTarefas)
            if resultado:
                atualizar_status_tarefa(listaTarefas, "EM_ANDAMENTO")
        case 5:
            resultado = verificar_itens_lista(listaTarefas)
            if resultado:
                return atualizar_status_tarefa(listaTarefas, "CONCLUIDA")
        case 9:
            print("Finalizando programa...")
            sys.exit(0)
        case _:
            print("O número informado não possui ação correspondente.")
            
def listar_tarefas(tarefas):
    """Exibe os itens da lista de tarefas utilizando o método __str__ do objeto de Tarefa

    Args:
        tarefas (list): Lista de tarefas
    """
    for t in tarefas:
        print(t)
         
def remover_tarefa(tarefas):
    """Remove um item da lista de tarefas.

    Args:
        tarefas (list): Lista de tarefas
    """
    exibir_id_tarefas(tarefas)
        
    id = input("Informe o ID do item a ser removido: ").upper()
    item_existe = False
    for t in tarefas:
        if t.id == id:
            item_existe = True
            tarefas.remove(t)
            print(f'Item {id} removido!'"")
            break
    
    if not item_existe:
        print(f'O item de ID {id} não existe.\n')
                    
def adicionar_tarefa(tarefas):
    """Obtém dados e adiciona um item na lista de tarefas.

    Args:
        tarefas (list): Lista de taefas.
    """
    titulo = input("Qual o título da sua tarefa?\n:  ")
    prazoFinal = input("Até quando essa tarefa deve ser finalizada?\n:  ")
    prioridade = int(input("Qual a prioridade desta tarefa?\n\t[0] Essencial\n\t[1] Importante\n\t[2] Desejável\n(Apenas números):  "))
    descricao = input("Informe a descrição desta tarefa, o que deve ser executado?  ")
    id = len(tarefas) + 1
    
    tarefas.append(Tarefa(str(id), titulo, descricao, "NAO_INICIADO", prazoFinal, prioridade))
            
def atualizar_status_tarefa(tarefas, status):
    """Atualiza o status de uma tarefa.

    Args:
        tarefas (list): Lista de tarefas
        status (str): Indica o status a ser atualizado "EM_ANDAMENTO ou "CONCLUIDA".
    """
    exibir_id_tarefas(tarefas)
    
    id = input("\nInforme o ID do item a ser atualizado: ").upper()
    item_existe = False
    for i in range(len(tarefas)):
        if tarefas[i].id == id:
            item_existe = True
            tarefas[i] = Tarefa.atualizar_status(tarefas[i], status)
            print(f'Item {id} atualizado!\n')
            break
    
    if not item_existe:
        print(f'O item de ID {id} não existe.\n')
    
def verificar_itens_lista(tarefas):
    """Verifica se há itens na lista de tarefas.

    Args:
        tarefas (list): Lista de tarefas

    Returns:
        bool: Retorna True quando há itens e False quando não há.
    """
    if (len(tarefas) != 0):
        return True
    else:
        print('Não existem tarefas cadastradas. \nAdicione sua primeira tarefa e continue com a operação desejada.\n\n')
        return False
        
def exibir_id_tarefas(tarefas):
    """Exibe ID e título das tarefas existentes.

    Args:
        tarefas (list): Lista de tarefas
    """
    for t in tarefas:
        print(f'[{t.id}] - {t.titulo}')

main()