// CRUD de contas bancárias - Integração com API REST
const API_URL = 'http://localhost:8080/contas';

// Elementos DOM
const tabelaBody = document.querySelector('#tabela-contas tbody');
const formCriar = document.getElementById('form-criar');
const inputNome = document.getElementById('nome');
const inputSaldo = document.getElementById('saldo');

const modalEditar = new bootstrap.Modal(document.getElementById('modalEditar'));
const formEditar = document.getElementById('form-editar');
const inputEditarId = document.getElementById('editar-id');
const inputEditarNome = document.getElementById('editar-nome');
const inputEditarSaldo = document.getElementById('editar-saldo');

const modalExcluir = new bootstrap.Modal(document.getElementById('modalExcluir'));
const inputExcluirId = document.getElementById('excluir-id');
const btnConfirmarExcluir = document.getElementById('btn-confirmar-excluir');

// Utilitário para exibir alertas
function showAlert(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alert.role = 'alert';
    alert.innerHTML = `${message}<button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 4000);
}

// Listar contas
async function listarContas() {
    tabelaBody.innerHTML = '<tr><td colspan="4">Carregando...</td></tr>';
    try {
        const resp = await fetch(API_URL);
        if (!resp.ok) throw new Error('Erro ao buscar contas');
        const contas = await resp.json();
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
                    <button class="btn btn-sm btn-warning me-1" onclick="abrirEditar(${conta.id}, '${conta.nome.replace(/'/g, "&#39;")}', ${conta.saldo})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="abrirExcluir(${conta.id})">Excluir</button>
                </td>
            `;
            tabelaBody.appendChild(tr);
        });
    } catch (e) {
        tabelaBody.innerHTML = '<tr><td colspan="4">Erro ao carregar contas.</td></tr>';
        showAlert(e.message, 'danger');
    }
}

// Criar conta
formCriar.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = inputNome.value.trim();
    const saldo = parseFloat(inputSaldo.value);
    if (!nome || isNaN(saldo) || saldo < 0) {
        showAlert('Preencha os campos corretamente.', 'warning');
        return;
    }
    try {
        const resp = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, saldo })
        });
        if (!resp.ok) throw new Error('Erro ao criar conta');
        formCriar.reset();
        showAlert('Conta criada com sucesso!');
        listarContas();
    } catch (e) {
        showAlert(e.message, 'danger');
    }
});

// Abrir modal de edição
window.abrirEditar = (id, nome, saldo) => {
    inputEditarId.value = id;
    inputEditarNome.value = nome;
    inputEditarSaldo.value = saldo;
    modalEditar.show();
};

// Editar conta
formEditar.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = inputEditarId.value;
    const nome = inputEditarNome.value.trim();
    const saldo = parseFloat(inputEditarSaldo.value);
    if (!nome || isNaN(saldo) || saldo < 0) {
        showAlert('Preencha os campos corretamente.', 'warning');
        return;
    }
    try {
        const resp = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, saldo })
        });
        if (!resp.ok) throw new Error('Erro ao atualizar conta');
        modalEditar.hide();
        showAlert('Conta atualizada com sucesso!');
        listarContas();
    } catch (e) {
        showAlert(e.message, 'danger');
    }
});

// Abrir modal de exclusão
window.abrirExcluir = (id) => {
    inputExcluirId.value = id;
    modalExcluir.show();
};

// Excluir conta
btnConfirmarExcluir.addEventListener('click', async () => {
    const id = inputExcluirId.value;
    try {
        const resp = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!resp.ok) throw new Error('Erro ao excluir conta');
        modalExcluir.hide();
        showAlert('Conta excluída com sucesso!');
        listarContas();
    } catch (e) {
        showAlert(e.message, 'danger');
    }
});

// Inicialização
listarContas();

