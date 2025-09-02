// src/components/RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm({ onRegisterSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await axios.post('http://localhost:5000/register', { name, email, password });
      setSuccessMessage('Registration successful! You can now login.');
      onRegisterSuccess && onRegisterSuccess();
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, marginLeft:-20, margin: 'auto',fontSize:25,color: 'white' }}>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <label>
        Name: <br/>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{width:400,height:40,borderRadius:10, }}
        />
      </label>
      <label>
        <br/>Email: <br/>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width:400,height:40,borderRadius:10 }}
        />
      </label>
      <label>
        <br/>Password:<br/>
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{width:400,height:40,borderRadius:10}}
        /><br/>
      </label>
      <br/>
      <button type="submit" style={{
        width: '35%',
       borderRadius:10,
        backgroundColor: 'white',
        color: 'black',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        fontFamily: `"Pangolin"`,
        letterSpacing:0.5,
        fontSize:24,
        marginLeft:'32%',
        height: 40,
      }}>REGISTER</button>
    </form>
  );
}

export default RegisterForm;
