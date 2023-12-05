import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login'; // Asegúrate de que este path sea correcto
import Register from './Components/Register'; // Asegúrate de que este path sea correcto
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Redirige la ruta raíz a /login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
