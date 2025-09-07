import { useState, useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { moviesAPI } from '../services/api';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (term) => {
      if (term.trim()) {
        setIsLoading(true);
        try {
          const results = await moviesAPI.getAll({ search: term });
          setSuggestions(results.slice(0, 5)); // Show top 5 suggestions
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
      onSearch(term);
    }, 300),
    [onSearch]
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleSuggestionClick = (movie) => {
    setSearchTerm(movie.movie_name);
    setShowSuggestions(false);
    onSearch(movie.movie_name);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch('');
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto search-container">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => searchTerm && setShowSuggestions(true)}
          placeholder="Search for movies, genres, or keywords..."
          className="w-full pl-12 pr-12 py-4 text-gray-900 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
        />
        {isLoading && (
          <div className="absolute right-12 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          </div>
        )}
        {searchTerm && !isLoading && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
          {suggestions.map((movie) => (
            <div
              key={movie._id}
              onClick={() => handleSuggestionClick(movie)}
              className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <img
                    src={movie.poster_url || 'https://via.placeholder.com/60x90?text=No+Image'}
                    alt={movie.movie_name}
                    className="w-12 h-16 object-cover rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {movie.movie_name}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">
                    {movie.year} • {movie.genre.join(', ')}
                  </p>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {movie.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No results message */}
      {showSuggestions && searchTerm && !isLoading && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4">
          <p className="text-sm text-gray-500 text-center">
            No movies found for "{searchTerm}"
          </p>
        </div>
      )}
      
      {/* Search suggestions or tips */}
      <div className="mt-3 text-center">
        <p className="text-sm text-gray-500">
          Try searching for: <span className="text-blue-600 font-medium">"Lagaan"</span>, 
          <span className="text-blue-600 font-medium"> "Action"</span>, 
          <span className="text-blue-600 font-medium"> "2021"</span>, or 
          <span className="text-blue-600 font-medium"> "Hindi"</span>
        </p>
      </div>
    </div>
  );
}