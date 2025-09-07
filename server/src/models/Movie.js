import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  movie_name: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: [String], // array of strings
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  poster_url: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  production: {
    type: String,
    default: 'N/A'
  },
  tagline: {
    type: String,
    default: ''
  },
}, {
  timestamps: true
});

export default mongoose.model('Movie', movieSchema);
