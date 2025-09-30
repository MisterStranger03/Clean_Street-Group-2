require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
    }),
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Replace with frontend URL in production
  credentials: true,
}));

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const userRoutes = require('./routes/userRoutes');

// User routes
app.use('/api/users', userRoutes);