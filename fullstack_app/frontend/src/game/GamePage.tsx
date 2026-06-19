import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchGame } from "../api";

function GamePage() {
  const { id } = useParams();
  const [game, setGame] = useState<any>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchGame(parseInt(id || "0"));
        if (data.success) setGame(data.game);
      } catch (e) {
        console.error("Ошибка загрузки игры:", e);
      }
    };
    load();
  }, [id]);

  if (!game) {
    return (
      <div>
        <Navbar active="1" />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography variant="h4">Загрузка...</Typography>
        </Container>
        <Footer />
      </div>
    );
  }

  const imgSrc = imgError || !game.image_url
    ? 'https://via.placeholder.com/400x350?text=No+Image'
    : game.image_url;

  return (
    <div>
      <Navbar active="1" />
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Главная</Link>
          <Typography color="text.primary">{game.title}</Typography>
        </Breadcrumbs>
        <Grid container spacing={4}>
          <Grid xs={12} md={5}>
            <Card sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
              <CardMedia
                component="img"
                image={imgSrc}
                alt={game.title}
                onError={() => setImgError(true)}
                sx={{ height: 350, objectFit: 'contain', p: 2 }}
              />
            </Card>
          </Grid>
          <Grid xs={12} md={7}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>{game.title}</Typography>
                <Typography variant="body1" sx={{ textAlign: 'justify', color: 'text.secondary', mb: 2 }}>
                  Год выхода: {game.release_year}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'justify', color: 'text.secondary', mb: 2 }}>
                  Популярность: {game.player_count} млн ({game.count_type})
                </Typography>
                {game.publishers && (
                  <Typography variant="body1" sx={{ textAlign: 'justify', color: 'text.secondary', mb: 2 }}>
                    Издатель: {game.publishers.join(', ')}
                  </Typography>
                )}
                <Typography variant="body1" sx={{ textAlign: 'justify', color: 'text.secondary', mb: 2 }}>
                  {game.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default GamePage;