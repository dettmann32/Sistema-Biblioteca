const { getConnection } = require('../db')

async function registrar(data) {
  const pool = await getConnection()
  await pool.request()
    .input('id_aluno', data.id_aluno)
    .input('id_exemplar', data.id_exemplar)
    .input('id_funcionario', data.id_funcionario)
    .input('dias_emprestimo', data.dias_emprestimo || 7)
    .execute('SP_Registrar_Emprestimo')
}

async function devolver(id, valor_multa_diaria) {
  const pool = await getConnection()
  await pool.request()
    .input('id_emprestimo', id)
    .input('valor_multa_diaria', valor_multa_diaria || 2.50)
    .execute('SP_Registrar_Devolucao')
}

module.exports = { registrar, devolver }
