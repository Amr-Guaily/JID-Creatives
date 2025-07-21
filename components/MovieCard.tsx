import { MovieSearchResult } from '@/types/movie';
import Link from 'next/link';
import MovieImage from './MovieImage';

interface MovieCardProps {
  movie: MovieSearchResult;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      href={`/${movie.imdbID}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-200 hover:scale-[1.03] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <div className="relative h-64 bg-gray-200">
        <MovieImage
          src={movie.Poster}
          alt={`${movie.Title} poster`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
          {movie.Title}
        </h3>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
            {movie.Year}
          </span>
          <span className="capitalize bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
            {movie.Type}
          </span>
        </div>
      </div>
    </Link>
  );
}
