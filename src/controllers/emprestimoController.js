const emprestimoService = require('../services/emprestimoService')

async function create(req, res) {
  try {
    await emprestimoService.registrar(req.body)
    res.status(201).json({ message: 'Empréstimo registrado com sucesso' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

async function devolver(req, res) {
  try {
    await emprestimoService.devolver(Number(req.params.id), req.body.valor_multa_diaria)
    res.json({ message: 'Devolução registrada com sucesso' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

module.exports = { create, devolver }
