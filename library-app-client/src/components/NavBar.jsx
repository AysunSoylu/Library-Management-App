import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const NavBar = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: 1400 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" component={Link} to="/">
          <MenuBookIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Book Management System
        </Typography>
    
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
