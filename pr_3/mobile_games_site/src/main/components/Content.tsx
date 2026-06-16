import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import structures from "../../data";

function Content() {
  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Grid container spacing={2}>
        <Grid xs={12} md={8}>
          <Box sx={{ border: '1px solid #ddd', borderRadius: 2, p: 3, mb: 2, display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" gutterBottom color="primary">
                Популярные мобильные игры
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {structures[6].description[0]}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {structures[6].description[1]}
              </Typography>
              <Link to="/game/6" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" size="small">Подробнее</Button>
              </Link>
            </Box>
            <Box sx={{ flex: 1 }}>
              <img src={structures[6].img} alt={structures[6].title}
                style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 8 }} />
            </Box>
          </Box>

          <Box sx={{ border: '1px solid #ddd', borderRadius: 2, p: 4, display: 'flex', gap: 2, minHeight: 350 }}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {structures[7].description[0]}
              </Typography>
            </Box>
            <Box sx={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={structures[7].img} alt={structures[7].title}
                style={{ width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 8 }} />
            </Box>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h5" gutterBottom color="primary">
                {structures[7].title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {structures[7].description[1]}
              </Typography>
              <Link to="/game/7" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" size="small">Подробнее</Button>
              </Link>
            </Box>
          </Box>
        </Grid>

        <Grid xs={12} md={4}>
          <Box sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2 }}>
            <Typography variant="h6" gutterBottom color="primary" align="center">
              Топ мобильных игр
            </Typography>
            {structures.slice(0, 4).map((item, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2">{item.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.description[0].substring(0, 80)}...
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Link to={`/game/${i}`} style={{ textDecoration: 'none' }}>
                      <Button size="small" variant="outlined">Подробнее</Button>
                    </Link>
                  </Box>
                </Box>
                <img src={item.img} alt={item.title}
                  style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 4 }} />
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Content;