import React from 'react';
import { Container, Box, Typography, TextField, Button, Grid } from '@mui/material';

const Contact = () => {
  return (
    <Container 
      maxWidth="md" 
      sx={{
        backgroundColor: '#f5f5dc', 
        borderRadius: '10px',
        padding: '20px',
        marginTop: '20px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' 
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#8b4513' }}>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph sx={{ color: '#5a3e2b', marginBottom: '30px' }}>
        If you have any questions or feedback, feel free to reach out to us through the contact form below or via our contact information.
      </Typography>
      
      {/* Contact Form*/}
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="First Name" 
              variant="outlined" 
              fullWidth 
              required 
              sx={{
                backgroundColor: '#fff',
                borderRadius: '5px'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Last Name" 
              variant="outlined" 
              fullWidth 
              required 
              sx={{
                backgroundColor: '#fff',
                borderRadius: '5px'
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="Email" 
              variant="outlined" 
              fullWidth 
              required 
              sx={{
                backgroundColor: '#fff',
                borderRadius: '5px'
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="Message" 
              variant="outlined" 
              fullWidth 
              multiline 
              rows={4} 
              required 
              sx={{
                backgroundColor: '#fff',
                borderRadius: '5px'
              }}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: '#8b4513', 
              color: '#fff', 
              '&:hover': { backgroundColor: '#5a3e2b' } 
            }}
          >
            Send Message
          </Button>
        </Box>
      </form>
      
      {/* Contact Information */}
      <Box sx={{ marginTop: '30px' }}>
        <Typography variant="h6" sx={{ color: '#8b4513' }}>
          Contact Information
        </Typography>
        <Typography variant="body2" sx={{ color: '#5a3e2b' }}>
          Email: contact@bookmanagementsystem.com
        </Typography>
        <Typography variant="body2" sx={{ color: '#5a3e2b' }}>
          Phone: +1 (123) 456-7890
        </Typography>
        <Typography variant="body2" sx={{ color: '#5a3e2b' }}>
          Address: 123 Book Street, Library City, 12345
        </Typography>
      </Box>
    </Container>
  );
};

export default Contact;
