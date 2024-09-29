import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Snackbar, 
  Alert 
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';


const theme = createTheme({
  palette: {
    primary: {
      main: '#8b4513', 
    },
    secondary: {
      main: '#d32f2f', 
    },
    background: {
      default: '#f5f5dc', 
    },
  },
});

const Publishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState({ id: 0, name: '', establishmentYear: 0, address: '' });
  const [errorMessage, setErrorMessage] = useState(null); // state for error message
  const [validationMessage, setValidationMessage] = useState(''); // state for validation message

  const BASE_URL = 'http://localhost:8080/api/v1';

  useEffect(() => {
    fetchPublishers();
  }, []);

  const fetchPublishers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/publishers`);
      setPublishers(response.data);
    } catch (error) {
      setErrorMessage("Error fetching publishers"); 
      console.error("Error fetching publishers", error);
    }
  };

  const handleOpenModal = (publisher = null) => {
    setSelectedPublisher(publisher);
    setFormState(publisher || { id: 0, name: '', establishmentYear: 0, address: '' });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPublisher(null);
    setModalOpen(false);
    setValidationMessage(''); //Reset validation message when modal is closed
  };

  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSavePublisher = async () => {
    
    if (!formState.name || !formState.address || formState.establishmentYear <= 0) {
      setValidationMessage('All fields are required and establishment year must be greater than 0.');
      return;
    }

  
    if (formState.name.trim() === '' || formState.address.trim() === '') {
      setValidationMessage('String values cannot be empty.');
      return;
    }

    try {
      if (selectedPublisher) {
       
        await axios.put(`${BASE_URL}/publishers/${selectedPublisher.id}`, formState);
      } else {
       
        await axios.post(`${BASE_URL}/publishers`, formState);
      }
      fetchPublishers(); 
      handleCloseModal();
    } catch (error) {
      setErrorMessage("Error saving publisher");
      console.error("Error saving publisher", error);
    }
  };

  const handleDeletePublisher = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/publishers/${id}`);
      fetchPublishers(); 
    } catch (error) {
      setErrorMessage("Error deleting publisher");
      console.error("Error deleting publisher", error);
    }
  };

  const handleCloseSnackbar = () => {
    setErrorMessage(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ backgroundColor: '#f5f5dc', padding: '20px', borderRadius: '8px', height: '700px', width: '1000px' }}>
        <h2 style={{ color: '#8b4513', marginBottom: '20px' }}>Publishers</h2>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => handleOpenModal()} 
          sx={{ marginBottom: '20px', backgroundColor: '#8b4513', color: '#fff', '&:hover': { backgroundColor: '#5a3e2b' } }}
        >
          Add New Publisher
        </Button>
        <Table sx={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <TableHead sx={{ backgroundColor: '#e0d9b0' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Establishment Year</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {publishers.map((publisher) => (
              <TableRow key={publisher.id}>
                <TableCell>{publisher.name}</TableCell>
                <TableCell>{publisher.establishmentYear}</TableCell>
                <TableCell>{publisher.address}</TableCell>
                <TableCell>
                  <Button 
                    onClick={() => handleOpenModal(publisher)} 
                    sx={{ color: '#fff', backgroundColor: '#8b4513', '&:hover': { backgroundColor: '#5a3e2b' }, marginRight: '10px' }}
                  >
                    Edit
                  </Button>
                  <Button 
                    onClick={() => handleDeletePublisher(publisher.id)} 
                    sx={{ color: '#fff', backgroundColor: '#d32f2f', '&:hover': { backgroundColor: '#c62828' } }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isModalOpen} onClose={handleCloseModal}>
          <DialogTitle sx={{ backgroundColor: '#8b4513', color: '#fff' }}>{selectedPublisher ? 'Edit Publisher' : 'Add New Publisher'}</DialogTitle>
          <DialogContent sx={{ backgroundColor: '#f5f5dc' }}>
            <TextField
              name="name"
              label="Name"
              value={formState.name}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
              error={!formState.name}
              helperText={!formState.name ? 'Name is required.' : ''}
            />
            <TextField
              name="establishmentYear"
              label="Establishment Year"
              type="number"
              value={formState.establishmentYear}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
              error={formState.establishmentYear <= 0}
              helperText={formState.establishmentYear <= 0 ? 'Establishment year must be greater than 0.' : ''}
            />
            <TextField
              name="address"
              label="Address"
              value={formState.address}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
              error={!formState.address}
              helperText={!formState.address ? 'Address is required.' : ''}
            />
            {validationMessage && <div style={{ color: 'red' }}>{validationMessage}</div>}
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#f5f5dc' }}>
            <Button onClick={handleCloseModal} sx={{ color: '#8b4513' }}>Cancel</Button>
            <Button 
              onClick={handleSavePublisher} 
              sx={{ backgroundColor: '#8b4513', color: '#fff', '&:hover': { backgroundColor: '#5a3e2b' } }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default Publishers;
