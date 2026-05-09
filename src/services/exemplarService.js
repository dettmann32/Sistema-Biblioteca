const { getConnection } = require('../db')

async function listar() {
  const pool = await getConnection()
  const result = await pool.request().query('SELECT id_exemplar, codigo_barras, condicao FROM exemplar')
  return result.recordset
}

module.exports = { listar }
