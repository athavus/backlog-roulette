# Backlog Roulette

Não sabe o que jogar? A roleta decide por você! Um app para gerenciar seu backlog de jogos com busca pela API do RAWG, status de progresso, avaliações e uma roleta para escolher aleatoriamente o próximo jogo.

## Features

- **Busca de Jogos** - Integração com API RAWG
- **Roleta** - Escolha aleatória do próximo jogo
- **Status de Progresso** - Backlog, Jogando, Zerado, Abandonado
- **Avaliações** - Rate e comente seus jogos
- **Tema Claro/Escuro** - Com detecção automática do sistema
- **Autenticação** - Login com Google/GitHub via Supabase
- **Responsivo** - Funciona em desktop, tablet e mobile

---

## Estrutura do Projeto

```
backlog-roulette/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── .env               # Variáveis do frontend
│
└── server/                 # Backend (Express + Prisma)
    ├── routes/
    ├── lib/
    ├── prisma/
    ├── package.json
    └── .env               # Variáveis do backend
```

---

## Quick Start

### 1. Clone o Repositório

```bash
git clone https://github.com/athauvs/backlog-roulette.git
cd backlog-roulette
```

### 2. Instale as Dependências

```bash
# Instala dependências do cliente e servidor
npm run install:all
```

### 3. Configure as Variáveis de Ambiente

#### Client (.env)
Crie `client/.env` baseado em `client/.env.example`:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key
VITE_RAWG_API_URL=https://api.rawg.io/api/games
VITE_RAWG_API_KEY=sua-rawg-api-key
VITE_API_URL=http://localhost:3001
```

#### Server (.env)
Crie `server/.env` baseado em `server/.env.example`:

```env
VITE_DATABASE_URL=postgresql://postgres:senha@host:6543/postgres?pgbouncer=true
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### 4. Configure o Banco de Dados

```bash
cd server
npm run db:generate    # Gera o Prisma Client
npm run db:push        # Sincroniza o schema com o Supabase
cd ..
```

### 5. Rode o Projeto

**Terminal 1 - Frontend:**
```bash
npm run dev:client
```

**Terminal 2 - Backend:**
```bash
npm run dev:server
```

**URLs:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/health

---

## Scripts Disponíveis

### Root (monorepo)
| Script | Descrição |
|--------|-----------|
| `npm run install:all` | Instala deps do client + server |
| `npm run dev:client` | Roda o frontend |
| `npm run dev:server` | Roda o backend |
| `npm run build:client` | Build do frontend |

### Client
| Script | Descrição |
|--------|-----------|
| `npm run dev` | Desenvolvimento (Vite) |
| `npm run build` | Build de produção |
| `npm run lint` | Linter ESLint |
| `npm run preview` | Preview do build |

### Server
| Script | Descrição |
|--------|-----------|
| `npm run dev` | Desenvolvimento (tsx watch) |
| `npm run start` | Produção |
| `npm run db:generate` | Gera Prisma Client |
| `npm run db:push` | Sincroniza schema |
| `npm run db:studio` | Prisma Studio (GUI) |

---

## API Endpoints

### Games
- `GET /api/games/user/:userId` - Lista jogos do usuário
- `GET /api/games/user/:userId/roulette` - Jogos na roleta
- `GET /api/games/:id` - Detalhes de um jogo
- `POST /api/games` - Adiciona jogo
- `PATCH /api/games/:id` - Atualiza status
- `DELETE /api/games/:id` - Remove jogo

### Users
- `GET /api/users/:id` - Dados do usuário
- `POST /api/users/sync` - Sincroniza com Supabase Auth
- `PATCH /api/users/:id` - Atualiza perfil
- `GET /api/users/:id/profile` - Perfil público

### Reviews
- `GET /api/reviews/game/:userGameId` - Review de um jogo
- `GET /api/reviews/public/:rawgGameId` - Reviews públicas
- `POST /api/reviews` - Cria review
- `PATCH /api/reviews/:id` - Atualiza review
- `DELETE /api/reviews/:id` - Deleta review

---

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- TailwindCSS 4
- Supabase Auth
- RAWG API

### Backend
- Express 5
- TypeScript
- Prisma 7
- PostgreSQL (Supabase)
- CORS

---

## License

MIT
