import type { User as PrismaUser } from '@prisma/client';

declare global {
  namespace Express {
    interface User extends PrismaUser {}
    
    interface Request {
      user?: User;
      login(user: any, callback: (err?: any) => void): void;
      logout(callback: (err?: any) => void): void;
      isAuthenticated(): boolean;
    }
  }
}

export {};

