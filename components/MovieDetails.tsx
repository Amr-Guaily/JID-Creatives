'use client';

import { Movie } from '@/types/movie';
import { useRouter } from 'next/navigation';
import MovieImage from './MovieImage';

interface MovieDetailsProps {
  movie: Movie;
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Back Button */}
      <div className="p-4 border-b bg-gray-50">
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Search
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Poster */}
        <div className="md:w-1/3 lg:w-1/4">
          <div className="relative h-96 md:h-full bg-gray-200">
            <MovieImage
              src={movie.Poster}
              alt={`${movie.Title} poster`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
        </div>

        {/* Details */}
        <div className="md:w-2/3 lg:w-3/4 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {movie.Title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {movie.Year}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {movie.Rated}
              </span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                {movie.Runtime}
              </span>
            </div>
          </div>

          {/* Plot */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Plot</h2>
            <p className="text-gray-700 leading-relaxed">{movie.Plot}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Genre</h3>
              <p className="text-gray-700">{movie.Genre}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Director</h3>
              <p className="text-gray-700">{movie.Director}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Writer</h3>
              <p className="text-gray-700">{movie.Writer}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Actors</h3>
              <p className="text-gray-700">{movie.Actors}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Released</h3>
              <p className="text-gray-700">{movie.Released}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Language</h3>
              <p className="text-gray-700">{movie.Language}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Country</h3>
              <p className="text-gray-700">{movie.Country}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Box Office</h3>
              <p className="text-gray-700">
                {movie.BoxOffice !== 'N/A' ? movie.BoxOffice : 'Not available'}
              </p>
            </div>
          </div>

          {/* Ratings */}
          {movie.Ratings && movie.Ratings.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Ratings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {movie.Ratings.map((rating, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-3 rounded-lg text-center"
                  >
                    <div className="text-sm font-medium text-gray-600">
                      {rating.Source}
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {rating.Value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awards */}
          {movie.Awards && movie.Awards !== 'N/A' && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Awards</h3>
              <p className="text-gray-700">{movie.Awards}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
