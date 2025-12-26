import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Ensuring env vars are loaded
dotenv.config();

const connectionString = process.env.VITE_DATABASE_URL || process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL or VITE_DATABASE_URL is not defined in environment variables');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;
