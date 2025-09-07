import { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import MovieSlider from '../components/MovieSlider';
import MovieFilters from '../components/MovieFilters';
import { moviesAPI } from '../services/api';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async (searchQuery = '', currentFilters = {}) => {
    try {
      setLoading(true);
      const combinedFilters = {
        ...currentFilters,
        ...(searchQuery && { search: searchQuery })
      };
      const data = await moviesAPI.getAll(combinedFilters);
      // Populate both datasets: full list for slider, filtered list for grid
      setMovies(data);
      setFilteredMovies(data);
    } catch (err) {
      setError('Failed to load movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(async (searchQuery) => {
    setSearchTerm(searchQuery);
    await fetchMovies(searchQuery, filters);
  }, [filters]);

  const handleFiltersChange = useCallback(async (newFilters) => {
    setFilters(newFilters);
    await fetchMovies(searchTerm, newFilters);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Slider */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Welcome to Tech Bridge Movies
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover amazing movies and explore the world of cinema
            </p>
          </div>
          
          {/* Movie Slider */}
          {movies.length > 0 && (
            <div className="mb-12">
              <MovieSlider movies={movies.slice(0, 5)} />
            </div>
          )}
        </div>
      </div>

      {/* Search and Movie Grid Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Movies</h2>
          <p className="text-gray-600 mb-8">Search and discover your next favorite movie</p>
        </div>
        
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <MovieFilters 
          onFiltersChange={handleFiltersChange}
          currentFilters={filters}
        />
        
        <MovieGrid
          movies={filteredMovies}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}