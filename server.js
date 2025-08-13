// Load environment variables in development. On Render, env vars come from the dashboard.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const adminRoutes = require('./routes/adminRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// Enable CORS (limit to your frontend domain later via CORS_ORIGIN)
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// View engine for admin pages (optional)
app.set('view engine', 'pug');
app.use(express.static('public'));

// Health check for Render and manual testing
app.get('/health', (req, res) => res.json({ ok: true }));

// Register routes
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

// Connect to MongoDB and start server
async function start() {
  // Support both MONGO_URL and MONGO_URI
  const mongoUri = process.env.MONGO_URL || process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('❌ Missing MONGO_URL / MONGO_URI');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('✅ MongoDB connected');

    // Use Render's injected PORT in production; fallback for local dev
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
}

start();
