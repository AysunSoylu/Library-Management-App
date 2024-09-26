import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import bookImage from './kütüphane.jpg'; // Görselin doğru yolda olduğundan emin olun

const Home = () => {
  return (
    <Box 
      sx={{ 
        width: '100vw', // Tam genişlik
        height: 'calc(100vh - 64px)', // Ekran yüksekliğinden NavBar'ın yüksekliğini çıkar
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${bookImage})`, // Arka plan görseli
        backgroundSize: 'cover', // Görselin tüm alanı kaplaması için
        backgroundPosition: 'center', // Görselin ortalanması için
        backgroundRepeat: 'no-repeat', // Görselin tekrar etmesini engeller
        backgroundAttachment: 'fixed', // Scroll sırasında sabit kalır
        marginLeft: '-50px',
        marginTop: '-23px',
      }}
    >
      <Box 
        sx={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Arkada yarı saydam bir kutu
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
          color: 'white', // Yazı rengini beyaz yapar
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' // Yazının daha okunabilir olması için gölge efekti
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
