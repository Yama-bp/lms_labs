import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import structures from "../../data";

function Gallery() {
  const imgData = structures.slice(0, 6);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, height: 300 }}>
        <Box sx={{ flex: '0 0 28%', height: '100%', overflow: 'hidden', borderRadius: 2 }}>
          <Link to="/game/0">
            <img src={imgData[0].img} alt={imgData[0].title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Link>
        </Box>
        <Box sx={{ flex: '0 0 44%', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 2 }}>
          {imgData.slice(1, 5).map((item, i) => (
            <Box key={i} sx={{ overflow: 'hidden', borderRadius: 2 }}>
              <Link to={`/game/${i + 1}`}>
                <img src={item.img} alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Link>
            </Box>
          ))}
        </Box>
        <Box sx={{ flex: '0 0 28%', height: '100%', overflow: 'hidden', borderRadius: 2 }}>
          <Link to="/game/5">
            <img src={imgData[5].img} alt={imgData[5].title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default Gallery;