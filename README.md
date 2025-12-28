# Backlog Roulette

Repositório para gerenciar seu backlog de jogos com uma roleta aleatória, desenvolvido com TypeScript, React e Node.js.

## Funcionalidades

- 🔍 Busca de jogos usando a API RAWG
- 🎰 Roleta aleatória para escolher um jogo do backlog
- 👤 Autenticação com email/senha ou Google OAuth
- 💾 Sincronização automática entre localStorage e banco de dados
- ☁️ Dados salvos na nuvem quando logado

## Pré-requisitos

- Node.js (v18 ou superior)
- PostgreSQL (local ou Supabase)
- Conta Google (para OAuth - opcional)
- Conta RAWG.io (para API de jogos)

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/athauvs/backlog-roulette.git
cd backlog-roulette
```

### 2. Configure o Backend

```bash
cd server
npm install
```

Crie um arquivo `.env` na pasta `server` com as seguintes variáveis:

```env
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/backlog-roulette
SESSION_SECRET=seu-secret-key-aqui-mude-em-producao
GOOGLE_CLIENT_ID=seu-google-client-id
GOOGLE_CLIENT_SECRET=seu-google-client-secret
CLIENT_URL=http://localhost:5173
RAWG_API_KEY=sua-chave-rawg-api
```

**Para conectar ao Supabase:**
1. Acesse [Supabase](https://supabase.com/)
2. Crie um novo projeto
3. Vá em Settings > Database
4. Copie a connection string (URI) e adicione no `DATABASE_URL`
5. O formato será algo como: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

**Para obter a chave da API RAWG:**
1. Acesse [RAWG.io](https://rawg.io/)
2. Crie uma conta e obtenha sua API key
3. Adicione no arquivo `.env` do servidor como `RAWG_API_KEY`

**Para obter as credenciais do Google OAuth:**
1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a API "Google+ API"
4. Vá em "Credenciais" > "Criar credenciais" > "ID do cliente OAuth 2.0"
5. Configure as URLs de redirecionamento autorizadas: `http://localhost:3001/api/auth/google/callback`

### 3. Configure o Banco de Dados

Após configurar o `.env` no servidor, execute as migrações do Prisma:

```bash
cd server
npx prisma generate
npx prisma migrate dev --name init
```

Isso criará as tabelas necessárias no banco de dados.

### 4. Configure o Frontend

```bash
cd ../client
npm install
```

Crie um arquivo `.env` na pasta `client` (opcional, se quiser usar uma URL diferente):

```env
VITE_API_URL=http://localhost:3001/api
```

## Executando o Projeto

### Desenvolvimento

Abra dois terminais:

**Terminal 1 - Backend:**
```bash
cd server
npm install  # Instalar dependências (incluindo TypeScript e Prisma)
npx prisma generate  # Gerar cliente Prisma
npm run dev  # Roda com tsx watch para hot reload
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

O frontend estará disponível em `http://localhost:5173` e o backend em `http://localhost:3001`.

### Produção

**Backend:**
```bash
cd server
npm run build  # Compila TypeScript para JavaScript
npm start     # Roda o código compilado
```

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

## Estrutura do Projeto

```
backlog-roulette/
├── client/          # Frontend React + TypeScript
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── contexts/      # Contextos (Auth)
│   │   ├── hooks/        # Custom hooks
│   │   ├── services/     # Serviços de API
│   │   └── types/        # Tipos TypeScript
│   └── ...
├── server/          # Backend Node.js + Express
│   ├── src/
│   │   ├── config/       # Configurações (Passport)
│   │   ├── models/       # Modelos MongoDB
│   │   └── routes/       # Rotas da API
│   └── ...
└── README.md
```

## Funcionalidades de Autenticação

- **Registro**: Crie uma conta com email e senha
- **Login**: Faça login com suas credenciais
- **Google OAuth**: Entre rapidamente com sua conta Google
- **Sincronização**: Dados salvos localmente são automaticamente sincronizados quando você faz login

## Tecnologias Utilizadas

### Frontend
- React 19
- TypeScript
- Tailwind CSS
- Vite

### Backend
- Node.js
- TypeScript
- Express
- PostgreSQL + Prisma
- Passport.js (Local + Google OAuth)
- Express Session
- RAWG API (para busca de jogos)

## Licença

MIT
