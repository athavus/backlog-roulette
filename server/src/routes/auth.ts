import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { prisma } from '../lib/prisma.js';
import { hashPassword } from '../lib/auth.js';

const router = express.Router();

// Middleware para verificar autenticação
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Não autenticado' });
};

// Registrar novo usuário
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, senha e nome são obrigatórios' });
    }

    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({ 
      where: { email: email.toLowerCase() } 
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await hashPassword(password);

    // Criar novo usuário
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name
      }
    });

    // Fazer login automático após registro
    req.login(user, (err: any) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao fazer login após registro' });
      }
      const { password: _, ...userWithoutPassword } = user;
      res.json({
        user: userWithoutPassword
      });
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

// Login local
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) {
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    if (!user) {
      return res.status(401).json({ error: info?.message || 'Credenciais inválidas' });
    }
    req.login(user, (err: any) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao fazer login' });
      }
      const { password: _, ...userWithoutPassword } = user;
      res.json({
        user: userWithoutPassword
      });
    });
  })(req, res, next);
});

// Logout
router.post('/logout', (req: Request, res: Response) => {
  req.logout((err: any) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao fazer logout' });
    }
    res.json({ message: 'Logout realizado com sucesso' });
  });
});

// Verificar usuário autenticado
router.get('/me', isAuthenticated, (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Usuário não encontrado' });
  }
  const { password: _, ...userWithoutPassword } = req.user;
  res.json({
    user: userWithoutPassword
  });
});

// Rotas Google OAuth
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: process.env.CLIENT_URL || 'http://localhost:5173/login?error=google' 
  }),
  (req: Request, res: Response) => {
    // Redirecionar para o frontend com sucesso
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/auth/callback?success=true`);
  }
);

export default router;
