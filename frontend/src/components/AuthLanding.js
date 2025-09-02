import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

// Adjust paths and image array as needed
import image1 from '../image1.jpg';
import image2 from '../image2.jpg';
import image3 from '../image3.jpg';
import image4 from '../image4.jpg';

const images = [image1, image2, image3, image4];

export default function AuthLanding({ showLogin, setShowLogin, handleLoginSuccess }) {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex(i => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden',fontFamily: `"Pangolin"`,letterSpacing:0.5, }}>
      {/* Background slideshow with blur */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: -1,
        backgroundImage: `url(${images[bgIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s',
      }} />

      {/* Overlay divisions */}
      <div style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        zIndex: 1,
      }}>
        {/* Left division: brand and greeting */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '60px 40px',
          color: '#ffe062',
          textShadow: '2px 2px 8px #222',
        }}>
          <h1 style={{
            fontFamily: "'Rye', cursive",
            fontSize: 120,
            fontWeight: 'bold',
            marginBottom: 0,
            letterSpacing: 1,
            marginTop:-140,
          }}>
            SHOWTIME
          </h1>
          <h2 style={{
            fontSize: 34,
            fontWeight: '300',
            color: '#fff',
            marginBottom: 18,
            marginTop: 0,
            textShadow: '1px 1px 6px #222',
            fontFamily: `"Pangolin"`,
          }}>
            Welcome! Book tickets and join the fun.
          </h2>
        </div>
        {/* Right division: login/register forms */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 370,
        }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.66)',
            borderRadius: 12,
            boxShadow: '0 4px 28px rgba(0, 0, 0, 0.49)',
            padding: '40px 28px 32px 28px',
            minWidth: 340,
            width: "100%",
            maxWidth: 410,
            height: 500,
            
          }}>
            <h2 style={{ textAlign: 'center', marginTop: 8, color: '#ffffffff',fontSize:35,  }}>
              {showLogin ? 'Log in to your account' : 'Create an account'}
            </h2>
           
            {showLogin ? (
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            ) : (
              <RegisterForm onRegisterSuccess={() => setShowLogin(true)} />
            )}
            <div style={{ marginTop: 22, textAlign: 'center', color: '#ffffffff' }}>
              {showLogin ? (
                <>
                  Don&apos;t have an account?{' '}
                  <button
                    onClick={() => setShowLogin(false)}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: '#efc336',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      fontFamily: `"Pangolin"`,
                      letterSpacing:0.5,
                    }}
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  Have an account?{' '}
                  <button
                    onClick={() => setShowLogin(true)}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: '#efc336',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                  >
                    Log in
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
