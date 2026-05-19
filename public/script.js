let filtroAtual = 'todos'

const form = document.getElementById('formChamado')

const listaChamados = document.getElementById('listaChamados')

// Buscar chamados
async function carregarChamados() {

    const resposta = await fetch('/chamados')

    const chamados = await resposta.json()

    listaChamados.innerHTML = ''

    let chamadosFiltrados = chamados

    if (filtroAtual !== 'todos') {
        chamadosFiltrados = chamados.filter(c => c.status === filtroAtual)
    }

    chamadosFiltrados.forEach(chamado => {

        listaChamados.innerHTML += `
            <div class="chamado">
                <h3>${chamado.titulo}</h3>

                <p>${chamado.descricao}</p>

                <span class="status-${chamado.status}">
                    ${chamado.status}
                </span>

                <br><br>

                <button onclick="concluirChamado(${chamado.id})">
                    Concluir
                </button>

                <button onclick="deletarChamado(${chamado.id})">
                    Deletar
                </button>

            </div>
        `
    })

}

// Criar chamado
form.addEventListener('submit', async (event) => {

    event.preventDefault()

    const titulo = document.getElementById('titulo').value

    const descricao = document.getElementById('descricao').value

    await fetch('/chamados', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            titulo,
            descricao
        })

    })

    form.reset()

    carregarChamados()

})

carregarChamados()

async function deletarChamado(id) {

    const confirmar = confirm('Tem certeza que deseja deletar este chamado?')

    if (!confirmar) return

    await fetch(`/chamados/${id}`, {
        method: 'DELETE'
    })

    carregarChamados()
}

async function concluirChamado(id) {

    await fetch(`/chamados/${id}`, {

        method: 'PUT',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            status: 'concluido'
        })

    })

    carregarChamados()
}

// Filtra chamados
function setFiltro(filtro) {
    filtroAtual = filtro
    carregarChamados()
}

carregarChamados()