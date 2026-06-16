import { useParams, Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import structures from "../data";

function GamePage() {
  const { id } = useParams();
  const gameId = parseInt(id || "0", 10);
  const game = structures[gameId];

  if (!game) {
    return (
      <div>
        <Navbar active="1" />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography variant="h4">Игра не найдена</Typography>
          <Link to="/">Вернуться на главную</Link>
        </Container>
        <Footer />
      </div>
    );
  }

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
              <CardMedia component="img" image={game.img} alt={game.title}
                sx={{ height: 350, objectFit: 'contain', p: 2 }} />
            </Card>
          </Grid>
          <Grid xs={12} md={7}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>{game.title}</Typography>
                {game.description.map((p, i) => (
                  <Typography key={i} variant="body1" sx={{ textAlign: 'justify', color: 'text.secondary', mb: 2 }}>
                    {p}
                  </Typography>
                ))}
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