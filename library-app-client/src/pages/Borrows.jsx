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
  Select, 
  MenuItem, 
  Snackbar, 
  Alert 
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

// Kahverengi tonlarda bir tema oluşturuyoruz
const theme = createTheme({
  palette: {
    primary: {
      main: '#6b4226', // Kahverengi ton
    },
    secondary: {
      main: '#3e2723', // Daha koyu kahverengi
    },
    background: {
      default: '#f3e5ab', // Arka plan rengi
    },
  },
});

const Borrows = () => {
  const [borrows, setBorrows] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedBorrow, setSelectedBorrow] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false); // Edit modunu belirlemek için state
  const [formState, setFormState] = useState({
    borrowerName: '',
    borrowerMail: '',
    borrowingDate: '',
    bookForBorrowingRequest: { id: '' },
    returnDate: ''
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [validationMessage, setValidationMessage] = useState('');

  const BASE_URL = 'http://localhost:8080/api/v1';

  useEffect(() => {
    fetchBorrows();
    fetchBooks();
  }, []);
  
  const fetchBorrows = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/borrows`);
      setBorrows(response.data);
    } catch (error) {
      setErrorMessage("Error fetching borrows");
      console.error("Error fetching borrows", error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/books`);
      setBooks(response.data);
    } catch (error) {
      setErrorMessage("Error fetching books");
      console.error("Error fetching books", error);
    }
  };

  const handleOpenModal = (borrow = null) => {
    if (borrow) {
      setEditMode(true); // Edit moduna geç
      setSelectedBorrow(borrow);
      setFormState({
        borrowerName: borrow.borrowerName,
        borrowingDate: borrow.borrowingDate,
        returnDate: borrow.returnDate
      });
    } else {
      setEditMode(false); // Create moduna geç
      setSelectedBorrow(null);
      setFormState({
        borrowerName: '',
        borrowerMail: '',
        borrowingDate: new Date().toISOString().split("T")[0],
        bookForBorrowingRequest: { id: '' },
        returnDate: ''
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBorrow(null);
    setModalOpen(false);
    setValidationMessage('');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleBookChange = (e) => {
    const { value } = e.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      bookForBorrowingRequest: { id: value },
    }));
  };

  const handleSaveBorrow = async () => {
    if (!formState.borrowerName || !formState.borrowingDate || (!isEditMode && !formState.bookForBorrowingRequest.id)) {
      setValidationMessage('All required fields must be filled.');
      return;
    }

    if (formState.borrowerName.trim() === '') {
      setValidationMessage('Borrower name cannot be empty.');
      return;
    }

    try {
      if (isEditMode) {
        const updateData = {
          borrowerName: formState.borrowerName,
          borrowingDate: formState.borrowingDate,
          returnDate: formState.returnDate,
        };
        await axios.put(`${BASE_URL}/borrows/${selectedBorrow.id}`, updateData);
      } else {
        const createData = {
          borrowerName: formState.borrowerName,
          borrowerMail: formState.borrowerMail,
          borrowingDate: formState.borrowingDate,
          bookForBorrowingRequest: { id: formState.bookForBorrowingRequest.id },
        };
        await axios.post(`${BASE_URL}/borrows`, createData);
      }
      fetchBorrows();
      handleCloseModal();
    } catch (error) {
      setErrorMessage("Error saving borrow: " + error.response?.data?.message || error.message);
      console.error("Error saving borrow:", error);
    }
  };

  const handleDeleteBorrow = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/borrows/${id}`);
      fetchBorrows();
    } catch (error) {
      setErrorMessage("Error deleting borrow");
      console.error("Error deleting borrow", error);
    }
  };

  const handleCloseSnackbar = () => {
    setErrorMessage(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ marginTop: '2rem', backgroundColor: '#f3e5ab', padding: '1rem', borderRadius: '8px' }}>
        <h2 style={{ color: '#6b4226' }}>Book Borrows</h2>
        <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>Add New Borrow</Button>
        <Table style={{ marginTop: '1rem' }}>
          <TableHead>
            <TableRow>
              <TableCell>Borrower Name</TableCell>
              <TableCell>Borrowing Date</TableCell>
              <TableCell>Return Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {borrows.map((borrow) => (
              <TableRow key={borrow.id}>
                <TableCell>{borrow.borrowerName}</TableCell>
                <TableCell>{borrow.borrowingDate}</TableCell>
                <TableCell>{borrow.returnDate}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleOpenModal(borrow)}>Edit</Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDeleteBorrow(borrow.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isModalOpen} onClose={handleCloseModal}>
          <DialogTitle>{selectedBorrow ? 'Edit Borrow' : 'Add New Borrow'}</DialogTitle>
          <DialogContent>
            <TextField
              name="borrowerName"
              label="Borrower Name"
              value={formState.borrowerName}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="borrowingDate"
              label="Borrowing Date"
              type="date"
              value={formState.borrowingDate}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            {isEditMode && (
              <TextField
                name="returnDate"
                label="Return Date"
                type="date"
                value={formState.returnDate}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            )}
            {!isEditMode && (
              <>
                <TextField
                  name="borrowerMail"
                  label="Borrower Mail"
                  value={formState.borrowerMail}
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
                />
                <Select
                  name="bookForBorrowingRequest.id"
                  value={formState.bookForBorrowingRequest.id}
                  onChange={handleBookChange}
                  fullWidth
                  margin="normal"
                  displayEmpty
                  style={{ marginTop: '16px' }}
                >
                  <MenuItem value="" disabled>Select a Book</MenuItem>
                  {books.map((book) => (
                    <MenuItem key={book.id} value={book.id}>
                      {book.name}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleSaveBorrow} color="primary">Save</Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default Borrows;
