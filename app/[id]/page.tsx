import ErrorMessage from '@/components/ErrorMessage';
import MovieDetails from '@/components/MovieDetails';
import { MovieService } from '@/lib/movieService';
import { Movie } from '@/types/movie';
import { notFound } from 'next/navigation';

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const movieID = (await params).id;

  try {
    const movieDetails: Movie = await MovieService.getMovieDetails(movieID);

    if (!movieDetails || movieDetails.Response === 'False') {
      notFound();
    }

    return <MovieDetails movie={movieDetails} />;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to load movie details';
    return <ErrorMessage message={errorMessage} />;
  }
}
