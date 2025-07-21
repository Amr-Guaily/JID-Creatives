import { Movie, SearchResponse } from '@/types/movie';

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_OMDB_BASE_URL;

if (!API_KEY) {
  throw new Error(
    'NEXT_PUBLIC_OMDB_API_KEY is not defined in environment variables'
  );
}

if (!BASE_URL) {
  throw new Error(
    'NEXT_PUBLIC_OMDB_BASE_URL is not defined in environment variables'
  );
}

export class MovieService {
  private static async makeRequest<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Check if the API returned an error
      if (data.Response === 'False') {
        throw new Error(data.Error || 'API request failed');
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  static async searchMovies(
    query: string,
    page: number = 1
  ): Promise<SearchResponse> {
    if (!query.trim()) {
      throw new Error('Search query cannot be empty');
    }

    const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(
      query
    )}&page=${page}`;
    return this.makeRequest<SearchResponse>(url);
  }

  static async getMovieDetails(imdbID: string): Promise<Movie> {
    if (!imdbID.trim()) {
      throw new Error('IMDb ID cannot be empty');
    }

    const url = `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`;
    return this.makeRequest<Movie>(url);
  }

  static async getMovieByTitle(title: string): Promise<Movie> {
    if (!title.trim()) {
      throw new Error('Movie title cannot be empty');
    }

    const url = `${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(
      title
    )}&plot=full`;
    return this.makeRequest<Movie>(url);
  }
}
