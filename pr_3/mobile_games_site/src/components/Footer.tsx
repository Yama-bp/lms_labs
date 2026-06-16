import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#f5f5f5', py: 3, mt: 'auto', textAlign: 'center' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary">
          © 2026 Самые популярные мобильные игры. Статистика и аналитика.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;