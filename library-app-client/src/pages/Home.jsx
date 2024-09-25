import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import bookImage from './kütüphane.jpg'; // Görseli doğru şekilde içe aktardığınızdan emin olun

const Home = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Tam ekran yüksekliği
        backgroundImage: `url(${bookImage})`, // Arka plan görseli
        backgroundSize: 'cover', // Görselin tüm alanı kaplaması için
        backgroundPosition: 'center', // Görselin ortalanması için
        color: 'white', // Yazı rengi beyaz yapılıyor
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' // Yazının daha okunabilir olması için gölge efekti
      }}
    >
      <Container 
        sx={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Arkada yarı saydam bir kutu
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center' 
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to the Book Management System
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '20px' }}>
          Manage your books, authors, categories, publishers, and book orders seamlessly.
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;

