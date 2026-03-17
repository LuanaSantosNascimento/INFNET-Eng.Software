// Funções utilitárias para manipulação do DOM
export function showAlert(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alert.role = 'alert';
    alert.innerHTML = `${message}<button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 4000);
}

export function renderTabelaContas(contas, onEditar, onExcluir) {
    const tabelaBody = document.querySelector('#tabela-contas tbody');
    if (contas.length === 0) {
        tabelaBody.innerHTML = '<tr><td colspan="4">Nenhuma conta encontrada.</td></tr>';
        return;
    }
    tabelaBody.innerHTML = '';
    contas.forEach(conta => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${conta.id}</td>
            <td>${conta.nome}</td>
            <td>R$ ${conta.saldo.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-warning me-1">Editar</button>
                <button class="btn btn-sm btn-danger">Excluir</button>
            </td>
        `;
        tr.querySelector('.btn-warning').onclick = () => onEditar(conta);
        tr.querySelector('.btn-danger').onclick = () => onExcluir(conta);
        tabelaBody.appendChild(tr);
    });
}

