import React, { useState, useEffect } from 'react';
import { Container, Button, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState({ title: '', author: '', category: '', publisher: '' });

  useEffect(() => {
    // Backend'den kitapları çek
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/books');
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  const handleOpenModal = (book = null) => {
    setSelectedBook(book);
    setFormState(book || { title: '', author: '', category: '', publisher: '' });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setModalOpen(false);
  };

  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveBook = async () => {
    try {
      if (selectedBook) {
        // Güncelleme işlemi
        await axios.put(`YOUR_BACKEND_API_URL/books/${selectedBook.id}`, formState);
      } else {
        // Ekleme işlemi
        await axios.post('YOUR_BACKEND_API_URL/books', formState);
      }
      fetchBooks(); // Verileri yeniden çek
      handleCloseModal();
    } catch (error) {
      console.error("Error saving book", error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`YOUR_BACKEND_API_URL/books/${id}`);
      fetchBooks(); // Verileri yeniden çek
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };

  return (
    <Container>
      <h2>Books</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>Add New Book</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Publisher</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.name}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>{book.publisher}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpenModal(book)}>Edit</Button>
                <Button onClick={() => handleDeleteBook(book.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{selectedBook ? 'Edit Book' : 'Add New Book'}</DialogTitle>
        <DialogContent>
          <TextField
            name="title"
            label="Title"
            value={formState.title}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="author"
            label="Author"
            value={formState.author}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="category"
            label="Category"
            value={formState.category}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="publisher"
            label="Publisher"
            value={formState.publisher}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSaveBook} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Books;
