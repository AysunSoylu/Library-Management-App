import React, { useState, useEffect } from 'react';
import { Container, Button, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', bio: '' });

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('YOUR_BACKEND_API_URL/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors", error);
    }
  };

  const handleOpenModal = (author = null) => {
    setSelectedAuthor(author);
    setFormState(author || { name: '', bio: '' });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedAuthor(null);
    setModalOpen(false);
  };

  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveAuthor = async () => {
    try {
      if (selectedAuthor) {
        // Güncelleme işlemi
        await axios.put(`YOUR_BACKEND_API_URL/authors/${selectedAuthor.id}`, formState);
      } else {
        // Ekleme işlemi
        await axios.post('YOUR_BACKEND_API_URL/authors', formState);
      }
      fetchAuthors(); // Verileri yeniden çek
      handleCloseModal();
    } catch (error) {
      console.error("Error saving author", error);
    }
  };

  const handleDeleteAuthor = async (id) => {
    try {
      await axios.delete(`YOUR_BACKEND_API_URL/authors/${id}`);
      fetchAuthors(); // Verileri yeniden çek
    } catch (error) {
      console.error("Error deleting author", error);
    }
  };

  return (
    <Container>
      <h2>Authors</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>Add New Author</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Bio</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authors.map((author) => (
            <TableRow key={author.id}>
              <TableCell>{author.name}</TableCell>
              <TableCell>{author.bio}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpenModal(author)}>Edit</Button>
                <Button onClick={() => handleDeleteAuthor(author.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{selectedAuthor ? 'Edit Author' : 'Add New Author'}</DialogTitle>
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
            name="bio"
            label="Bio"
            value={formState.bio}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSaveAuthor} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Authors;
