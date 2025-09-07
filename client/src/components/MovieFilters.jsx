import { useState, useEffect } from 'react';
import { moviesAPI } from '../services/api';

export default function MovieFilters({ onFiltersChange, currentFilters = {} }) {
  const [filters, setFilters] = useState({
    genre: [],
    language: [],
    year: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    ...currentFilters
  });
  
  const [filterOptions, setFilterOptions] = useState({
    genres: [],
    languages: [],
    yearRange: { min: 1950, max: 2024 }
  });
  
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const options = await moviesAPI.getFilters();
      setFilterOptions(options);
    } catch (error) {
      console.error('Failed to fetch filter options:', error);
    }
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters };
    
    if (filterType === 'genre' || filterType === 'language') {
      if (filters[filterType].includes(value)) {
        newFilters[filterType] = filters[filterType].filter(item => item !== value);
      } else {
        newFilters[filterType] = [...filters[filterType], value];
      }
    } else {
      newFilters[filterType] = value;
    }
    
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      genre: [],
      language: [],
      year: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = () => {
    return filters.genre.length > 0 || 
           filters.language.length > 0 || 
           filters.year || 
           filters.sortBy !== 'createdAt' ||
           filters.sortOrder !== 'desc';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters & Sort</h3>
        <div className="flex items-center gap-2">
          {hasActiveFilters() && (
            <button
              onClick={clearFilters}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Genre Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Genres
            </label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => handleFilterChange('genre', genre)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.genre.includes(genre)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Language Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Languages
            </label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.languages.map(language => (
                <button
                  key={language}
                  onClick={() => handleFilterChange('language', language)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.language.includes(language)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year
            </label>
            <div className="flex gap-4">
              <select
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Years</option>
                {Array.from({ length: filterOptions.yearRange.max - filterOptions.yearRange.min + 1 }, (_, i) => {
                  const year = filterOptions.yearRange.max - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>


          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <div className="flex gap-4">
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="createdAt">Date Added</option>
                <option value="movie_name">Name</option>
                <option value="year">Year</option>
              </select>
              <select
                value={filters.sortOrder}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters() && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {filters.genre.map(genre => (
              <span key={genre} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Genre: {genre}
                <button
                  onClick={() => handleFilterChange('genre', genre)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
            {filters.language.map(language => (
              <span key={language} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Language: {language}
                <button
                  onClick={() => handleFilterChange('language', language)}
                  className="ml-1 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            ))}
            {filters.year && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Year: {filters.year}
                <button
                  onClick={() => handleFilterChange('year', '')}
                  className="ml-1 text-yellow-600 hover:text-yellow-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
