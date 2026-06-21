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
        const data = await fetchGames({ per_page: '100' });
        if (data.success) setGames(data.games);
      } catch (e) {
        console.error("Ошибка загрузки:", e);
      }
    };
    load();
  }, []);

  if (games.length < 8) return null;

  const g6 = games.find((g: any) => g.title === 'Subway Surfers') || games[6];
  const g7 = games.find((g: any) => g.title === 'Clash Royale') || games[7];
  const top4 = games.slice(0, 4);

  const imgSrc = (g: any) => g?.image_url || placeholderImg;

  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
        <Grid xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{
            border: '1px solid #e0e0e0', borderRadius: 3, p: 3, mb: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            backgroundColor: '#fafafa',
            flex: 1
          }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#1a237e', fontWeight: 600, fontFamily: '"Segoe UI", Roboto, sans-serif' }}>
              {g6?.title}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.7, fontFamily: '"Segoe UI", Roboto, sans-serif' }}>
                  {g6?.description ? g6.description.substring(0, 150) + '...' : ''}
                </Typography>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.7, mb: 2, fontFamily: '"Segoe UI", Roboto, sans-serif' }}>
                  {g6?.description ? g6.description.substring(150, 300) + '...' : ''}
                </Typography>
                <Link to={`/game/${g6?.id}`} style={{ textDecoration: 'none', alignSelf: 'flex-start' }}>
                  <Button variant="outlined" size="small" sx={{ borderRadius: 2, textTransform: 'none' }}>Подробнее</Button>
                </Link>
              </Box>
              <Box sx={{ flex: 1.2, display: 'flex', alignItems: 'stretch' }}>
                <img src={imgSrc(g6)} alt={g6?.title}
                  style={{ width: '100%', height: '100%', minHeight: 180, objectFit: 'cover', objectPosition: 'top', borderRadius: 12 }}
                  onError={(e) => { (e.target as HTMLImageElement).src = placeholderImg; }} />
              </Box>
            </Box>
          </Box>

          <Box sx={{
            border: '1px solid #e0e0e0', borderRadius: 3, p: 4,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            backgroundColor: '#fafafa',
            flex: 1
          }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#1a237e', fontWeight: 600, fontFamily: '"Segoe UI", Roboto, sans-serif' }}>
              {g7?.title}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'center' }}>
              <Box sx={{ flex: 1, order: { xs: 2, md: 1 } }}>
                <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.7, fontFamily: '"Segoe UI", Roboto, sans-serif' }}>
                  {g7?.description ? g7.description.substring(0, 150) + '...' : ''}
                </Typography>
              </Box>
              <Box sx={{ flex: 2, order: { xs: 1, md: 2 }, textAlign: 'center' }}>
                <img src={imgSrc(g7)} alt={g7?.title}
                  style={{ width: '100%', maxHeight: 320, objectFit: 'cover', objectPosition: 'top', borderRadius: 12 }}
                  onError={(e) => { (e.target as HTMLImageElement).src = placeholderImg; }} />
              </Box>
              <Box sx={{ flex: 1, order: { xs: 3, md: 3 }, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.7, mb: 2, fontFamily: '"Segoe UI", Roboto, sans-serif' }}>
                  {g7?.description ? g7.description.substring(150, 300) + '...' : ''}
                </Typography>
                <Link to={`/game/${g7?.id}`} style={{ textDecoration: 'none', alignSelf: 'flex-start' }}>
                  <Button variant="outlined" size="small" sx={{ borderRadius: 2, textTransform: 'none' }}>Подробнее</Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid xs={12} md={4} sx={{ display: 'flex' }}>
          <Box sx={{
            border: '1px solid #e0e0e0', borderRadius: 3, p: 2.5,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            backgroundColor: '#fafafa',
            width: '100%',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
          }}>
            <Typography variant="h6" gutterBottom align="center"
              sx={{ color: '#1a237e', fontWeight: 600, fontFamily: '"Segoe UI", Roboto, sans-serif', pb: 1, borderBottom: '2px solid #e0e0e0' }}>
              Топ мобильных игр
            </Typography>
            {top4.map((item, i) => (
              <Box key={item.id} sx={{
                display: 'flex', gap: 1.5, alignItems: 'center', py: 1.5,
                borderBottom: i < 3 ? '1px solid #f0f0f0' : 'none'
              }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, fontFamily: '"Segoe UI", Roboto, sans-serif' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#777', lineHeight: 1.4, fontFamily: '"Segoe UI", Roboto, sans-serif' }}>
                    {item.description ? item.description.substring(0, 80) + '...' : ''}
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Link to={`/game/${item.id}`} style={{ textDecoration: 'none' }}>
                      <Button size="small" variant="outlined" sx={{ borderRadius: 2, textTransform: 'none' }}>Подробнее</Button>
                    </Link>
                  </Box>
                </Box>
                <img src={imgSrc(item)} alt={item.title}
                  style={{ width: 85, height: 65, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
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