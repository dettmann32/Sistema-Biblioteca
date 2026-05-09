# Sistema Biblioteca - API

## Pré-requisitos

- Node.js 18+
- SQL Server rodando em `localhost` com banco `tabalhodb`
- Scripts SQL em `database/` executados (estrutura + procedures)

## Instalar dependências

```bash
npm install
```

## Rodar

```bash
npm start
```

Servidor disponível em `http://localhost:3000`. O frontend é servido junto na mesma porta.

## Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Health check |
| GET | `/teste-db` | Testa conexão com o banco |
| POST | `/api/alunos` | Criar aluno |
| GET | `/api/alunos` | Listar alunos (`?matricula=XXX` para filtrar) |
| PUT | `/api/alunos/:id` | Atualizar aluno |
| DELETE | `/api/alunos/:id` | Excluir aluno |
| POST | `/api/emprestimos` | Registrar empréstimo |
| PUT | `/api/emprestimos/:id/devolver` | Registrar devolução |
