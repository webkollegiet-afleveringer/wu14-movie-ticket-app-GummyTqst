import { Link } from 'react-router';
import { FaStar } from "react-icons/fa6";
import { API } from '../api/tmdb';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

export function MovieCardVertical({ movie, size = 'md' }) {
  // Convert from tmdb 10 star to a 5 star
  const rating = movie.vote_average ? Math.round(movie.vote_average / 2) : 0;

  const widthClass = size === 'lg' ? 'w-64' : 'w-36';

  return (
    <Link
      to={`/movie/${movie.id}`}
      className={`cursor-pointer shrink-0 ${widthClass}`}
    >
      <div className="relative">
        <img 
          src={API.imgUrl(movie.poster_path)} 
          className="rounded-2xl object-cover w-full aspect-2/3"
          alt={movie.title}
        />
      </div>
      <h3 className="text-white text-sm mt-2 font-semibold truncate">{movie.title}</h3>
      <div className='flex items-center gap-1 mt-1'>
        {[...Array(5)].map((_, index) => (
          <FaStar 
            key={index}
            className={`size-18 ${index < rating ? 'text-yellow-400' : 'text-text'}`}
          />
        ))}
      </div>
    </Link>
  );
}

export function MovieCardHorizontal({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="cursor-pointer shrink-0 w-[95%]"
    >
      <img 
        src={API.imgUrl(movie.backdrop_path)} 
        className="rounded-2xl object-cover w-full h-48"
        alt={movie.title}
      />
      <h3 className="text-white text-sm mt-2 font-semibold truncate">{movie.title}</h3>
      <p className="text-gray-500 text-xs mt-1">{formatDate(movie.release_date)}</p>
    </Link>
  );
}