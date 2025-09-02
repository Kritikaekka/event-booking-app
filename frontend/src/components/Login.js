// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', formData);
      setMessage(res.data.message);
      setToken(res.data.token);
      // Save token to localStorage or context for future authenticated requests
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      setMessage(err.response?.data.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <button type="submit" style={{ padding: 10, width: '100%' }}>Login</button>
      </form>
      {message && <p>{message}</p>}
      {token && <p>Token saved!</p>}
    </div>
  );
}

export default Login;
