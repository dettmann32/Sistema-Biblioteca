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

function toast(msg, isError) {
  const el = document.getElementById('toast')
  el.textContent = msg
  el.className = 'toast show' + (isError ? ' error' : '')
  setTimeout(() => (el.className = 'toast hidden'), 3000)
}

async function loadSelect(selector, labelFn, url) {
  try {
    const items = await request('GET', url)
    const select = document.querySelector(selector)
    const placeholder = select.querySelector('option')
    select.innerHTML = ''
    select.appendChild(placeholder)
    items.forEach(item => {
      const opt = document.createElement('option')
      opt.value = Object.values(item)[0]
      opt.textContent = labelFn(item)
      select.appendChild(opt)
    })
  } catch (err) {
    toast('Erro ao carregar ' + selector + ': ' + err.message, true)
  }
}

async function loadEmprestimoSelects() {
  loadSelect('[name="id_aluno"]', a => `${a.nome} (${a.matricula})`, '/alunos')
  loadSelect('[name="id_exemplar"]', e => `${e.codigo_barras} - ${e.condicao}`, '/exemplares')
  loadSelect('[name="id_funcionario"]', f => `${f.nome} (${f.cargo})`, '/funcionarios')
  loadSelect('[name="id_emprestimo"]', e => `#${e.id_emprestimo} - Aluno ${e.id_aluno} (${e.data_emprestimo})`, '/emprestimos')
}

document.getElementById('form-emprestimo-create').addEventListener('submit', async (e) => {
  e.preventDefault()
  const fd = new FormData(e.target)
  const data = Object.fromEntries(fd)
  data.id_aluno = Number(data.id_aluno)
  data.id_exemplar = Number(data.id_exemplar)
  data.id_funcionario = Number(data.id_funcionario)
  data.dias_emprestimo = Number(data.dias_emprestimo)
  try {
    await request('POST', '/emprestimos', data)
    toast('Empréstimo registrado!')
    e.target.reset()
    e.target.querySelector('[name="dias_emprestimo"]').value = 7
    loadEmprestimoSelects()
  } catch (err) {
    toast(err.message, true)
  }
})

document.getElementById('form-emprestimo-return').addEventListener('submit', async (e) => {
  e.preventDefault()
  const fd = new FormData(e.target)
  const id = Number(fd.get('id_emprestimo'))
  const valor_multa_diaria = Number(fd.get('valor_multa_diaria'))
  try {
    await request('PUT', `/emprestimos/${id}/devolver`, { valor_multa_diaria })
    toast('Devolução registrada!')
    e.target.reset()
    e.target.querySelector('[name="valor_multa_diaria"]').value = 2.50
    loadEmprestimoSelects()
  } catch (err) {
    toast(err.message, true)
  }
})

loadEmprestimoSelects()
