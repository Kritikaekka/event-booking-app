import React, { useState } from 'react';
import axios from 'axios';

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      // Save token and user for later use
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      // Notify App to update login state
      if (onLoginSuccess) {
        onLoginSuccess(response.data.user);
      }
    } catch (err) {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', color:'white',fontSize:25,}}>
    <form onSubmit={handleSubmit}>
      <label>
        Email:<br/>
        <input style={{width:400,height:40,borderRadius:10,}}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </label>
      <br /><br/>
      <label>
        Password:<br/>
        <input style={{width:400,height:40,borderRadius:10,}}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit" style={{width:100,height:40, marginTop:60,marginLeft:'35%', borderRadius:10,fontSize:24,fontFamily: `"Pangolin"`,letterSpacing:0.5,}}>LOGIN</button>
      {message && <p style={{color: "red"}}>{message}</p>}
    </form>
    </div>
  );
}

export default LoginForm;
