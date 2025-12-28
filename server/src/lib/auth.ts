import bcrypt from 'bcryptjs';
import { User } from '@prisma/client';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function sanitizeUser(user: User) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

