import express, { Request, Response } from 'express';

const router = express.Router();

const RAWG_API_KEY = process.env.RAWG_API_KEY;
const RAWG_BASE_URL = 'https://api.rawg.io/api/games';
const DEFAULT_PAGE_SIZE = 5;

// Buscar jogos na API RAWG
router.get('/games', async (req: Request, res: Response) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query de busca é obrigatória' });
    }

    if (!RAWG_API_KEY) {
      return res.status(500).json({ error: 'API key da RAWG não configurada' });
    }

    const searchUrl = `${RAWG_BASE_URL}?key=${RAWG_API_KEY}&search=${encodeURIComponent(query)}&page_size=${DEFAULT_PAGE_SIZE}`;
    
    const response = await fetch(searchUrl);

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: `Erro ao buscar jogos: ${response.statusText}` 
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar jogos:', error);
    res.status(500).json({ error: 'Erro ao buscar jogos' });
  }
});

export default router;

