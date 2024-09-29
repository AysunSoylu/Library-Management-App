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
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', description: '' });
  const [errorMessage, setErrorMessage] = useState(null); // Hata mesajı için state
  const [validationMessage, setValidationMessage] = useState(''); // Validasyon mesajı için state

  useEffect(() => {
    fetchCategories();
  }, []);

  const BASE_URL = import.meta.env.VITE_REACT_APP_LIBRARY_APP_BASE_URL;

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      setErrorMessage("Error fetching categories"); // Hata mesajını set et
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
    setValidationMessage(''); // Modal kapatıldığında validasyon mesajını sıfırla
  };

  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveCategory = async () => {
    // Validasyon: Alanların boş olup olmadığını kontrol et
    if (!formState.name.trimEnd() || !formState.description.trimEnd()) {
      setValidationMessage('Name and description cannot be empty.'); // Hata mesajı ayarla
      return; // Fonksiyondan çık
    }

    

    try {
      if (selectedCategory) {
        // Güncelleme işlemi
        await axios.put(`${BASE_URL}/categories/${selectedCategory.id}`, formState);
      } else {
        // Ekleme işlemi
        await axios.post(`${BASE_URL}/categories`, formState);
      }
      fetchCategories(); // Verileri yeniden çek
      handleCloseModal();
    } catch (error) {
      setErrorMessage("Error saving category"); // Hata mesajını set et
      console.error("Error saving category", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/categories/${id}`);
      fetchCategories(); // Verileri yeniden çek
    } catch (error) {
      setErrorMessage("Error deleting category"); // Hata mesajını set et
      console.error("Error deleting category", error);
    }
  };

  const handleCloseSnackbar = () => {
    setErrorMessage(null);
  };

  return (
    <Container>
      <h2>Categories</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>Add New Category</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpenModal(category)}>Edit</Button>
                <Button onClick={() => handleDeleteCategory(category.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{selectedCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Name"
            value={formState.name}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            error={!formState.name} // Hata durumu
            helperText={!formState.name ? 'Name is required.' : ''} // Yardımcı metin
          />
          <TextField
            name="description"
            label="Description"
            value={formState.description}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            error={!formState.description} // Hata durumu
            helperText={!formState.description ? 'Description is required.' : ''} // Yardımcı metin
          />
          {/* Validasyon mesajını göster */}
          {validationMessage && <div style={{ color: 'red' }}>{validationMessage}</div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSaveCategory} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar bileşeni */}
      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Categories;
