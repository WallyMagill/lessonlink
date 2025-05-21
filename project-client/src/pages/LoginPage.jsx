import React, { useState } from 'react';
import '../styles/LoginPage.css';
import Header from '../components/Header';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { email, password });
  };

  return (
    <><Header />
      <div className="login-container">
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

          <button type="submit" className="cta-button">Sign In</button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
