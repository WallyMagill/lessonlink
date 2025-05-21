import React, { useState } from 'react';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function LoginPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { email, password });
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior (page reload)

    // Handle your sign-in logic here (e.g., validate credentials, call API)

    // After successful sign-in, navigate to the dashboard
    navigate('/dashboard');
  };

  return (
    <><Header />
      <div className="login-container">
        <div className="holder">
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Login</h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
            />

            {/* <button type="submit" className="cta-button">Sign In</button> */}
          </form>
          <form onSubmit={handleSubmit}>
            {/* Your form inputs here */}

            <button id="signin" type="submit" className="cta-button">Sign In</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
