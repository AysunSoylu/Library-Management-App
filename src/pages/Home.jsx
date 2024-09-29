import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import bookImage from './kütüphane.jpg'; 

const Home = () => {
  return (
    <Box 
      sx={{ 
        width: '100vw', 
        height: 'calc(100vh - 64px)', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${bookImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat', 
        backgroundAttachment: 'fixed', 
        marginLeft: '-50px',
        marginTop: '-23px',
      }}
    >
      <Box 
        sx={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.6)', 
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
          color: 'white', 
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' 
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to the Book Management System
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '20px' }}>
          Manage your books, authors, categories, publishers, and book orders seamlessly.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
