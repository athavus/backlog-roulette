import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// Get review by game ID
router.get('/game/:userGameId', async (req, res) => {
    try {
        const { userGameId } = req.params;

        const review = await prisma.review.findUnique({
            where: { userGameId },
            include: {
                user: {
                    select: { id: true, name: true, image: true },
                },
            },
        });

        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        res.json(review);
    } catch (error) {
        console.error('Error fetching review:', error);
        res.status(500).json({ error: 'Failed to fetch review' });
    }
});

// Create or update a review
router.post('/', async (req, res) => {
    try {
        const { userGameId, userId, rating, content, isPublic } = req.body;

        if (!userGameId || !userId || rating === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (rating < 1 || rating > 10) {
            return res.status(400).json({ error: 'Rating must be between 1 and 10' });
        }

        const review = await prisma.review.upsert({
            where: { userGameId },
            update: {
                rating,
                content,
                isPublic: isPublic ?? false,
            },
            create: {
                userGameId,
                userId,
                rating,
                content,
                isPublic: isPublic ?? false,
            },
        });

        res.status(201).json(review);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Failed to create review' });
    }
});

// Update review
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, content, isPublic } = req.body;

        const updateData: any = {};
        if (rating !== undefined) {
            if (rating < 1 || rating > 10) {
                return res.status(400).json({ error: 'Rating must be between 1 and 10' });
            }
            updateData.rating = rating;
        }
        if (content !== undefined) updateData.content = content;
        if (isPublic !== undefined) updateData.isPublic = isPublic;

        const review = await prisma.review.update({
            where: { id },
            data: updateData,
        });

        res.json(review);
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ error: 'Failed to update review' });
    }
});

// Delete review
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.review.delete({
            where: { id },
        });

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: 'Failed to delete review' });
    }
});

// Get public reviews for a game (by RAWG ID)
router.get('/public/:rawgGameId', async (req, res) => {
    try {
        const rawgGameId = parseInt(req.params.rawgGameId);

        const reviews = await prisma.review.findMany({
            where: {
                isPublic: true,
                userGame: {
                    rawgGameId,
                },
            },
            include: {
                user: {
                    select: { id: true, name: true, image: true },
                },
            },
            orderBy: { createdAt: 'desc' },
            take: 20,
        });

        res.json(reviews);
    } catch (error) {
        console.error('Error fetching public reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

export default router;
