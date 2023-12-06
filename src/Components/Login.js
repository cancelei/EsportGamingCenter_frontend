// src/components/Login.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa Link

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users/sign_in', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          },
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login succes:', data);
       
      } else {
        console.error('Login Error:', data);
      
      }
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        ¿Don't have an account? <Link to="/register">Sign up here</Link> {/* Enlace al registro */}
      </p>
    </div>
  );
}

export default Login;
