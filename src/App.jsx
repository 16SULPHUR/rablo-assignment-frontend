import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import AddProduct from './AddProduct';
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
