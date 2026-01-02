import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { prisma } from '../lib/prisma.js';
import { comparePassword } from '../lib/auth.js';
import { User } from '@prisma/client';

// Estratégia Local (email/senha)
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email: string, password: string, done: (error: any, user?: User | false, info?: { message: string }) => void) => {
    try {
      const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

      if (!user) {
        return done(null, false, { message: 'Email ou senha incorretos' });
      }

      if (!user.password) {
        return done(null, false, { message: 'Este email está associado a uma conta externa. Tente recuperar sua senha.' });
      }

      const isMatch = await comparePassword(password, user.password);

      if (!isMatch) {
        return done(null, false, { message: 'Email ou senha incorretos' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialização do usuário para a sessão
passport.serializeUser((user: any, done: (err: any, id?: any) => void) => {
  done(null, user.id);
});

// Desserialização do usuário da sessão
passport.deserializeUser(async (id: string, done: (err: any, user?: User | null) => void) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
