const { getConnection } = require('../db')

async function listar() {
  const pool = await getConnection()
  const result = await pool.request().query('SELECT id_funcionario, nome, cargo FROM funcionario')
  return result.recordset
}

module.exports = { listar }
