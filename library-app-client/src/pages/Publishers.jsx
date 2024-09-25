import React, { useState, useEffect } from 'react';
import { Container, Button, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';

const Publishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', country: '' });

  useEffect(() => {
    fetchPublishers();
  }, []);

  const fetchPublishers = async () => {
    try {
      const response = await axios.get('YOUR_BACKEND_API_URL/publishers');
      setPublishers(response.data);
    } catch (error) {
      console.error("Error fetching publishers", error);
    }
  };

  const handleOpenModal = (publisher = null) => {
    setSelectedPublisher(publisher);
    setFormState(publisher || { name: '', country: '' });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPublisher(null);
    setModalOpen(false);
  };

  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSavePublisher = async () => {
    try {
      if (selectedPublisher) {
        // Güncelleme işlemi
        await axios.put(`YOUR_BACKEND_API_URL/publishers/${selectedPublisher.id}`, formState);
      } else {
        // Ekleme işlemi
        await axios.post('YOUR_BACKEND_API_URL/publishers', formState);
      }
      fetchPublishers(); // Verileri yeniden çek
      handleCloseModal();
    } catch (error) {
      console.error("Error saving publisher", error);
    }
  };

  const handleDeletePublisher = async (id) => {
    try {
      await axios.delete(`YOUR_BACKEND_API_URL/publishers/${id}`);
      fetchPublishers(); // Verileri yeniden çek
    } catch (error) {
      console.error("Error deleting publisher", error);
    }
  };

  return (
    <Container>
      <h2>Publishers</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>Add New Publisher</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {publishers.map((publisher) => (
            <TableRow key={publisher.id}>
              <TableCell>{publisher.name}</TableCell>
              <TableCell>{publisher.country}</TableCell>
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
          />
          <TextField
            name="country"
            label="Country"
            value={formState.country}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSavePublisher} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Publishers;
