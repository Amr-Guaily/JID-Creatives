import LoadingSpinner from '@/components/LoadingSpinner';
import MovieSearchWrapper from '@/components/MovieSearchWrapper';
import { Suspense } from 'react';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const initialQuery = await searchParams;

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Discover Your Next Favorite Movie
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Search through thousands of movies and get detailed information about
          your favorites
        </p>
      </div>

      <Suspense
        fallback={
          <div className="bg-gray-50 flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <MovieSearchWrapper initialQuery={initialQuery.q || ''} />
      </Suspense>
    </>
  );
}
