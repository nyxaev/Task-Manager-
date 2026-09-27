# Task API

Uma pequena API REST para gerenciar tarefas (to-do list), construída com **TypeScript** e **Express**. Dados são guardados em memória (sem banco de dados), então é fácil de rodar localmente sem nenhuma configuração extra.

## Tecnologias

- TypeScript
- Express
- Vitest + Supertest (testes)
- tsx (execução em modo desenvolvimento com hot reload)

## Como rodar

```bash
# instalar dependências
npm install

# rodar em modo desenvolvimento (recarrega automaticamente)
npm run dev

# ou compilar e rodar em modo produção
npm run build
npm start
```

O servidor sobe em `http://localhost:3000` por padrão (pode mudar com a variável de ambiente `PORT`).

## Rodar os testes

```bash
npm test
```

## Endpoints

| Método | Rota          | Descrição                        |
|--------|---------------|-----------------------------------|
| GET    | `/tasks`      | Lista todas as tarefas            |
| GET    | `/tasks/:id`  | Busca uma tarefa por id           |
| POST   | `/tasks`      | Cria uma nova tarefa              |
| PUT    | `/tasks/:id`  | Atualiza título e/ou status       |
| DELETE | `/tasks/:id`  | Remove uma tarefa                 |

### Exemplo de uso

```bash
# criar uma tarefa
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Estudar TypeScript"}'

# listar tarefas
curl http://localhost:3000/tasks

# marcar como concluída
curl -X PUT http://localhost:3000/tasks/<id> \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# remover
curl -X DELETE http://localhost:3000/tasks/<id>
```

## Estrutura do projeto

```
src/
  app.ts          # configuração do Express (separado do listen para facilitar testes)
  index.ts        # ponto de entrada, sobe o servidor
  types.ts        # tipos TypeScript
  data.ts         # camada de dados (em memória)
  routes/
    tasks.ts      # rotas e validação de /tasks
tests/
  tasks.test.ts   # testes automatizados do fluxo CRUD
```

## Próximos passos possíveis

- Trocar o armazenamento em memória por um banco real (SQLite, PostgreSQL)
- Adicionar autenticação
- Adicionar paginação em `GET /tasks`
- Configurar GitHub Actions para rodar os testes automaticamente a cada push
