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

// Theme colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#8b4513', 
    },
    secondary: {
      main: '#d32f2f', 
    },
    background: {
      default: '#d2b48c', 
    },
  },
});

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', birthDate: '', country: '' });
  const [errorMessage, setErrorMessage] = useState(null);
  const [validationMessage, setValidationMessage] = useState('');

  const BASE_URL = import.meta.env.VITE_REACT_APP_LIBRARY_APP_BASE_URL;

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/authors`);
      setAuthors(response.data);
    } catch (error) {
      setErrorMessage("Error fetching authors");
      console.error("Error fetching authors", error);
    }
  };

  const handleOpenModal = (author = null) => {
    setSelectedAuthor(author);
    setFormState(author || { name: '', birthDate: '', country: '' });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedAuthor(null);
    setModalOpen(false);
    setValidationMessage('');
  };

  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveAuthor = async () => {
    if (!formState.name.trim() || !formState.birthDate || !formState.country.trim()) {
      setValidationMessage('All fields are required.');
      return;
    }

    try {
      if (selectedAuthor) {
        await axios.put(`${BASE_URL}/authors/${selectedAuthor.id}`, formState);
      } else {
        await axios.post(`${BASE_URL}/authors`, formState);
      }
      fetchAuthors();
      handleCloseModal();
    } catch (error) {
      setErrorMessage("Error saving author");
      console.error("Error saving author", error);
    }
  };

  const handleDeleteAuthor = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/authors/${id}`);
      fetchAuthors();
    } catch (error) {
      setErrorMessage("Error deleting author");
      console.error("Error deleting author", error);
    }
  };

  const handleCloseSnackbar = () => {
    setErrorMessage(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ backgroundColor: '#f5f5dc', padding: '20px', borderRadius: '10px', height: '700px', width: '1000px' }}>
        <h2 style={{ color: '#8b4513', marginBottom: '20px' }}>Authors</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal()}
          sx={{ backgroundColor: '#8b4513', color: '#fff', '&:hover': { backgroundColor: '#5a3e2b' }, marginBottom: '20px' }}
        >
          Add New Author
        </Button>
        <Table sx={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <TableHead sx={{ backgroundColor: '#e0d9b0' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Birth Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Country</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors.map((author) => (
              <TableRow key={author.id}>
                <TableCell>{author.name}</TableCell>
                <TableCell>{author.birthDate}</TableCell>
                <TableCell>{author.country}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenModal(author)}
                    sx={{ color: '#fff', backgroundColor: '#8b4513', '&:hover': { backgroundColor: '#5a3e2b' }, marginRight: '10px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteAuthor(author.id)}
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
          <DialogTitle sx={{ backgroundColor: '#8b4513', color: '#fff' }}>{selectedAuthor ? 'Edit Author' : 'Add New Author'}</DialogTitle>
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
              name="birthDate"
              label="Birth Date"
              type="text" 
              value={formState.birthDate}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              placeholder="YYYY-MM-DD" 
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
              error={!formState.birthDate}
              helperText={!formState.birthDate ? 'Birth date is required.' : ''}
              inputProps={{ pattern: "\\d{4}-\\d{2}-\\d{2}" }} //
            />
            <TextField
              name="country"
              label="Country"
              value={formState.country}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
              error={!formState.country}
              helperText={!formState.country ? 'Country is required.' : ''}
            />
            {validationMessage && <div style={{ color: 'red' }}>{validationMessage}</div>}
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#f5f5dc' }}>
            <Button onClick={handleCloseModal} sx={{ color: '#8b4513' }}>Cancel</Button>
            <Button
              onClick={handleSaveAuthor}
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

export default Authors;
