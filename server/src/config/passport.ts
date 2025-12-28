import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
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
        return done(null, false, { message: 'Este email está associado a uma conta Google. Use o login com Google.' });
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

// Estratégia Google OAuth
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback'
    },
    async (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: User | null) => void) => {
      try {
        // Verificar se o usuário já existe
        let user = await prisma.user.findUnique({ where: { googleId: profile.id } });

        if (user) {
          return done(null, user);
        }

        // Verificar se existe usuário com o mesmo email
        const email = profile.emails?.[0]?.value?.toLowerCase();
        if (!email) {
          return done(new Error('Email não fornecido pelo Google'));
        }

        user = await prisma.user.findUnique({ where: { email } });

        if (user) {
          // Associar Google ID ao usuário existente
          user = await prisma.user.update({
            where: { id: user.id },
            data: {
              googleId: profile.id,
              avatar: user.avatar || profile.photos?.[0]?.value || undefined
            }
          });
          return done(null, user);
        }

        // Criar novo usuário
        user = await prisma.user.create({
          data: {
            googleId: profile.id,
            email,
            name: profile.displayName,
            avatar: profile.photos?.[0]?.value
          }
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  ));
}

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
