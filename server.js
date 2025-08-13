// server.js

// Load .env only in development. On Render, env vars come from the dashboard.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const adminRoutes = require('./routes/adminRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

/* ----------------------- Middleware ----------------------- */
// Allow your React app to call this API.
// While testing you can keep "*"; later lock it to your Vercel URL via CORS_ORIGIN.
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

// Parse JSON and form bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// (Optional) Pug views for admin pages
app.set('view engine', 'pug');
app.use(express.static('public'));

/* ----------------------- Health & Root ----------------------- */
// Simple root message (so / doesn't 404)
app.get('/', (_req, res) => res.type('text').send('API is alive. Try /health or /api/projects'));
app.get('/health', (_req, res) => res.json({ ok: true }));

/* ----------------------- Routes ----------------------- */
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

/* ----------------------- Start-up ----------------------- */
async function start() {
  // Use either MONGO_URL or MONGO_URI (Render: set one of them, not both)
  const mongoUri = process.env.MONGO_URL || process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('❌ Missing MONGO_URL / MONGO_URI environment variable');
    process.exit(1);
  }

  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
    console.log('✅ MongoDB connected');

    // IMPORTANT: Render injects PORT. Do NOT set a custom PORT in Render.
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Crash early so Render logs show the real error
  }
}

start();

/* ----------------------- Error handler (nice to have) ----------------------- */
app.use((err, _req, res, _next) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});
