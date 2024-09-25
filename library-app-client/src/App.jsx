import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'; // Home bileşenini içe aktarıyoruz
import Publishers from './pages/Publishers.jsx'; // Publishers bileşenini içe aktarıyoruz
import Categories from './pages/Categories.jsx'; // Categories bileşenini içe aktarıyoruz
import Books from './pages/Books.jsx'; // Books bileşenini içe aktarıyoruz
import Authors from './pages/Authors.jsx'; // Authors bileşenini içe aktarıyoruz
import BookOrders from './pages/BookOrders.jsx'; // BookOrders bileşenini içe aktarıyoruz
import Layout from './components/Layout.jsx'; // Layout bileşenini içe aktarıyoruz

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/publishers" element={<Publishers />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/books" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/book-orders" element={<BookOrders />} />
        </Routes>
      </Layout>
  );
}

export default App;

