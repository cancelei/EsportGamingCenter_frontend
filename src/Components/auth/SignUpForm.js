import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useIsAuthenticated } from 'react-auth-kit';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      console.error('Passwords do not match');
      // Mostrar mensaje de error en la interfaz
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email,
            password,
            password_confirmation: passwordConfirmation,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Successful registration:', data);
        navigate('/login'); // Navegar a la página de inicio de sesión
      } else {
        const errorData = await response.json();
        console.error('Registration error:', errorData);
        // Mostrar mensaje de error en la interfaz
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Mostrar mensaje de error en la interfaz
    }
  };

  if(isAuthenticated()) {
    return <Navigate to="/games" />
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="emailId">
            Email:
            <input
              type="email"
              value={email}
              id="emailId"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="passwordId">
            Password:
            <input
              type="password"
              value={password}
              id="passwordId"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="passwordConfirmationId">
            Confirm Password:
            <input
              type="password"
              value={passwordConfirmation}
              id="passwordConfirmationId"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?
        <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
