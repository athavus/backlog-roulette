import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

try {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL não está definido no arquivo .env');
  }

  // Criar pool de conexões PostgreSQL
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  // Criar adapter PostgreSQL
  const adapter = new PrismaPg(pool);

  prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

  // Testar conexão com o banco (assíncrono, não bloqueia)
  prisma.$connect()
    .then(() => {
      console.log('✅ Conectado ao banco de dados (Prisma)');
    })
    .catch((error: any) => {
      console.error('❌ Erro ao conectar ao banco de dados:', error.message);
      console.error('💡 Verifique se o DATABASE_URL está correto no .env');
      console.error('💡 Certifique-se de que executou: npx prisma migrate dev');
    });
} catch (error: any) {
  console.error('❌ Erro ao criar Prisma Client:', error.message);
  console.error('💡 Execute: npx prisma generate');
  throw error;
}

export { prisma };

