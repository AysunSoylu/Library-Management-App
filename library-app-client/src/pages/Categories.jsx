import React, { useState, useEffect } from 'react';
import { Container, Button, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(import.meta.env.LIBRARY_APP_BASE_URL+'/categories');
      setCategories(response.data);
    } catch (error) {
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
  };

  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveCategory = async () => {
    try {
      if (selectedCategory) {
        // Güncelleme işlemi
        await axios.put(`YOUR_BACKEND_API_URL/categories/${selectedCategory.id}`, formState);
      } else {
        // Ekleme işlemi
        await axios.post('YOUR_BACKEND_API_URL/categories', formState);
      }
      fetchCategories(); // Verileri yeniden çek
      handleCloseModal();
    } catch (error) {
      console.error("Error saving category", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`YOUR_BACKEND_API_URL/categories/${id}`);
      fetchCategories(); // Verileri yeniden çek
    } catch (error) {
      console.error("Error deleting category", error);
    }
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
          />
          <TextField
            name="description"
            label="Description"
            value={formState.description}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSaveCategory} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Categories;
