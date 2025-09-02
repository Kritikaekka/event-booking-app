import React from 'react';

export default function Footer() {
return (
<footer style={{
 
  padding: '90px 0 10px 0',  // Reduce vertical padding
  width: '100%',
  marginTop:20,
}}>
  <div style={{
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxWidth: '1300px',
    margin: '0 auto',
  }}>
    {/* Customer Care */}
    <div style={{ textAlign: 'center', color: 'white', flex: 1, cursor:'pointer'}}>
      <svg height="40" viewBox="0 0 70 70" fill="white"> {/* CHANGE height from 70 to 40 */}
        <circle cx="35" cy="35" r="32" stroke="black" strokeWidth="2" />
        <circle cx="35" cy="25" r="10" stroke="black" strokeWidth="2" />
        <path d="M20 50c0-6.5 10-12 15-12 5 0 15 5.5 15 12" stroke="black" strokeWidth="2" />
      </svg>
      <div style={{ marginTop: 8, fontSize: 13 }}>24/7 CUSTOMER CARE</div> {/* smaller text */}
    </div>
    {/* Booking Confirmation */}
    <div style={{ textAlign: 'center', color: 'white', flex: 1, cursor:'pointer' }}>
      <svg height="40" viewBox="0 0 70 70" fill="white">
        <circle cx="35" cy="35" r="32" stroke="black" strokeWidth="2" />
        <rect x="15" y="32" width="30" height="20" rx="4" stroke="black" strokeWidth="2" />
        <rect x="20" y="23" width="30" height="20" rx="4" stroke="black" strokeWidth="2" />
        <rect x="25" y="15" width="30" height="20" rx="4" stroke="black" strokeWidth="2" />
      </svg>
      <div style={{ marginTop: 8, fontSize: 13 }}>RESEND BOOKING CONFIRMATION</div>
    </div>
    {/* Newsletter */}
    <div style={{ textAlign: 'center', color: 'white', flex: 1, cursor:'pointer' }}>
      <svg height="40" viewBox="0 0 70 70" fill="white">
        <circle cx="35" cy="35" r="32" stroke="black" strokeWidth="2" />
        <rect x="10" y="19" width="50" height="34" rx="6" stroke="black" strokeWidth="2" />
        <polyline points="10,19 35,42 60,19" stroke="black" strokeWidth="2" fill="none"/>
      </svg>
      <div style={{ marginTop: 8, fontSize: 13 }}>SUBSCRIBE TO THE NEWSLETTER</div>
    </div>
  </div>
</footer>

);
}
