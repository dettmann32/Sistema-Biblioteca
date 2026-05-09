const path = require('path')
const express = require('express')
const { getConnection } = require('./db')
const alunoRoutes = require('./routes/aluno')
const emprestimoRoutes = require('./routes/emprestimo')

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'frontend')))

app.use('/api/alunos', alunoRoutes)
app.use('/api/emprestimos', emprestimoRoutes)

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
