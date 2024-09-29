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
        backgroundColor: '#d2b48c', 
        boxShadow: 'none', 
        borderBottom: '2px solid #8b4513', 
      }}
    >
      <Toolbar>
        {/* Icon on the left */}
        <IconButton 
          edge="start" 
          color="inherit" 
          aria-label="menu" 
          component={Link} 
          to="/"
          sx={{
            marginRight: 2, 
            color: '#fff', 
          }}
        >
          <MenuBookIcon />
        </IconButton>

        {/* Title text*/}
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 'bold',
            color: '#2c3e50', 
          }}
        >
          Book Management System
        </Typography>

        {/* Buttons on the right */}
        <Box>
          <Button 
            color="inherit" 
            component={Link} 
            to="/about"
            sx={{
              color: '#2c3e50', 
              backgroundColor: '#fff', 
              marginRight: 1, 
              '&:hover': {
                backgroundColor: '#f5deb3', 
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

