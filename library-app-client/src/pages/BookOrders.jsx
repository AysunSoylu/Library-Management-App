import React, { useState, useEffect } from 'react';
import { Container, Button, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';

const BookOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState({ bookTitle: '', customerName: '', date: '' });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('YOUR_BACKEND_API_URL/book-orders');
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const handleOpenModal = (order = null) => {
    setSelectedOrder(order);
    setFormState(order || { bookTitle: '', customerName: '', date: '' });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveOrder = async () => {
    try {
      if (selectedOrder) {
        // Güncelleme işlemi
        await axios.put(`YOUR_BACKEND_API_URL/book-orders/${selectedOrder.id}`, formState);
      } else {
        // Ekleme işlemi
        await axios.post('YOUR_BACKEND_API_URL/book-orders', formState);
      }
      fetchOrders(); // Verileri yeniden çek
      handleCloseModal();
    } catch (error) {
      console.error("Error saving order", error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`YOUR_BACKEND_API_URL/book-orders/${id}`);
      fetchOrders(); // Verileri yeniden çek
    } catch (error) {
      console.error("Error deleting order", error);
    }
  };

  return (
    <Container>
      <h2>Book Orders</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>Add New Order</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Book Title</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.bookTitle}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpenModal(order)}>Edit</Button>
                <Button onClick={() => handleDeleteOrder(order.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{selectedOrder ? 'Edit Order' : 'Add New Order'}</DialogTitle>
        <DialogContent>
          <TextField
            name="bookTitle"
            label="Book Title"
            value={formState.bookTitle}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="customerName"
            label="Customer Name"
            value={formState.customerName}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="date"
            label="Date"
            type="date"
            value={formState.date}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSaveOrder} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookOrders;
