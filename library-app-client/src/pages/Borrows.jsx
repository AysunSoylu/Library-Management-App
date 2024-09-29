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
  const [books, setBooks] = useState([]); // Kitap listesini saklayacak state
  const [selectedBorrow, setSelectedBorrow] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    borrowerName: '',
    borrowerMail: '',
    borrowingDate: '',
    bookForBorrowingRequest: {
      id: ''
    }
  });
  const [errorMessage, setErrorMessage] = useState(null); // Hata mesajı için state
  const [validationMessage, setValidationMessage] = useState(''); // Validasyon mesajı için state

  const BASE_URL = 'http://localhost:8080/api/v1';

  useEffect(() => {
    fetchBorrows();
    fetchBooks(); // Kitapları çekme fonksiyonunu çağırıyoruz
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
      const response = await axios.get(`${BASE_URL}/books`); // Kitapları çekiyoruz
      setBooks(response.data);
    } catch (error) {
      setErrorMessage("Error fetching books");
      console.error("Error fetching books", error);
    }
  };

  const handleOpenModal = (borrow = null) => {
    setSelectedBorrow(borrow);
    setFormState(
      borrow
        ? {
            borrowerName: borrow.borrowerName,
            borrowerMail: borrow.borrowerMail,
            borrowingDate: borrow.borrowingDate,
            bookForBorrowingRequest: {
              id: borrow.book.id
            }
          }
        : {
            borrowerName: '',
            borrowerMail: '',
            borrowingDate: new Date,
            bookForBorrowingRequest: {
              id: ''
            }
          }
    );
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBorrow(null);
    setModalOpen(false);
    setValidationMessage(''); // Modal kapatıldığında validasyon mesajını sıfırla
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'bookId') {
      setFormState({
        ...formState,
        bookForBorrowingRequest: {
          ...formState.bookForBorrowingRequest,
          id: value
        },
      });
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const handleSaveBorrow = async () => {
    // Validasyon: Alanların boş olup olmadığını kontrol et
    if (!formState.borrowerName || !formState.borrowerMail || !formState.borrowingDate || !formState.bookForBorrowingRequest.id) {
      setValidationMessage('All fields are required.'); // Hata mesajını ayarla
      return; // Fonksiyondan çık
    }

    // Boş string değerlerin gönderilmemesi için kontrol
    if (formState.borrowerName.trim() === '' || formState.borrowerMail.trim() === '') {
      setValidationMessage('String values cannot be empty.'); // Hata mesajını ayarla
      return; // Fonksiyondan çık
    }

    try {
      const saveData = {
        borrowerName: formState.borrowerName,
        borrowerMail: formState.borrowerMail,
        borrowingDate: formState.borrowingDate,
        bookForBorrowingRequest: {
          id: formState.bookForBorrowingRequest.id
        }
      };
      
      console.log('Save Data:', saveData); // Gönderilen veriyi kontrol etmek için

      if (selectedBorrow) {
        // Güncelleme işlemi
        const response = await axios.put(`${BASE_URL}/borrows/${selectedBorrow.id}`, saveData);
        console.log('Update Response:', response.data); // Güncelleme sonrası dönen veriyi logla
      } else {
        // Ekleme işlemi
        const response = await axios.post(`${BASE_URL}/borrows`, saveData);
        console.log('Create Response:', response.data); // Ekleme sonrası dönen veriyi logla
      }
      fetchBorrows(); // Verileri yeniden çek
      handleCloseModal();
    } catch (error) {
      setErrorMessage("Error saving borrow: " + error.response?.data?.message || error.message); // Hata mesajını ayarla
      console.error("Error saving borrow:", error);
    }
  };

  const handleDeleteBorrow = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/borrows/${id}`);
      fetchBorrows(); // Verileri yeniden çek
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
              <TableCell>Borrower Mail</TableCell>
              <TableCell>Borrowing Date</TableCell>
              <TableCell>Return Date</TableCell>
              <TableCell>Book Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {borrows.map((borrow) => (
              <TableRow key={borrow.id}>
                <TableCell>{borrow.borrowerName}</TableCell>
                <TableCell>{borrow.borrowerMail}</TableCell>
                <TableCell>{borrow.borrowingDate}</TableCell>
                <TableCell>{borrow.returnDate}</TableCell>
                <TableCell>{borrow.book.name}</TableCell>
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
              name="borrowerMail"
              label="Borrower Mail"
              value={formState.borrowerMail}
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
            {/* Kitap Seçimi için Select */}
            <Select
              name="bookId"
              value={formState.bookForBorrowingRequest.id}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              displayEmpty
              style={{ marginTop: '16px' }}
            >
              <MenuItem value="" disabled>
                Select a Book
              </MenuItem>
              {books.map((book) => (
                <MenuItem key={book.id} value={book.id}>
                  {book.name}
                </MenuItem>
              ))}
            </Select>
            {/* Validasyon mesajını göster */}
            {validationMessage && <div style={{ color: 'red' }}>{validationMessage}</div>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleSaveBorrow} color="primary">Save</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar bileşeni */}
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
