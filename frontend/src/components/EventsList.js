import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import ImageSlider from './ImageSlider';

const categories = ['All', 'Movies', 'Events', 'Sports', 'Activities'];

function EventsList({ onLogout }) {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    axios.get('http://localhost:5000/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredEvents = events.filter(event =>
    (category === 'All' || (event.type && event.type.toLowerCase() === category.toLowerCase())) &&
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        padding: 32,
        maxWidth: 1500,
        margin: 'auto',
        backgroundImage: `url('/download.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '30vh',
        color: 'black',
        fontFamily: `"Pangolin"`,
        letterSpacing: 0.5,
      }}
    >

      {/* Slideshow below navbar/top bar */}
      <ImageSlider />

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop:150, marginBottom: 24, justifyContent: 'space-between', zIndex: 99, }}>
        <div style={{ display: 'flex', gap: 14 }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search events..."
            style={{
              padding: 12,
              minWidth: 620,
              borderRadius: 14,
              border: '3px solid #bebebeff',
              fontFamily: `"Pangolin"`,
              letterSpacing: 0.8,
              fontSize: 17,
            }}
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{
              padding: 10,
              borderRadius: 14,
              border: '3px solid #bebebeff',
              fontSize: 17,
              minWidth: 150,
              fontFamily: `"Pangolin"`,
              letterSpacing: 0.8,
              color: '#6e6b6bff',
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      

      {/* Events Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 15,
      }}>
        {filteredEvents.length === 0 ? (
          <p>No events found.</p>
        ) : (
          filteredEvents.map(event => (
            <Link
              to={`/event/${event._id}`}
              key={event._id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                className="event-card"
                style={{
                  position: 'relative',
                  background: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: 16,
                  boxShadow: '0 2px 16px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  textAlign: 'center',
                  paddingBottom: 16,
                  cursor: 'pointer',
                }}
              >
                <img
                  src={event.bannerUrl}
                  alt={event.title}
                  style={{
                    width: '100%',
                    height: 380,
                    objectFit: 'cover',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                  }}
                />
                <div style={{ marginTop: 14, fontWeight: '600', fontSize: 18, color: '#000' }}>
                  {event.title}
                </div>

                {/* Date overlay */}
                <div
                  className="event-date-overlay"
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    padding: '6px 10px',
                    borderRadius: 8,
                    opacity: 0,
                    visibility: 'hidden',
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                    fontSize: 14,
                    fontWeight: '500',
                  }}
                >
                  {new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}

export default EventsList;
