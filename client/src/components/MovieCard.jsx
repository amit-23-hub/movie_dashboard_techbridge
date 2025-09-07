import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl group">
      <Link to={`/movie/${movie._id}`} className="block">
        <div className="relative overflow-hidden">
          {movie.poster_url ? (
            <img
              src={movie.poster_url}
              alt={movie.movie_name}
              className="w-full h-64 object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
              }}
            />
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-sm">No poster available</span>
            </div>
          )}
          
          
         
          <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
            {movie.year}
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {movie.movie_name}
          </h3>
          
         
          
          <div className="flex flex-wrap gap-1 mb-3">
            {movie.genre.slice(0, 3).map((genre, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
              >
                {genre}
              </span>
            ))}
            {movie.genre.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{movie.genre.length - 3}
              </span>
            )}
          </div>
          
         
          <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
            <span className="font-medium">{movie.language}</span>
            {movie.production && movie.production !== 'N/A' && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {movie.production}
              </span>
            )}
          </div>
          
         
          <p className="text-sm text-gray-600 line-clamp-3">
            {movie.description}
          </p>
        </div>
      </Link>
    </div>
  );
}
