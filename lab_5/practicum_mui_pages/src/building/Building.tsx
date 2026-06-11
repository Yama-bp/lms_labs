import React from 'react';
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

function Building() {
  const { id } = useParams();
  const buildingId = parseInt(id || "0", 10);
  const building = structures[buildingId];

  if (!building) {
    return (
      <div>
        <Navbar active="1" />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography variant="h4">Здание не найдено</Typography>
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
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link to="/" style={{ color: 'inherit' }}>
            Главная
          </Link>
          <Typography color="text.primary">{building.title}</Typography>
        </Breadcrumbs>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image={building.img}
                alt={building.title}
                sx={{ 
                  width: '100%', 
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'contain',
                  backgroundColor: '#f5f5f5'
                }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {building.title}
                </Typography>
                {building.description.map((paragraph, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    paragraph
                    sx={{ textAlign: 'justify', color: 'text.secondary' }}
                  >
                    {paragraph}
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

export default Building;