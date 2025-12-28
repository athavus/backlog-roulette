# Guia de Troubleshooting

## Problema: Rotas retornando 404

Se você está vendo erros como:
- `Cannot GET /auth/google`
- `Failed to load resource: 404`
- `/search/games?query=...` retornando 404

### Soluções:

#### 1. Verificar se o servidor está rodando

```bash
cd server
npm run dev
```

Você deve ver logs como:
```
🚀 Iniciando servidor...
✅ Prisma Client carregado
✅ Conectado ao banco de dados
✅ Servidor rodando na porta 3001
```

Se não ver esses logs, há um problema de inicialização.

#### 2. Verificar se o Prisma Client foi gerado

```bash
cd server
npx prisma generate
```

Isso deve criar/atualizar o cliente Prisma em `node_modules/.prisma/client`

#### 3. Verificar variáveis de ambiente

No arquivo `server/.env`, certifique-se de ter:

```env
PORT=3001
DATABASE_URL=postgresql://...
SESSION_SECRET=seu-secret-aqui
RAWG_API_KEY=sua-chave-rawg
CLIENT_URL=http://localhost:5173
```

#### 4. Verificar URL da API no frontend

No arquivo `client/.env`, certifique-se de ter:

```env
VITE_API_URL=http://localhost:3001/api
```

**IMPORTANTE:** A URL deve terminar com `/api`!

#### 5. Verificar se as rotas estão corretas

As rotas corretas são:
- `/api/auth/google` (não `/auth/google`)
- `/api/auth/me` (não `/auth/me`)
- `/api/search/games?query=...` (não `/search/games`)

#### 6. Testar conexão com o banco

```bash
cd server
npx prisma db push
```

Isso vai criar/atualizar as tabelas no banco.

#### 7. Verificar logs do servidor

O servidor agora mostra logs detalhados. Se não aparecer nada, verifique:

1. Se o terminal está no diretório correto (`server/`)
2. Se há erros de sintaxe no código
3. Se todas as dependências foram instaladas (`npm install`)

#### 8. Testar health check

Abra no navegador: `http://localhost:3001/api/health`

Deve retornar:
```json
{
  "status": "ok",
  "timestamp": "...",
  "routes": {...}
}
```

## Problema: Servidor não inicia

### Erro: "Prisma Client não encontrado"

```bash
cd server
npx prisma generate
npm run dev
```

### Erro: "Cannot find module '@prisma/client'"

```bash
cd server
npm install
npx prisma generate
```

### Erro: "DATABASE_URL não configurado"

1. Verifique se o arquivo `server/.env` existe
2. Verifique se `DATABASE_URL` está configurado
3. Formato: `postgresql://user:password@host:port/database`

## Problema: Frontend não encontra API

### Verificar URL no console do navegador

Abra o DevTools (F12) e veja qual URL está sendo chamada.

Se estiver chamando `http://localhost:3001/auth/...` (sem `/api`), o problema é no `.env` do cliente.

### Solução:

1. Verifique `client/.env`:
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

2. Reinicie o servidor de desenvolvimento do frontend:
   ```bash
   cd client
   npm run dev
   ```

## Checklist rápido

- [ ] Servidor rodando? (`npm run dev` no diretório `server/`)
- [ ] Prisma Client gerado? (`npx prisma generate`)
- [ ] Migrações aplicadas? (`npx prisma migrate dev`)
- [ ] `.env` do servidor configurado?
- [ ] `.env` do cliente tem `VITE_API_URL=http://localhost:3001/api`?
- [ ] Health check funciona? (`http://localhost:3001/api/health`)
- [ ] Logs aparecem no terminal do servidor?

