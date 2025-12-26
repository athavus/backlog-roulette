import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                image: true,
                profilePublic: true,
                createdAt: true,
                _count: {
                    select: {
                        games: true,
                        reviews: true,
                    },
                },
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// Get or create user from Supabase auth
router.post('/sync', async (req, res) => {
    try {
        const { email, name, image, provider, providerId } = req.body;

        if (!email || !provider || !providerId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const user = await prisma.user.upsert({
            where: {
                provider_providerId: { provider, providerId },
            },
            update: {
                name,
                image,
                email,
            },
            create: {
                email,
                name,
                image,
                provider,
                providerId,
            },
        });

        res.json(user);
    } catch (error) {
        console.error('Error syncing user:', error);
        res.status(500).json({ error: 'Failed to sync user' });
    }
});

// Update user profile
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, profilePublic } = req.body;

        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (profilePublic !== undefined) updateData.profilePublic = profilePublic;

        const user = await prisma.user.update({
            where: { id },
            data: updateData,
        });

        res.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// Get user's public profile with games and reviews
router.get('/:id/profile', async (req, res) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                image: true,
                profilePublic: true,
                createdAt: true,
                games: {
                    where: { status: 'COMPLETED' },
                    select: {
                        id: true,
                        gameName: true,
                        gameImage: true,
                        status: true,
                        review: {
                            where: { isPublic: true },
                            select: {
                                rating: true,
                                content: true,
                                createdAt: true,
                            },
                        },
                    },
                    orderBy: { updatedAt: 'desc' },
                    take: 20,
                },
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.profilePublic) {
            return res.status(403).json({ error: 'Profile is private' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

export default router;
