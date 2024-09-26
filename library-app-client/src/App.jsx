import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Publishers from './pages/Publishers.jsx';
import Categories from './pages/Categories.jsx';
import Books from './pages/Books.jsx';
import Authors from './pages/Authors.jsx';
import BookOrders from './pages/BookOrders.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Layout from './components/Layout.jsx';

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
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    
  );
}

export default App;
