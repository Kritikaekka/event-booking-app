import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from './Footer';

function EventDetail({ onLogout, logoUrl }) {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [seats, setSeats] = useState(1);
  const [message, setMessage] = useState('');
  const [bookingOpen, setBookingOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`http://localhost:5000/events/${id}`)
      .then(res => res.json())
      .then(data => setEvent(data))
      .catch(() => setEvent(null));
  }, [id]);

  if (!event) return <p>Loading...</p>;

  const openBookingModal = () => {
    setSeats(1);
    setMessage('');
    setBookingOpen(true);
  };

  const closeBookingModal = () => {
    setBookingOpen(false);
    setMessage('');
  };

  const handleBooking = async () => {
    if (!user || !token) {
      setMessage('Please login to book tickets.');
      return;
    }
    if (seats < 1) {
      setMessage('Please select at least 1 seat.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: user.id,
          eventId: event._id,
          seats,
        }),
      });
      if (res.ok) {
        setMessage('Booking successful!');
      } else {
        setMessage('Booking failed. Please try again.');
      }
    } catch {
      setMessage('Booking failed. Please try again.');
    }
  };

  return (
    <div style={{ position: 'relative', maxHeight: 4900, }}>
      {/* Blurred background */}
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(/download.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px)',
          transform: 'scale(1.1)',
          zIndex: -1,
        }}
      />

      {/* Container div for poster and details */}
      <div style={{
        position: 'relative',
        marginTop: 20,
        maxWidth: 1050,
        marginLeft:'10%',
        padding: 40,
        backgroundColor: 'rgba(3, 1, 1, 0.5)',
        borderRadius: 20,
        color: '#fff',
        boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
        fontFamily: `"Pangolin"`,
        letterSpacing:0.8,
        
      }}>
        <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
          {/* Poster */}
          <img
            src={event.bannerUrl}
            alt={event.title}
            style={{
              width: 300,
              borderRadius: 18,
              boxShadow: '0 4px 30px rgba(0,0,0,0.6)',
              
            }}
          />

          {/* Details */}
          <div style={{ flex: 1 }}>
            <h2 style={{ marginTop: 0, marginBottom: 16, fontWeight: 'bolder', fontSize: 70,  }}>
              {event.title}
            </h2>
            <p style={{ fontSize: 18, marginBottom: 16 }}>
              
              <strong>Date & Time:</strong> {new Date(event.date).toLocaleString()}
            </p>
            {event.description && <p><strong>Description:</strong> {event.description}</p>}
            {event.duration && <p><strong>Duration:</strong> {event.duration}</p>}
            {event.language && <p><strong>Language:</strong> {event.language}</p>}
            {event.ageRestrictions && <p><strong>Age Restrictions:</strong> {event.ageRestrictions}</p>}
            <p><strong>Location:</strong> {event.location}</p>
            <p style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20,backgroundColor:'black',width:130,textAlign:'center',borderRadius:8,padding:2 }}>
              Price: ₹{event.price}
            </p>

            {/* Book Tickets button */}
            <button style={{
              marginTop: 30,
              padding: '14px 15px',
              backgroundColor: '#000000a4',
              border: 'none',
              borderRadius: 8,
              fontWeight: 'bold',
              fontSize: 28,
              cursor: 'pointer',
             fontFamily: `"Pangolin"`,
              color:'#FFFFFF',
            }} onClick={openBookingModal}>
              BOOK TICKETS
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: '#000000ff',
            padding: 20,
            borderRadius: 10,
            width: 420,
            height: 320,
            textAlign: 'center',
            fontFamily: `"Pangolin"`,
            letterSpacing:0.5,
            color:'white',
            fontSize:26,
          }}>
            <h3>Book Tickets for {event.title}</h3>
            <label>
              Seats:&nbsp;
              <input
                type="number"
                min="1"
                max={event.capacity || 10}
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                style={{ width: 60, padding: 6 }}
              />
            </label>
            <div style={{ marginTop: 16 }}>
              <button onClick={handleBooking} style={{
                padding: '8px 16px',
                backgroundColor: '#ebd89bff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                marginRight: 8,
                fontWeight: 'bold',
                fontFamily: `"Pangolin"`,
            letterSpacing:0.5,
            fontSize:20,
            marginTop:10,
              }}>
                Confirm Booking
              </button>
              <button onClick={closeBookingModal} style={{
                padding: '8px 16px',
                backgroundColor: '#ddd',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontFamily: `"Pangolin"`,
            letterSpacing:0.5,
            fontSize:20,
              }}>
                Cancel
              </button>
            </div>
            {message && <p style={{ marginTop: 16, color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>}
          </div>
        </div>
      )}

       <>
    {/* ...main page content... */}
    <Footer />
  </>
    </div>

 
  );
}

export default EventDetail;
