import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { moviesAPI } from '../services/api';

export default function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const data = await moviesAPI.getById(id);
      setMovie(data);
    } catch (err) {
      setError('Failed to load movie details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-96 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-red-500">{error}</div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          {/* Header - Back Button */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Movies
            </button>
          </div>

          <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
            {/* Hero Section */}
            <div className="relative h-96 md:h-[500px] bg-cover bg-center bg-no-repeat"
                 style={{
                   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${movie.poster_url || 'https://via.placeholder.com/1200x600?text=No+Image'})`
                 }}>
              <div className="absolute inset-0 flex items-end">
                <div className="container mx-auto px-6 pb-8 text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.movie_name}</h1>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="px-4 py-2 bg-red-600 text-white rounded-full text-lg font-semibold">
                      {movie.year}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {movie.genre.map((genre, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Movie</h2>
                  <p className="text-gray-700 leading-relaxed text-lg mb-8">
                    {movie.description || "No description available."}
                  </p>

                  {/* Movie Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Movie Information</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Language:</span>
                          <span className="font-medium">{movie.language}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Year:</span>
                          <span className="font-medium">{movie.year}</span>
                        </div>
                        {movie.production && movie.production !== 'N/A' && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Production:</span>
                            <span className="font-medium">{movie.production}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Genres</h3>
                      <div className="flex flex-wrap gap-2">
                        {movie.genre.map((genre, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Poster Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-8">
                    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                      <img
                        className="w-full h-auto object-cover"
                        src={movie.poster_url || 'https://via.placeholder.com/400x600?text=No+Image'}
                        alt={movie.movie_name}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x600?text=No+Image';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
