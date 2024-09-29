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

const Publishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState({ id: 0, name: '', establishmentYear: 0, address: '' });
  const [errorMessage, setErrorMessage] = useState(null); // Hata mesajı için state
  const [validationMessage, setValidationMessage] = useState(''); // Validasyon mesajı için state

  const BASE_URL = 'http://localhost:8080/api/v1';

  useEffect(() => {
    fetchPublishers();
  }, []);

  const fetchPublishers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/publishers`);
      setPublishers(response.data);
    } catch (error) {
      setErrorMessage("Error fetching publishers"); // Hata mesajını set et
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
    setValidationMessage(''); // Modal kapatıldığında validasyon mesajını sıfırla
  };

  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSavePublisher = async () => {
    // Validasyon: Alanların boş olup olmadığını kontrol et
    if (!formState.name || !formState.address || formState.establishmentYear <= 0) {
      setValidationMessage('All fields are required and establishment year must be greater than 0.'); // Hata mesajını ayarla
      return; // Fonksiyondan çık
    }

    // Boş string değerlerin gönderilmemesi için kontrol
    if (formState.name.trim() === '' || formState.address.trim() === '') {
      setValidationMessage('String values cannot be empty.'); // Hata mesajını ayarla
      return; // Fonksiyondan çık
    }

    try {
      if (selectedPublisher) {
        // Güncelleme işlemi
        await axios.put(`${BASE_URL}/publishers/${selectedPublisher.id}`, formState);
      } else {
        // Ekleme işlemi
        await axios.post(`${BASE_URL}/publishers`, formState);
      }
      fetchPublishers(); // Verileri yeniden çek
      handleCloseModal();
    } catch (error) {
      setErrorMessage("Error saving publisher"); // Hata mesajını set et
      console.error("Error saving publisher", error);
    }
  };

  const handleDeletePublisher = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/publishers/${id}`);
      fetchPublishers(); // Verileri yeniden çek
    } catch (error) {
      setErrorMessage("Error deleting publisher"); // Hata mesajını set et
      console.error("Error deleting publisher", error);
    }
  };

  const handleCloseSnackbar = () => {
    setErrorMessage(null);
  };

  return (
    <Container>
      <h2>Publishers</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>Add New Publisher</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Establishment Year</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {publishers.map((publisher) => (
            <TableRow key={publisher.id}>
              <TableCell>{publisher.name}</TableCell>
              <TableCell>{publisher.establishmentYear}</TableCell>
              <TableCell>{publisher.address}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpenModal(publisher)}>Edit</Button>
                <Button onClick={() => handleDeletePublisher(publisher.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{selectedPublisher ? 'Edit Publisher' : 'Add New Publisher'}</DialogTitle>
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
            name="establishmentYear"
            label="Establishment Year"
            type="number"
            value={formState.establishmentYear}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            error={formState.establishmentYear <= 0} // Hata durumu
            helperText={formState.establishmentYear <= 0 ? 'Establishment year must be greater than 0.' : ''} // Yardımcı metin
          />
          <TextField
            name="address"
            label="Address"
            value={formState.address}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            error={!formState.address} // Hata durumu
            helperText={!formState.address ? 'Address is required.' : ''} // Yardımcı metin
          />
          {/* Validasyon mesajını göster */}
          {validationMessage && <div style={{ color: 'red' }}>{validationMessage}</div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSavePublisher} color="primary">Save</Button>
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

export default Publishers;
