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

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', birthDate: '', country: '' });
  const [errorMessage, setErrorMessage] = useState(null); // Hata mesajı için state
  const [validationMessage, setValidationMessage] = useState(''); // Validasyon mesajı için state

  const BASE_URL = import.meta.env.VITE_REACT_APP_LIBRARY_APP_BASE_URL; // BASE_URL'in doğru tanımlandığından emin olun.

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/authors`);
      setAuthors(response.data);
    } catch (error) {
      setErrorMessage("Error fetching authors"); // Hata mesajını set et
      console.error("Error fetching authors", error);
    }
  };

  const handleOpenModal = (author = null) => {
    setSelectedAuthor(author);
    setFormState(author || { name: '', birthDate: new Date(), country: '' }); // Formu boş olarak başlatın
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedAuthor(null);
    setModalOpen(false);
    setValidationMessage(''); // Modal kapatıldığında validasyon mesajını sıfırla
  };

  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveAuthor = async () => {
    // Validasyon: Alanların boş olup olmadığını kontrol et
    if (!formState.name.trim() || !formState.birthDate || !formState.country.trim()) {
      setValidationMessage('All fields are required.'); // Hata mesajını ayarla
      return; // Fonksiyondan çık
    }

    try {
      if (selectedAuthor) {
        // Güncelleme işlemi
        await axios.put(`${BASE_URL}/authors/${selectedAuthor.id}`, formState);
      } else {
        // Ekleme işlemi
        await axios.post(`${BASE_URL}/authors`, formState);
      }
      fetchAuthors(); // Verileri yeniden çek
      handleCloseModal();
    } catch (error) {
      setErrorMessage("Error saving author"); // Hata mesajını set et
      console.error("Error saving author", error);
    }
  };

  const handleDeleteAuthor = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/authors/${id}`);
      fetchAuthors(); // Verileri yeniden çek
    } catch (error) {
      setErrorMessage("Error deleting author"); // Hata mesajını set et
      console.error("Error deleting author", error);
    }
  };

  const handleCloseSnackbar = () => {
    setErrorMessage(null);
  };

  return (
    <Container>
      <h2>Authors</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>Add New Author</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Birth Date</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authors.map((author) => (
            <TableRow key={author.id}>
              <TableCell>{author.name}</TableCell>
              <TableCell>{author.birthDate}</TableCell>
              <TableCell>{author.country}</TableCell>
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
            error={!formState.name} // Hata durumu
            helperText={!formState.name ? 'Name is required.' : ''} // Yardımcı metin
          />
          <TextField
            name="birthDate"
            label="Birth Date"
            type="date"
            value={formState.birthDate}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            error={!formState.birthDate} // Hata durumu
            helperText={!formState.birthDate ? 'Birth date is required.' : ''} // Yardımcı metin
          />
          <TextField
            name="country"
            label="Country"
            value={formState.country}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            error={!formState.country} // Hata durumu
            helperText={!formState.country ? 'Country is required.' : ''} // Yardımcı metin
          />
          {/* Validasyon mesajını göster */}
          {validationMessage && <div style={{ color: 'red' }}>{validationMessage}</div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSaveAuthor} color="primary">Save</Button>
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

export default Authors;
