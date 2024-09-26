import React from 'react';
import { Container, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const About = () => {
  // Örnek proje bilgileri
  const projectDetails = [
    { feature: 'Project Name', description: 'Book Management System' },
    { feature: 'Version', description: '1.0.0' },
    { feature: 'Developed By', description: 'Your Name' },
    { feature: 'Technologies Used', description: 'React, Material-UI, Tailwind CSS' },
    { feature: 'Purpose', description: 'Manage books, authors, categories, publishers, and book orders seamlessly.' },
  ];

  return (
    <Container 
      maxWidth="md" 
      sx={{
        backgroundColor: '#f5f5dc', // Arka plan rengi açık kahverengi
        borderRadius: '10px',
        padding: '20px',
        marginTop: '20px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' // Hafif gölge efekti
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#8b4513' }}>
        About This Project
      </Typography>
      <Typography variant="body1" paragraph sx={{ color: '#5a3e2b' }}>
        This Book Management System is designed to help manage books, authors, categories, publishers, and book orders in a seamless and efficient manner.
        It provides an easy-to-use interface for users to keep track of their book collection and relevant information.
      </Typography>
      
      {/* Proje Detayları Tablosu */}
      <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#d2b48c' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Feature</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectDetails.map((detail) => (
              <TableRow key={detail.feature}>
                <TableCell>{detail.feature}</TableCell>
                <TableCell>{detail.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Ekstra bilgiler için bir bölüm */}
      <Box sx={{ marginTop: '20px' }}>
        <Typography variant="h6" sx={{ color: '#8b4513' }}>
          Future Plans
        </Typography>
        <Typography variant="body2" sx={{ color: '#5a3e2b' }}>
          In the future, we plan to add more features such as user authentication, advanced search filters, and personalized recommendations based on user preferences.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
