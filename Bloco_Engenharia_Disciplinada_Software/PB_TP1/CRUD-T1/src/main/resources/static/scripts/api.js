// Funções para integração com a API REST
const API_URL = 'http://localhost:8080/contas';

export async function listarContas() {
    const resp = await fetch(API_URL);
    if (!resp.ok) throw new Error('Erro ao buscar contas');
    return await resp.json();
}

export async function criarConta(nome, saldo) {
    const resp = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, saldo })
    });
    if (!resp.ok) throw new Error('Erro ao criar conta');
    return await resp.json();
}

export async function atualizarConta(id, nome, saldo) {
    const resp = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, saldo })
    });
    if (!resp.ok) throw new Error('Erro ao atualizar conta');
    return await resp.json();
}

export async function excluirConta(id) {
    const resp = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!resp.ok) throw new Error('Erro ao excluir conta');
}

