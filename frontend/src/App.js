import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EventsList from './components/EventsList';
import EventDetail from './components/EventDetail';
import NavBar from './components/NavBar';
import AuthLanding from './components/AuthLanding'; // <-- Use new layout

function App() {
  // Initialize user state from localStorage if present
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  // Controls showing login or register form
  const [showLogin, setShowLogin] = useState(true);

  // Sync user state to localStorage for persistence
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Called when login is successful, updates user state
  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  // Logs out user, clears state and localStorage
  const handleLogout = () => {
    setUser(null);
    setShowLogin(true);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <Router>
      {!user ? (
        <AuthLanding
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          handleLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <>
          <NavBar onLogout={handleLogout} logoUrl="/logo.png" />
          <Routes>
            <Route path="/" element={<EventsList onLogout={handleLogout} />} />
            <Route path="/event/:id" element={<EventDetail onLogout={handleLogout} logoUrl="/logo.png" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
