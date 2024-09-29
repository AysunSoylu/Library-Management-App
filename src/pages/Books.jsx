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
  Box, 
  Typography, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl, 
  Snackbar, 
  Alert, 
  Checkbox, 
  FormControlLabel 
} from '@mui/material';
import axios from 'axios';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    title: '',
    authorId: '',
    publisherId: '',
    publicationYear: 0,
    stock: 0,
    selectedCategories: [] // Array for selected categories
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [validationMessage, setValidationMessage] = useState('');

  const BASE_URL = import.meta.env.VITE_REACT_APP_LIBRARY_APP_BASE_URL;

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
    fetchPublishers();
    fetchCategories();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/books`);
      setBooks(response.data);
    } catch (error) {
      setErrorMessage("Error fetching books");
      console.error("Error fetching books", error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/authors`);
      setAuthors(response.data);
    } catch (error) {
      setErrorMessage("Error fetching authors");
      console.error("Error fetching authors", error);
    }
  };

  const fetchPublishers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/publishers`);
      setPublishers(response.data);
    } catch (error) {
      setErrorMessage("Error fetching publishers");
      console.error("Error fetching publishers", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      setErrorMessage("Error fetching categories");
      console.error("Error fetching categories", error);
    }
  };

  const handleOpenModal = (book = null) => {
    setSelectedBook(book);
    if (book) {
      // Pass the details of the selected book to formState
      setFormState({
        title: book.name,
        authorId: book.author.id,
        publisherId: book.publisher.id,
        publicationYear: book.publicationYear,
        stock: book.stock,
        selectedCategories: book.categories.map(category => category.id.toString()) 
      });
    } else {
      // Reset formState for new book add state
      setFormState({
        title: '',
        authorId: '',
        publisherId: '',
        publicationYear: 0,
        stock: 0,
        selectedCategories: [] 
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setModalOpen(false);
    setValidationMessage(''); 
  };

  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value; 
    setFormState((prevState) => ({
      ...prevState,
      selectedCategories: prevState.selectedCategories.includes(value)
        ? prevState.selectedCategories.filter(categoryId => categoryId !== value) 
        : [...prevState.selectedCategories, value], 
    }));
  };
  

  const handleSaveBook = async () => {
    // Validation: Check if fields are empty
    if (!formState.title.trim() || !formState.authorId || !formState.publisherId || !formState.publicationYear || !formState.stock) {
      setValidationMessage('All fields are required.'); 
      return; 
    }

    try {
      const bookData = {
        name: formState.title,
        publicationYear: formState.publicationYear,
        stock: formState.stock,
        author: {
          id: formState.authorId
        },
        publisher: {
          id: formState.publisherId
        },
        categories: formState.selectedCategories.map(id => ({ id })) 
      };

      if (selectedBook) {
        
        await axios.put(`${BASE_URL}/books/${selectedBook.id}`, bookData);
      } else {
       
        await axios.post(`${BASE_URL}/books`, bookData);
      }
      fetchBooks(); 
      handleCloseModal();
    } catch (error) {
      setErrorMessage("Error saving book"); 
      console.error("Error saving book", error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/books/${id}`);
      fetchBooks(); 
    } catch (error) {
      setErrorMessage("Error deleting book"); 
      console.error("Error deleting book", error);
    }
  };

  const handleCloseSnackbar = () => {
    setErrorMessage(null);
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
            <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Publisher</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Category</TableCell>
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
              <TableCell>{book.publisher.name}</TableCell>
              <TableCell>{book.categories.map(category => category.name).join(', ')}</TableCell>
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
          {/* Author Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Author</InputLabel>
            <Select
              name="authorId"
              value={formState.authorId}
              onChange={handleFormChange}
              sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
            >
              {authors.map((author) => (
                <MenuItem key={author.id} value={author.id}>
                  {author.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Publisher Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Publisher</InputLabel>
            <Select
              name="publisherId"
              value={formState.publisherId}
              onChange={handleFormChange}
              sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
            >
              {publishers.map((publisher) => (
                <MenuItem key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Category Checkbox */}
          <Typography variant="h6" sx={{ marginTop: '20px', color: '#8b4513' }}>Select Categories</Typography>
          {categories.map((category) => (
            <FormControlLabel
              key={category.id}
              control={
                <Checkbox
                  checked={formState.selectedCategories.includes(category.id.toString())} 
                  onChange={handleCategoryChange} 
                  value={category.id.toString()} 
                  color="primary"
                />
              }
              label={category.name}
            />

          ))}

          <TextField
            name="publicationYear"
            label="Publication Year"
            value={formState.publicationYear}
            onChange={handleFormChange}
            type="number"
            fullWidth
            margin="normal"
            sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
          />
          <TextField
            name="stock"
            label="Stock"
            value={formState.stock}
            onChange={handleFormChange}
            type="number"
            fullWidth
            margin="normal"
            sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
          />
         
          {validationMessage && <div style={{ color: 'red' }}>{validationMessage}</div>}
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

      
      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Books;
