import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      console.error('Passwords do not match');
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
      const data = await response.json();
      if (response.ok) {
        console.log('Successful registration:', data);
        navigate('/login'); 
      } else {
        console.error('Registration error:', data);
        
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>

          <label name="email" htmlFor="emailId" aria-controls="email">
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
          <label htmlFor="passwordId" aria-controls="password">
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
          <label htmlFor="passwordconfirmationId" aria-controls="passwordconfirmation">
            Confirm Password:
            <input
              type="password"
              value={passwordConfirmation}
              id="passwordconfirmationId"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
