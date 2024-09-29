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

// Tema renklerini ayarlıyoruz (Krem tonlarında)
const theme = createTheme({
  palette: {
    primary: {
      main: '#8b4513', // Koyu kahverengi
    },
    secondary: {
      main: '#d32f2f', // Kırmızı ton (Silme butonları için)
    },
    background: {
      default: '#f5f5dc', // Krem rengi arka plan
    },
  },
});

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', description: '' });
  const [errorMessage, setErrorMessage] = useState(null);
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const BASE_URL = import.meta.env.VITE_REACT_APP_LIBRARY_APP_BASE_URL;

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      setErrorMessage("Error fetching categories");
      console.error("Error fetching categories", error);
    }
  };

  const handleOpenModal = (category = null) => {
    setSelectedCategory(category);
    setFormState(category || { name: '', description: '' });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
    setModalOpen(false);
    setValidationMessage('');
  };

  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveCategory = async () => {
    if (!formState.name.trimEnd() || !formState.description.trimEnd()) {
      setValidationMessage('Name and description cannot be empty.');
      return;
    }

    try {
      if (selectedCategory) {
        await axios.put(`${BASE_URL}/categories/${selectedCategory.id}`, formState);
      } else {
        await axios.post(`${BASE_URL}/categories`, formState);
      }
      fetchCategories();
      handleCloseModal();
    } catch (error) {
      setErrorMessage("Error saving category");
      console.error("Error saving category", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/categories/${id}`);
      fetchCategories();
    } catch (error) {
      setErrorMessage("Error deleting category");
      console.error("Error deleting category", error);
    }
  };

  const handleCloseSnackbar = () => {
    setErrorMessage(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ backgroundColor: '#f5f5dc', padding: '20px', borderRadius: '10px', height: '800px', width: '1000px' }}>
        <h2 style={{ color: '#8b4513', marginBottom: '20px' }}>Categories</h2>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => handleOpenModal()} 
          sx={{ marginBottom: '20px', backgroundColor: '#8b4513', color: '#fff', '&:hover': { backgroundColor: '#5a3e2b' } }}
        >
          Add New Category
        </Button>
        <Table sx={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <TableHead sx={{ backgroundColor: '#e0d9b0' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <Button 
                    onClick={() => handleOpenModal(category)} 
                    sx={{ color: '#fff', backgroundColor: '#8b4513', '&:hover': { backgroundColor: '#5a3e2b' }, marginRight: '10px' }}
                  >
                    Edit
                  </Button>
                  <Button 
                    onClick={() => handleDeleteCategory(category.id)} 
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
          <DialogTitle sx={{ backgroundColor: '#8b4513', color: '#fff' }}>{selectedCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
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
              name="description"
              label="Description"
              value={formState.description}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
              error={!formState.description}
              helperText={!formState.description ? 'Description is required.' : ''}
            />
            {validationMessage && <div style={{ color: 'red' }}>{validationMessage}</div>}
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#f5f5dc' }}>
            <Button onClick={handleCloseModal} sx={{ color: '#8b4513' }}>Cancel</Button>
            <Button 
              onClick={handleSaveCategory} 
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

export default Categories;
