import React from 'react';

function NavBar({ onLogout }) {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 40px',
      backgroundColor:'#0f0703ff',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        fontFamily: `'Rye', cursive`,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#efc336',
        cursor: 'default',
      }}>
        SHOWTIME
      </div>
      <button
        onClick={onLogout}
        style={{
          marginRight: -15,
          color: '#efc336',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: 7,
          fontWeight: 'bold',
          fontSize: 20 ,
          cursor: 'pointer',

        }}
      >
        LOGOUT
      </button>
    </nav>
  );
}

export default NavBar;
