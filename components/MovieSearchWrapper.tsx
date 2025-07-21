'use client';

import { MovieService } from '@/lib/movieService';
import { MovieSearchResult } from '@/types/movie';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';
import MovieCard from './MovieCard';
import SearchInput from './SearchInput';

interface MovieSearchWrapperProps {
  initialQuery: string;
}

export default function MovieSearchWrapper({
  initialQuery,
}: MovieSearchWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchResults, setSearchResults] = useState<MovieSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const [currentQuery, setCurrentQuery] = useState(initialQuery);

  const handleSearch = useCallback(async (query: string) => {
    const params = new URLSearchParams(searchParams);

    if (!query) {
      params.delete('q');
      router.push(`/?${params.toString()}`, { scroll: false });
      setSearchResults([]);
      setCurrentQuery('');
      setError(null);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError(null);
    setCurrentQuery(query);
    setHasSearched(true);

    // Update URL with search query
    params.set('q', query);
    router.push(`/?${params.toString()}`, { scroll: false });

    try {
      const response = await MovieService.searchMovies(query);
      const results = response.Search || [];

      setSearchResults(results);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to search movies. Please try again.'
      );
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle initial query on mount
  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery, handleSearch]);

  return (
    <div className="mt-6">
      <SearchInput onSearch={handleSearch} initialValue={initialQuery} />

      {/* Error Message */}
      {error && (
        <div className="my-6">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* Search Results */}
      {!loading && searchResults.length > 0 && (
        <div>
          <div className="flex justify-between items-center my-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Search Results ({searchResults.length})
            </h3>
            <p className="text-sm text-gray-500">
              Searched for: "{currentQuery}"
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {searchResults.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </div>
      )}

      {/* Search Loading */}
      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <p className="text-gray-600">Searching for movies...</p>
          </div>
        </div>
      )}

      {/* No Results State - Only show after a search has been performed */}
      {searchResults.length === 0 && !loading && hasSearched && (
        <div className="text-center py-16">
          <svg
            className="w-24 h-24 text-gray-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No movies found
          </h3>
          <p className="text-gray-500">Try searching with different keywords</p>
        </div>
      )}

      {/* Welcome State */}
      {!currentQuery && !hasSearched && (
        <div className="text-center py-16">
          <div className="text-6xl mb-6">🎬</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Welcome to Movie Search
          </h3>
          <p className="text-gray-500">Start by searching for a movie above</p>
        </div>
      )}
    </div>
  );
}
