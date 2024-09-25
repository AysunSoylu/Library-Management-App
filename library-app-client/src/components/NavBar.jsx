import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const NavBar = () => {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: 1400, 
        backgroundColor: '#d2b48c', // Açık kahverengi arka plan rengi
        boxShadow: 'none', // Gölgeyi kaldırır
        borderBottom: '2px solid #8b4513', // Alt kenarda koyu kahverengi bir çizgi ekler
      }}
    >
      <Toolbar>
        {/* Sol kısımda bulunan simge */}
        <IconButton 
          edge="start" 
          color="inherit" 
          aria-label="menu" 
          component={Link} 
          to="/"
          sx={{
            marginRight: 2, // Simge ve yazı arasında boşluk
            color: '#fff', // Simge rengi beyaz
          }}
        >
          <MenuBookIcon />
        </IconButton>

        {/* Başlık metni */}
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 'bold', // Başlık yazısının kalınlığı
            color: '#2c3e50', // Başlık yazısının rengi (koyu gri)
          }}
        >
          Book Management System
        </Typography>

        {/* Sağ kısımda yer alacak butonlar */}
        <Box>
          <Button 
            color="inherit" 
            component={Link} 
            to="/about"
            sx={{
              color: '#2c3e50', // Buton metni rengi
              backgroundColor: '#fff', // Buton arka planı
              marginRight: 1, // Butonlar arasında boşluk
              '&:hover': {
                backgroundColor: '#f5deb3', // Üzerine gelindiğinde açık kahverengi
              }
            }}
          >
            About
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/contact"
            sx={{
              color: '#2c3e50',
              backgroundColor: '#fff',
              '&:hover': {
                backgroundColor: '#f5deb3',
              }
            }}
          >
            Contact
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

