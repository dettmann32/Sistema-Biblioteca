const API = 'http://localhost:3000/api'

async function request(method, path, body) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
  }
  if (body) opts.body = JSON.stringify(body)

  const res = await fetch(`${API}${path}`, opts)
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Erro desconhecido')
  return data
}

// ---- Toast ----
function toast(msg, isError) {
  const el = document.getElementById('toast')
  el.textContent = msg
  el.className = 'toast show' + (isError ? ' error' : '')
  setTimeout(() => (el.className = 'toast hidden'), 3000)
}

// ---- Alunos ----
async function loadAlunos(matricula) {
  const path = matricula ? `?matricula=${encodeURIComponent(matricula)}` : ''
  try {
    const alunos = await request('GET', `/alunos${path}`)
    renderAlunos(alunos)
  } catch (err) {
    toast(err.message, true)
  }
}

function renderAlunos(alunos) {
  const el = document.getElementById('alunos-list')
  if (!alunos.length) {
    el.innerHTML = '<p class="empty">Nenhum aluno encontrado.</p>'
    return
  }
  el.innerHTML = `
    <table>
      <thead><tr>
        <th>ID</th><th>Matrícula</th><th>Nome</th><th>Email</th><th>Telefone</th><th>Bloqueio</th><th>Ações</th>
      </tr></thead>
      <tbody>
        ${alunos.map(a => `
          <tr>
            <td>${a.id_aluno}</td>
            <td>${a.matricula}</td>
            <td>${a.nome}</td>
            <td>${a.email || '-'}</td>
            <td>${a.telefone || '-'}</td>
            <td>${a.status_bloqueio ? 'Sim' : 'Não'}</td>
            <td>
              <button class="small" onclick="editAluno(${a.id_aluno})">Editar</button>
              <button class="small danger" onclick="deleteAluno(${a.id_aluno})">Excluir</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>`
}

async function deleteAluno(id) {
  if (!confirm('Excluir este aluno?')) return
  try {
    await request('DELETE', `/alunos/${id}`)
    toast('Aluno excluído com sucesso!')
    loadAlunos()
  } catch (err) {
    toast(err.message, true)
  }
}

function editAluno(id) {
  const nome = prompt('Novo nome:')
  if (!nome) return
  const email = prompt('Novo email:')
  const telefone = prompt('Novo telefone:')
  const bloqueio = confirm('Aluno bloqueado? Clique OK para Sim, Cancelar para Não.')
  updateAluno(id, { nome, email, telefone, status_bloqueio: bloqueio ? 1 : 0 })
}

async function updateAluno(id, data) {
  try {
    await request('PUT', `/alunos/${id}`, data)
    toast('Aluno atualizado com sucesso!')
    loadAlunos()
  } catch (err) {
    toast(err.message, true)
  }
}

// ---- Forms ----
document.getElementById('form-aluno-create').addEventListener('submit', async (e) => {
  e.preventDefault()
  const fd = new FormData(e.target)
  const data = Object.fromEntries(fd)
  try {
    await request('POST', '/alunos', data)
    toast('Aluno cadastrado!')
    e.target.reset()
    loadAlunos()
  } catch (err) {
    toast(err.message, true)
  }
})

document.getElementById('btn-search-aluno').addEventListener('click', () => {
  loadAlunos(document.getElementById('search-matricula').value)
})
document.getElementById('btn-list-all-alunos').addEventListener('click', () => {
  document.getElementById('search-matricula').value = ''
  loadAlunos()
})

loadAlunos()
