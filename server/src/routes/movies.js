import express from 'express';
import Movie from '../models/Movie.js';
import { auth, adminOnly } from '../middleware/auth.js';


const router = express.Router();

// Get all movies with optional search and filters
router.get('/', async (req, res) => {
  try {
    const { 
      q,           // search query
      genre,       // filter by genre
      year,        // filter by year
      language,    // filter by language
      sortBy,      // sort field
      sortOrder    // sort order (asc/desc)
    } = req.query;
    
    let query = {};
    let sort = { createdAt: -1 };
    
    // Search functionality
    if (q) {
      query.$or = [
        { movie_name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tagline: { $regex: q, $options: 'i' } }
      ];
    }
    
    // Filter by genre
    if (genre) {
      const genres = Array.isArray(genre) ? genre : [genre];
      query.genre = { $in: genres.map(g => new RegExp(g, 'i')) };
    }
    
    // Filter by year
    if (year) {
      if (year.includes('-')) {
        // Range filter (e.g., "2020-2023")
        const [startYear, endYear] = year.split('-').map(y => parseInt(y.trim()));
        query.year = { $gte: startYear, $lte: endYear };
      } else {
        // Single year
        query.year = parseInt(year);
      }
    }
    
    // Filter by language
    if (language) {
      const languages = Array.isArray(language) ? language : [language];
      query.language = { $in: languages.map(l => new RegExp(l, 'i')) };
    }
    
    
    // Sorting
    if (sortBy) {
      const order = sortOrder === 'asc' ? 1 : -1;
      sort = { [sortBy]: order };
    }
    
    const movies = await Movie.find(query).sort(sort);
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get filter options (genres, languages, years)
router.get('/filters', async (req, res) => {
  try {
    const movies = await Movie.find({});
    
    // Extract unique genres
    const allGenres = movies.flatMap(movie => movie.genre);
    const uniqueGenres = [...new Set(allGenres)].sort();
    
    // Extract unique languages
    const allLanguages = movies.map(movie => movie.language);
    const uniqueLanguages = [...new Set(allLanguages)].sort();
    
    // Extract year range
    const years = movies.map(movie => movie.year).sort((a, b) => a - b);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    
    res.json({
      genres: uniqueGenres,
      languages: uniqueLanguages,
      yearRange: { min: minYear, max: maxYear }
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single movie
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create movie (admin only)
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Update movie (admin only)
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    Object.assign(movie, req.body);
    await movie.save();
    res.json(movie);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete movie (admin only)
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;