import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { fetchGames } from '../../api';

const placeholderImg = 'https://via.placeholder.com/400x300?text=No+Image';

function Content() {
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchGames({ per_page: '10' });
        if (data.success) setGames(data.games);
      } catch (e) {
        console.error("Ошибка загрузки:", e);
      }
    };
    load();
  }, []);

  if (games.length < 8) return null;

  const g6 = games[6];
  const g7 = games[7];
  const top4 = games.slice(0, 4);

  const imgSrc = (g: any) => g.image_url || placeholderImg;

  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Grid container spacing={2}>
        <Grid xs={12} md={8}>
          <Box sx={{ border: '1px solid #ddd', borderRadius: 2, p: 3, mb: 2, display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" gutterBottom color="primary">Популярные мобильные игры</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{g6.description?.substring(0, 150)}...</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{g6.description?.substring(150, 300)}...</Typography>
              <Link to={`/game/${g6.id}`} style={{ textDecoration: 'none' }}>
                <Button variant="outlined" size="small">Подробнее</Button>
              </Link>
            </Box>
            <Box sx={{ flex: 1 }}>
              <img src={imgSrc(g6)} alt={g6.title}
                style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 8 }}
                onError={(e) => { (e.target as HTMLImageElement).src = placeholderImg; }} />
            </Box>
          </Box>

          <Box sx={{ border: '1px solid #ddd', borderRadius: 2, p: 4, display: 'flex', gap: 2, minHeight: 350 }}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="body2" color="text.secondary">{g7.description?.substring(0, 150)}...</Typography>
            </Box>
            <Box sx={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={imgSrc(g7)} alt={g7.title}
                style={{ width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 8 }}
                onError={(e) => { (e.target as HTMLImageElement).src = placeholderImg; }} />
            </Box>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h5" gutterBottom color="primary">{g7.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{g7.description?.substring(150, 300)}...</Typography>
              <Link to={`/game/${g7.id}`} style={{ textDecoration: 'none' }}>
                <Button variant="outlined" size="small">Подробнее</Button>
              </Link>
            </Box>
          </Box>
        </Grid>

        <Grid xs={12} md={4}>
          <Box sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2 }}>
            <Typography variant="h6" gutterBottom color="primary" align="center">Топ мобильных игр</Typography>
            {top4.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2">{item.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.description?.substring(0, 80)}...
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Link to={`/game/${item.id}`} style={{ textDecoration: 'none' }}>
                      <Button size="small" variant="outlined">Подробнее</Button>
                    </Link>
                  </Box>
                </Box>
                <img src={imgSrc(item)} alt={item.title}
                  style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 4 }}
                  onError={(e) => { (e.target as HTMLImageElement).src = placeholderImg; }} />
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Content;