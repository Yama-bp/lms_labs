import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  border: '1px solid',
  borderColor: theme.palette.divider,
  padding: '8px 12px',
}));

interface ComponentProps {
  active: string;
}

function Navbar({ active }: ComponentProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleMenuClick = () => {
    setOpen(false);
  };

  const getButtonVariant = (page: string) => {
    return active === page ? 'contained' : 'text';
  };

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        mt: '28px',
      }}
    >
      <Container maxWidth="xl">
        <StyledToolbar>
          <Typography variant="h6" sx={{ color: '#5d8aa8' }}>
            Самые высокие здания и сооружения
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button
                variant={getButtonVariant('1')}
                color="info"
                size="medium"
                sx={{ '&:hover': { backgroundColor: 'rgba(2, 136, 209, 0.2)' } }}
              >
                Главная
              </Button>
            </Link>
            <Link to="/list" style={{ textDecoration: 'none' }}>
              <Button
                variant={getButtonVariant('2')}
                color="info"
                size="medium"
                sx={{ '&:hover': { backgroundColor: 'rgba(2, 136, 209, 0.2)' } }}
              >
                Список зданий
              </Button>
            </Link>
            <Link to="/chart" style={{ textDecoration: 'none' }}>
              <Button
                variant={getButtonVariant('3')}
                color="info"
                size="medium"
                sx={{ '&:hover': { backgroundColor: 'rgba(2, 136, 209, 0.2)' } }}
              >
                Диаграммы
              </Button>
            </Link>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem
                    onClick={handleMenuClick}
                    selected={active === '1'}
                    sx={{
                      '&:hover': { backgroundColor: 'rgba(2, 136, 209, 0.2)' },
                      ...(active === '1' && { fontWeight: 'bold', backgroundColor: 'rgba(2, 136, 209, 0.15)' }),
                    }}
                  >
                    Главная
                  </MenuItem>
                </Link>
                <Link to="/list" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem
                    onClick={handleMenuClick}
                    selected={active === '2'}
                    sx={{
                      '&:hover': { backgroundColor: 'rgba(2, 136, 209, 0.2)' },
                      ...(active === '2' && { fontWeight: 'bold', backgroundColor: 'rgba(2, 136, 209, 0.15)' }),
                    }}
                  >
                    Список зданий
                  </MenuItem>
                </Link>
                <Link to="/chart" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem
                    onClick={handleMenuClick}
                    selected={active === '3'}
                    sx={{
                      '&:hover': { backgroundColor: 'rgba(2, 136, 209, 0.2)' },
                      ...(active === '3' && { fontWeight: 'bold', backgroundColor: 'rgba(2, 136, 209, 0.15)' }),
                    }}
                  >
                    Диаграммы
                  </MenuItem>
                </Link>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;