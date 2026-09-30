# 🧪 Apothecary API

API RESTful para gerenciamento de ingredientes de um apotecário, permitindo o cadastro, consulta, atualização e remoção de ingredientes com controle geral de cadastro; dados como nome, preço, estoque, descrição e data de validade.

Projeto desenvolvido para as disciplinas **Laboratório de Desenvolvimento Web (LDW)** e **Integração e Entrega Contínua (IEC)**.

---

## Tecnologias

- **Node.js** + **TypeScript**
- **Express** — framework HTTP
- **Sequelize** — ORM para PostgreSQL
- **PostgreSQL** — banco de dados relacional (Supabase ou local via Docker)
- **Swagger (OpenAPI 3.0)** — documentação interativa
- **Docker** + **Docker Compose** — containerização
- **GitHub Actions** — pipeline de CI
- **ESLint** + **Prettier** — padronização de código
- **Husky** + **lint-staged** — Git hooks
- **pnpm** — gerenciador de pacotes

---

## Pré-requisitos

- [Node.js 20+](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation) (`npm install -g pnpm` ou `corepack enable pnpm`)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (opcional, para rodar com containers)
- Uma instância PostgreSQL — pode ser:
  - Local (Docker Compose)
  - Na nuvem ([Supabase](https://supabase.com/) — gratuito)

---

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/<seu-usuario>/<seu-repo>.git
cd Apothecary
pnpm install
```

---

## Configuração do Ambiente

Copie o arquivo de exemplo e preencha as variáveis:

```bash
cp .env.example .env
```

Variáveis disponíveis:

| Variável      | Descrição              | Exemplo                             |
| ------------- | ---------------------- | ----------------------------------- |
| `PORT`        | Porta do servidor HTTP | `3000`                              |
| `DB_NAME`     | Nome do banco de dados | `apothecary`                        |
| `DB_USER`     | Usuário do PostgreSQL  | `postgres`                          |
| `DB_PASSWORD` | Senha do banco         | `sua_senha`                         |
| `DB_HOST`     | Host do banco          | `localhost` ou `db.xxx.supabase.co` |
| `DB_PORT`     | Porta do banco         | `5432`                              |
| `DB_SSL`      | Habilitar SSL          | `false` (local) / `true` (Supabase) |

> !! **Nunca** commite o arquivo `.env` — ele já está no `.gitignore`. Use apenas o `.env.example` como referência.

---

## Executando o Projeto

### Opção 1 — Localmente (com `pnpm dev`)

```bash
pnpm dev
```

O servidor sobe em `http://localhost:3000` com hot-reload.

### Opção 2 — Com Docker Compose

Sobe a API **e** um PostgreSQL local, tudo isolado em containers:

```bash
docker compose up --build
```

Para derrubar:

```bash
docker compose down        # preserva os dados
docker compose down -v     # apaga o volume do banco
```

---

## Documentação Interativa (Swagger)

Com o servidor rodando, acesse:

```
http://localhost:3000/api-docs
```

O painel Swagger UI permite visualizar todos os endpoints, esquemas de entrada e testar requisições reais clicando em **Try it out**.

---

## Endpoints

Base URL: `http://localhost:3000`

| Método   | Rota               | Descrição                   | Status de Sucesso |
| -------- | ------------------ | --------------------------- | ----------------- |
| `GET`    | `/health`          | Health check do servidor    | `200 OK`          |
| `GET`    | `/ingredients`     | Lista todos os ingredientes | `200 OK`          |
| `GET`    | `/ingredients/:id` | Busca um ingrediente por ID | `200 OK`          |
| `POST`   | `/ingredients`     | Cria um novo ingrediente    | `201 Created`     |
| `PUT`    | `/ingredients/:id` | Atualiza um ingrediente     | `200 OK`          |
| `DELETE` | `/ingredients/:id` | Remove um ingrediente       | `204 No Content`  |

### Exemplo de payload (POST / PUT)

```json
{
  "name": "Camomila",
  "price": 12.5,
  "stock": 100,
  "description": "Flor seca de camomila para chás calmantes",
  "expiration": "2027-06-15"
}
```

### Códigos de erro

- `400 Bad Request` — campos obrigatórios ausentes ou inválidos
- `404 Not Found` — ingrediente não encontrado
- `500 Internal Server Error` — falha interna do servidor

---

## Scripts Disponíveis

| Comando          | Descrição                                              |
| ---------------- | ------------------------------------------------------ |
| `pnpm dev`       | Inicia o servidor em modo desenvolvimento (hot-reload) |
| `pnpm build`     | Compila TypeScript para JavaScript em `dist/`          |
| `pnpm start`     | Executa o build de produção (`node dist/server.js`)    |
| `pnpm lint`      | Executa o ESLint em todo o projeto                     |
| `pnpm format`    | Formata o código com Prettier                          |
| `pnpm typecheck` | Valida tipos sem gerar arquivos (`tsc --noEmit`)       |

---

## Estrutura do Projeto

```
Apothecary/
├── .github/
│   └── workflows/
│       └── ci.yml              # Pipeline de CI (GitHub Actions)
├── .husky/
│   └── pre-commit              # Hook que roda lint + typecheck antes de commitar
├── src/
│   ├── config/
│   │   ├── database.ts         # Conexão Sequelize com PostgreSQL
│   │   └── swagger.ts          # Configuração do Swagger
│   ├── controllers/
│   │   └── IngredientController.ts
│   ├── models/
│   │   └── Ingredient.ts       # Model tipado do Sequelize
│   ├── routes/
│   │   └── IngredientRoutes.ts # Rotas + anotações OpenAPI
│   ├── app.ts                  # Configuração do Express (middlewares + rotas)
│   └── server.ts               # Ponto de entrada (bootstrap + listen)
├── .dockerignore
├── .env.example
├── docker-compose.yml
├── Dockerfile
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

---

## CI/CD

O pipeline do **GitHub Actions** (`.github/workflows/ci.yml`) é disparado automaticamente em cada `push` e `pull_request` para a branch `main`.

Steps executados:

1. Checkout do repositório
2. Setup do Node.js 20 e pnpm
3. Instalação de dependências (`pnpm install --frozen-lockfile`)
4. Lint (`pnpm lint`)
5. Prettier (`pnpm format`)
6. Validação de tipos (`pnpm typecheck`)
7. Build (`pnpm build`)

Se qualquer step falhar, o workflow marca o commit como ❌ vermelho.

---

## Docker

O `Dockerfile` usa **multi-stage build**:

- **Stage 1 (`builder`)**: instala todas as dependências (incluindo dev) e compila TypeScript para JavaScript.
- **Stage 2 (`runner`)**: instala apenas dependências de produção e copia o `dist/` gerado. Resultado: imagem final enxuta e sem código-fonte TypeScript.

O `docker-compose.yml` orquestra:

- **`db`**: PostgreSQL 16 (com volume `pgdata` para persistência)
- **`api`**: aplicação Node compilada
- Healthcheck garante que a API só sobe depois do banco estar pronto
- A API se conecta ao banco pelo **nome do serviço** (`db`) na rede interna do Docker

---

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
