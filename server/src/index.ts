import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import cors from "cors";
import dotenv from "dotenv";

// Carregar variáveis de ambiente primeiro
dotenv.config();

console.log("Iniciando servidor...");
console.log("Variaveis de ambiente:", {
  PORT: process.env.PORT || "3001 (padrao)",
  DATABASE_URL: process.env.DATABASE_URL ? "Configurado" : "NAO CONFIGURADO",
  SESSION_SECRET: process.env.SESSION_SECRET
    ? "Configurado"
    : "NAO CONFIGURADO",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? "Configurado" : "Opcional",
  RAWG_API_KEY: process.env.RAWG_API_KEY ? "Configurado" : "NAO CONFIGURADO",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173 (padrao)",
});

// Importar Prisma (vai dar erro se nao foi gerado)
import "./lib/prisma.js";
console.log("Prisma Client carregado");

// Importar rotas e passport
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.js";
import gamesRoutes from "./routes/games.js";
import searchRoutes from "./routes/search.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Necessário para o Passport/Express identificar o protocolo correto (https) atrás do proxy do Render
app.set("trust proxy", 1);

// Middlewares - CORS permitindo qualquer origem
app.use(
  cors({
    origin: true, // Permite qualquer origem
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie'],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Configuracao de sessao com PostgreSQL
try {
  const PgSession = connectPgSimple(session);
  const isProduction = process.env.NODE_ENV === "production";

  app.use(
    session({
      name: "sessionId", // Nome explícito do cookie
      store: new PgSession({
        conString: process.env.DATABASE_URL,
        tableName: "session",
        createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET || "your-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: isProduction, // true em produção (HTTPS) - OBRIGATÓRIO para sameSite: 'none'
        sameSite: isProduction ? "none" : "lax", // "none" permite cross-origin em produção
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
        path: '/', // Path deve ser '/' para funcionar em todas as rotas
        // NÃO definir domain - permite que o cookie funcione cross-origin
      },
    }),
  );
  console.log("Sessao configurada com PostgreSQL");
  console.log("Configuracao de cookie:", {
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    httpOnly: true,
    path: '/',
    name: "sessionId",
  });
} catch (error: any) {
  console.error("Erro ao configurar sessao:", error.message);
  console.error("Verifique se o DATABASE_URL esta correto");
  throw error;
}

// Middleware de debug para todas as requisicoes (após session)
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[IN] ${req.method} ${req.path}`);
  if (req.path.includes('/auth/me')) {
    console.log(`[DEBUG] Origin: ${req.headers.origin}`);
    console.log(`[DEBUG] Cookie header: ${req.headers.cookie || 'NENHUM'}`);
    console.log(`[DEBUG] Session ID: ${req.sessionID || 'NENHUM'}`);
  }
  next();
});

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());
console.log("Passport inicializado");

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/games", gamesRoutes);
app.use("/api/search", searchRoutes);
console.log("Rotas registradas");

// Rota de health check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    routes: {
      auth: "/api/auth",
      games: "/api/games",
      search: "/api/search",
    },
  });
});

// Rota de teste
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Backlog Roulette API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth",
      games: "/api/games",
      search: "/api/search",
    },
  });
});

// Tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Erro no servidor:", err);
  res.status(500).json({
    error: "Erro interno do servidor",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Tratamento de rotas nao encontradas
app.use((req: Request, res: Response) => {
  console.log(`Rota nao encontrada: ${req.method} ${req.path}`);
  res.status(404).json({
    error: "Rota nao encontrada",
    path: req.path,
    method: req.method,
    availableRoutes: [
      "GET /api/health",
      "POST /api/auth/register",
      "POST /api/auth/login",
      "GET /api/auth/me",
      "GET /api/auth/google",
      "GET /api/games/roulette",
      "GET /api/search/games?query=...",
    ],
  });
});

app.listen(PORT, () => { });
