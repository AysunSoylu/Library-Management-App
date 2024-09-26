import React, { useState, useEffect } from 'react';
import { Container, Button, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Typography } from '@mui/material';
import axios from 'axios';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState({ title: '', author: '', category: '', publisher: '' });

  const BASE_URL = import.meta.env.VITE_REACT_APP_LIBRARY_APP_BASE_URL;

  useEffect(() => {
    // Backend'den kitapları çek
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(BASE_URL+ '/books');
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
        await axios.put(`${process.env.REACT_APP_LIBRARY_APP_BASE_URL}/books/${selectedBook.id}`, formState);
      } else {
        // Ekleme işlemi
        await axios.post(process.env.REACT_APP_LIBRARY_APP_BASE_URL + '/books', formState);
      }
      fetchBooks(); // Verileri yeniden çek
      handleCloseModal();
    } catch (error) {
      console.error("Error saving book", error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_LIBRARY_APP_BASE_URL}/books/${id}`);
      fetchBooks(); // Verileri yeniden çek
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };

  return (
    <Container sx={{ backgroundColor: '#faf3e0', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '1300px', height: '800px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px', color: '#8b4513' }}>Books</Typography>
      <Button 
        variant="contained" 
        onClick={() => handleOpenModal()} 
        sx={{ 
          backgroundColor: '#d2b48c', 
          color: '#fff', 
          '&:hover': { backgroundColor: '#8b4513' },
          marginBottom: '20px'
        }}
      >
        ADD NEW BOOK
      </Button>
      <Table sx={{ backgroundColor: '#fff', borderRadius: '10px' }}>
        <TableHead sx={{ backgroundColor: '#d2b48c' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Title</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Publication Year</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Stock</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Author</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Author Birth Date</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Author Country</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Publisher</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Publisher Establishment Year</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Publisher Address</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Category Description</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.name}</TableCell>
              <TableCell>{book.publicationYear}</TableCell>
              <TableCell>{book.stock}</TableCell>
              <TableCell>{book.author.name}</TableCell>
              <TableCell>{book.author.birthDate}</TableCell>
              <TableCell>{book.author.country}</TableCell>
              <TableCell>{book.publisher.name}</TableCell>
              <TableCell>{book.publisher.establishmentYear}</TableCell>
              <TableCell>{book.publisher.address}</TableCell>
              <TableCell>{book.categories[0].name}</TableCell>
              <TableCell>{book.categories[0].description}</TableCell>
              <TableCell>
                <Button 
                  onClick={() => handleOpenModal(book)} 
                  sx={{ 
                    color: '#fff', 
                    backgroundColor: '#8b4513', 
                    '&:hover': { backgroundColor: '#5a3e2b' },
                    marginRight: '10px'
                  }}
                >
                  Edit
                </Button>
                <Button 
                  onClick={() => handleDeleteBook(book.id)} 
                  sx={{ 
                    color: '#fff', 
                    backgroundColor: '#d32f2f', 
                    '&:hover': { backgroundColor: '#c62828' } 
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle sx={{ backgroundColor: '#8b4513', color: '#fff' }}>{selectedBook ? 'Edit Book' : 'Add New Book'}</DialogTitle>
        <DialogContent sx={{ backgroundColor: '#faf3e0' }}>
          <TextField
            name="title"
            label="Title"
            value={formState.title}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
          />
          <TextField
            name="author"
            label="Author"
            value={formState.author}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
          />
          <TextField
            name="category"
            label="Category"
            value={formState.category}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
          />
          <TextField
            name="publisher"
            label="Publisher"
            value={formState.publisher}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#faf3e0' }}>
          <Button onClick={handleCloseModal} sx={{ color: '#8b4513' }}>Cancel</Button>
          <Button 
            onClick={handleSaveBook} 
            sx={{ 
              backgroundColor: '#8b4513', 
              color: '#fff', 
              '&:hover': { backgroundColor: '#5a3e2b' } 
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Books;
