import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useSignIn, useIsAuthenticated } from 'react-auth-kit';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();

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
            email,
            password,
          },
        }),
      });
      const data = await response.json();
      signIn({
        token: data.token,
        tokenType: 'Token',
        expiresIn: 1440,
        authState: data.user_email,
      });

      navigate('/games');
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  if (isAuthenticated()) {
    return <Navigate to="/games" />;
  }

  return (
    <div className="body-background">
      <div className="formcontainer">
        <h2>Login</h2>
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
          <button type="submit">Login</button>
        </form>
        <p>
          Do not have an account?
          <Link to="/register">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
