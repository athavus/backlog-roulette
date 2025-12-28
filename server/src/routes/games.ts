import express, { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';

const router = express.Router();

// Middleware para verificar autenticação
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Não autenticado' });
};

// Obter todos os jogos da roleta do usuário
router.get('/roulette', isAuthenticated, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const games = await prisma.rouletteGame.findMany({
      where: { userId: req.user.id },
      orderBy: { addedAt: 'desc' }
    });

    res.json(games.map(game => ({
      id: game.gameId,
      name: game.name
    })));
  } catch (error) {
    console.error('Erro ao buscar jogos:', error);
    res.status(500).json({ error: 'Erro ao buscar jogos' });
  }
});

// Adicionar jogo à roleta
router.post('/roulette', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const { id, name } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    if (!id || !name) {
      return res.status(400).json({ error: 'ID e nome do jogo são obrigatórios' });
    }

    // Verificar se o jogo já existe
    const existingGame = await prisma.rouletteGame.findUnique({
      where: {
        userId_gameId: {
          userId: req.user.id,
          gameId: id
        }
      }
    });

    if (existingGame) {
      return res.status(400).json({ error: 'Jogo já está na roleta' });
    }

    const game = await prisma.rouletteGame.create({
      data: {
        userId: req.user.id,
        gameId: id,
        name
      }
    });

    res.json({
      id: game.gameId,
      name: game.name
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Jogo já está na roleta' });
    }
    console.error('Erro ao adicionar jogo:', error);
    res.status(500).json({ error: 'Erro ao adicionar jogo' });
  }
});

// Remover jogo da roleta
router.delete('/roulette/:gameId', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const gameId = parseInt(req.params.gameId);

    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const game = await prisma.rouletteGame.findUnique({
      where: {
        userId_gameId: {
          userId: req.user.id,
          gameId
        }
      }
    });

    if (!game) {
      return res.status(404).json({ error: 'Jogo não encontrado na roleta' });
    }

    await prisma.rouletteGame.delete({
      where: { id: game.id }
    });

    res.json({ message: 'Jogo removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover jogo:', error);
    res.status(500).json({ error: 'Erro ao remover jogo' });
  }
});

// Sincronizar jogos do localStorage com o banco de dados
router.post('/roulette/sync', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const { games } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const userId = req.user.id;

    if (!Array.isArray(games)) {
      return res.status(400).json({ error: 'Lista de jogos inválida' });
    }

    // Obter jogos existentes no banco
    const existingGames = await prisma.rouletteGame.findMany({
      where: { userId }
    });
    const existingGameIds = new Set(existingGames.map(g => g.gameId));

    // Adicionar apenas jogos que não existem no banco
    const gamesToAdd = games.filter((game: { id: number; name: string }) => !existingGameIds.has(game.id));

    if (gamesToAdd.length > 0) {
      await prisma.rouletteGame.createMany({
        data: gamesToAdd.map((game: { id: number; name: string }) => ({
          userId,
          gameId: game.id,
          name: game.name
        })),
        skipDuplicates: true
      });
    }

    // Retornar todos os jogos atualizados
    const allGames = await prisma.rouletteGame.findMany({
      where: { userId: req.user.id },
      orderBy: { addedAt: 'desc' }
    });

    res.json({
      message: `${gamesToAdd.length} jogo(s) sincronizado(s)`,
      games: allGames.map(game => ({
        id: game.gameId,
        name: game.name
      }))
    });
  } catch (error) {
    console.error('Erro ao sincronizar jogos:', error);
    res.status(500).json({ error: 'Erro ao sincronizar jogos' });
  }
});

export default router;
