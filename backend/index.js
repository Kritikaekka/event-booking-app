const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/event_booking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
});
const User = mongoose.model('User', userSchema);

// Event schema and model
const eventSchema = new mongoose.Schema({
  title: String,                // Title/Name
  category: String,             // Category ('movies', 'events', 'sports', 'activities')
  description: String,          // Description
  date: Date,                   // Date & Time
  duration: String,             // Duration (e.g., "2h 30m")
  location: String,             // Venue / Location
  ageRestrictions: String,      // Age Restrictions (e.g., "UA13+" or "18+")
  language: String,             // Language
  price: Number,                // Price
  bannerUrl: String             // bannerURL
});
const Event = mongoose.model('Event', eventSchema);

// Booking schema and model
const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  seats: Number,
  bookedAt: { type: Date, default: Date.now },
  paid: { type: Boolean, default: false },
});
const Booking = mongoose.model('Booking', bookingSchema);

// Registration route
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, passwordHash });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id }, '6cfb847cd0d4c6f51074cd27d1f9533a8b7a9bfcfa1c3ca075c3a5d3ada890c3', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

// Get list of events
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single event by its ID
app.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(404).json({ message: 'Event not found' });
  }
});

// Create a booking
app.post('/book', async (req, res) => {
  const { userId, eventId, seats } = req.body;
  try {
    const booking = new Booking({ userId, eventId, seats });
    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
