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
      main: '#8b4513', // Koyu kahverengi
    },
    secondary: {
      main: '#d32f2f', // Kırmızı ton (Silme butonları için)
    },
    background: {
      default: '#f5f5dc', // Krem rengi arka plan
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

  const BASE_URL = import.meta.env.VITE_REACT_APP_LIBRARY_APP_BASE_URL;

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
      setEditMode(true);
      setSelectedBorrow(borrow);
      setFormState({
        borrowerName: borrow.borrowerName,
        borrowingDate: borrow.borrowingDate,
        returnDate: borrow.returnDate
      });
    } else {
      setEditMode(false);
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
      <Container sx={{ backgroundColor: '#f5f5dc', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', height: '700px', width: '1000px' }}>
        <h2 style={{ color: '#8b4513', marginBottom: '20px' }}>Book Borrows</h2>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => handleOpenModal()} 
          sx={{ backgroundColor: '#8b4513', color: '#fff', '&:hover': { backgroundColor: '#5a3e2b' }, marginBottom: '20px' }}
        >
          Add New Borrow
        </Button>
        <Table sx={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <TableHead sx={{ backgroundColor: '#e0d9b0' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Borrower Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Borrowing Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Return Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4b3621' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {borrows.map((borrow) => (
              <TableRow key={borrow.id}>
                <TableCell>{borrow.borrowerName}</TableCell>
                <TableCell>{borrow.borrowingDate}</TableCell>
                <TableCell>{borrow.returnDate}</TableCell>
                <TableCell>
                  <Button 
                    onClick={() => handleOpenModal(borrow)} 
                    sx={{ color: '#fff', backgroundColor: '#8b4513', '&:hover': { backgroundColor: '#5a3e2b' }, marginRight: '10px' }}
                  >
                    Edit
                  </Button>
                  <Button 
                    onClick={() => handleDeleteBorrow(borrow.id)} 
                    sx={{ color: '#fff', backgroundColor: '#d32f2f', '&:hover': { backgroundColor: '#c62828' } }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isModalOpen} onClose={handleCloseModal}>
          <DialogTitle sx={{ backgroundColor: '#8b4513', color: '#fff' }}>{isEditMode ? 'Edit Borrow' : 'Add New Borrow'}</DialogTitle>
          <DialogContent sx={{ backgroundColor: '#f5f5dc' }}>
            <TextField
              name="borrowerName"
              label="Borrower Name"
              value={formState.borrowerName}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
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
              sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
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
                sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
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
                  sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
                />
                <Select
                  name="bookForBorrowingRequest.id"
                  value={formState.bookForBorrowingRequest.id}
                  onChange={handleBookChange}
                  fullWidth
                  margin="normal"
                  displayEmpty
                  sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
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
          <DialogActions sx={{ backgroundColor: '#f5f5dc' }}>
            <Button onClick={handleCloseModal} sx={{ color: '#8b4513' }}>Cancel</Button>
            <Button 
              onClick={handleSaveBorrow} 
              sx={{ backgroundColor: '#8b4513', color: '#fff', '&:hover': { backgroundColor: '#5a3e2b' } }}
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
    </ThemeProvider>
  );
};

export default Borrows;
