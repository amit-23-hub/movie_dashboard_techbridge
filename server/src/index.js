import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Routes
import authRoutes from './routes/auth.js';
import movieRoutes from './routes/movies.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['https://movie-client-omega.vercel.app' ,'https://movie-admin-olive.vercel.app'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

// MongoDB connection
const mongoUri = process.env.MONGODB_URI ;
mongoose.connect(mongoUri
).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Tech Bridge API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});