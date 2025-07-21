import { debounce } from '@/utils/debounce';
import { useEffect, useMemo, useState } from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  loading?: boolean;
  placeholder?: string;
  initialValue?: string;
}

export default function SearchInput({
  onSearch,
  loading = false,
  placeholder = 'Search for movies...',
  initialValue = '',
}: SearchInputProps) {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    if (query.trim() && query.length >= 3) {
      onSearch(query.trim());
    }
  }, []);

  const debouncedSearch = useMemo(() => debounce(onSearch, 500), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    debouncedSearch(newQuery.trim());
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {query && (
          <button
            onClick={() => {
              setQuery('');
              onSearch('');
            }}
            className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-slate-800"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          disabled={loading}
          minLength={3}
        />
        {loading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-600"></div>
          </div>
        )}
      </div>
      {query.length > 0 && query.length < 3 && (
        <p className="mt-1 text-sm text-gray-500">
          Please enter at least 3 characters to search
        </p>
      )}
    </div>
  );
}
