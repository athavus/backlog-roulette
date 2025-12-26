import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// Get all games for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { status, inRoulette } = req.query;

        const where: any = { userId };
        if (status) where.status = status;
        if (inRoulette !== undefined) where.inRoulette = inRoulette === 'true';

        const games = await prisma.userGame.findMany({
            where,
            include: {
                review: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        res.json(games);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({ error: 'Failed to fetch games' });
    }
});

// Get a specific game by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const game = await prisma.userGame.findUnique({
            where: { id },
            include: {
                review: true,
                user: {
                    select: { id: true, name: true, image: true },
                },
            },
        });

        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }

        res.json(game);
    } catch (error) {
        console.error('Error fetching game:', error);
        res.status(500).json({ error: 'Failed to fetch game' });
    }
});

// Add a game to user's collection
router.post('/', async (req, res) => {
    try {
        const { userId, rawgGameId, gameName, gameImage, status, inRoulette } = req.body;

        if (!userId || !rawgGameId || !gameName) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const game = await prisma.userGame.upsert({
            where: {
                userId_rawgGameId: { userId, rawgGameId },
            },
            update: {
                status: status || 'BACKLOG',
                inRoulette: inRoulette ?? true,
                gameImage,
            },
            create: {
                userId,
                rawgGameId,
                gameName,
                gameImage,
                status: status || 'BACKLOG',
                inRoulette: inRoulette ?? true,
            },
        });

        res.status(201).json(game);
    } catch (error) {
        console.error('Error adding game:', error);
        res.status(500).json({ error: 'Failed to add game' });
    }
});

// Update game status
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status, inRoulette } = req.body;

        const updateData: any = {};
        if (status) updateData.status = status;
        if (inRoulette !== undefined) updateData.inRoulette = inRoulette;

        const game = await prisma.userGame.update({
            where: { id },
            data: updateData,
        });

        res.json(game);
    } catch (error) {
        console.error('Error updating game:', error);
        res.status(500).json({ error: 'Failed to update game' });
    }
});

// Remove game from collection
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.userGame.delete({
            where: { id },
        });

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting game:', error);
        res.status(500).json({ error: 'Failed to delete game' });
    }
});

// Get roulette games for a user
router.get('/user/:userId/roulette', async (req, res) => {
    try {
        const { userId } = req.params;

        const games = await prisma.userGame.findMany({
            where: {
                userId,
                inRoulette: true,
                status: 'BACKLOG',
            },
            select: {
                id: true,
                rawgGameId: true,
                gameName: true,
                gameImage: true,
            },
        });

        res.json(games);
    } catch (error) {
        console.error('Error fetching roulette games:', error);
        res.status(500).json({ error: 'Failed to fetch roulette games' });
    }
});

export default router;
