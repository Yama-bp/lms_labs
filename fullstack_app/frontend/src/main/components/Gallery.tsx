import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchGames } from '../../api';

function Gallery() {
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchGames({ per_page: '10' });
        if (data.success) setGames(data.games.slice(0, 6));
      } catch (e) {
        console.error("Ошибка загрузки:", e);
      }
    };
    load();
  }, []);

  if (games.length === 0) return null;

  const fallbackImg = (game: any) => game.image_url || 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
        <Box sx={{
          width: { xs: '100%', md: '25%' }, height: { xs: 200, md: 320 },
          overflow: 'hidden', borderRadius: 3,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0'
        }}>
          <Link to={`/game/${games[0]?.id}`}>
            <img src={fallbackImg(games[0])} alt={games[0]?.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image'; }} />
          </Link>
        </Box>
        <Box sx={{
          width: { xs: '100%', md: '50%' },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2
        }}>
          {games.slice(1, 5).map((game) => (
            <Box key={game.id} sx={{
              overflow: 'hidden', borderRadius: 3, height: { xs: 200, sm: 153 },
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '1px solid #e0e0e0'
            }}>
              <Link to={`/game/${game.id}`}>
                <img src={fallbackImg(game)} alt={game.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image'; }} />
              </Link>
            </Box>
          ))}
        </Box>
        <Box sx={{
          width: { xs: '100%', md: '25%' }, height: { xs: 200, md: 320 },
          overflow: 'hidden', borderRadius: 3,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0'
        }}>
          <Link to={`/game/${games[5]?.id}`}>
            <img src={fallbackImg(games[5])} alt={games[5]?.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image'; }} />
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default Gallery;