// src/components/Register.js

import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/register', formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data.message || 'Error registering user');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' ,}}>
      
      <form onSubmit={handleSubmit}>
        <input style={{width:400,height:40,borderRadius:10,}}
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input style={{width:400,height:40,borderRadius:10,}}
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input style={{width:400,height:40,borderRadius:10,}}
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <button type="submit" style={{ padding: 10, width: '100%' }}>Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
