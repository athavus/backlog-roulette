import { useState, useEffect, useCallback } from 'react';

interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  genres: { name: string }[];
  platforms: { platform: { name: string } }[];
  metacritic?: number;
}

interface APIResponse {
  count: number;
  results: Game[];
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Sua chave da API RAWG (registre-se em https://rawg.io/apidocs)
  const API_KEY = '469dbab74c2c4030b512c7b5262483b6';
  const BASE_URL = 'https://api.rawg.io/api/games';

  // Função para buscar jogos na API
  const searchGames = useCallback(async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setGames([]);
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(
        `${BASE_URL}?key=${API_KEY}&search=${encodeURIComponent(query)}&page_size=5`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: APIResponse = await response.json();
      setGames(data.results);
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
      setGames([]);
    } finally {
      setLoading(false);
    }
  }, [API_KEY]);

  // Debounce para evitar muitas requisições
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchGames(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchGames]);

  // Função para selecionar um jogo
  const selectGame = (game: Game) => {
    setSearchTerm(game.name);
    setShowSuggestions(false);
    console.log('Jogo selecionado:', game);
  };

  // Função para formatar a data
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
      <div className="">
        <h1 className="">
          🎮 Busca de Jogos
        </h1>
        
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Digite o nome do jogo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              // Delay para permitir o clique nas sugestões
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            className=""
          />
          
          {loading && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm">
              Buscando...
            </div>
          )}
          
          {showSuggestions && games.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl max-h-96 overflow-y-auto z-50">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="flex items-center p-4 cursor-pointer hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                  onClick={() => selectGame(game)}
                >
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-16 h-16 rounded-lg object-cover shadow-md mr-4"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/64x64/6366f1/ffffff?text=No+Image';
                    }}
                  />
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-1">
                      {game.name}
                    </h3>
                    <div className="flex items-center gap-4 mb-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        ⭐ {game.rating}/5
                      </span>
                      {game.released && (
                        <span className="flex items-center gap-1">
                          📅 {formatDate(game.released)}
                        </span>
                      )}
                      {game.metacritic && (
                        <span className="flex items-center gap-1 text-green-600 font-semibold">
                          🏆 {game.metacritic}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {game.genres.slice(0, 3).map((genre, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-zinc-500 text-white text-xs rounded-full font-medium"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {showSuggestions && !loading && searchTerm.length >= 2 && games.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-6 text-center text-gray-600">
              Nenhum jogo encontrado para "{searchTerm}"
            </div>
          )}
        </div>
      </div>
  );
}

export default App;