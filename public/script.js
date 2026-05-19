const form = document.getElementById('formChamado')

const listaChamados = document.getElementById('listaChamados')

// Buscar chamados
async function carregarChamados() {

    const resposta = await fetch('/chamados')

    const chamados = await resposta.json()

    listaChamados.innerHTML = ''

    chamados.forEach(chamado => {

        listaChamados.innerHTML += `
            <div class="chamado">
                <h3>${chamado.titulo}</h3>

                <p>${chamado.descricao}</p>

                <span>Status: ${chamado.status}</span>

                <br><br>

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

    await fetch(`/chamados/${id}`, {
        method: 'DELETE'
    })

    carregarChamados()

}