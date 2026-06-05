'use client';

import React, { useEffect, useState } from 'react';
import { MovieList } from "@/components/shared";
import tmdbQuery from '@/utils/tmdbQuery';

export default function LatestTrailers() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUpcomingMovies = async () => {
      try {
        const response = await tmdbQuery.getUpcomingMovies();
        setMovies(response?.results ?? []);
      } catch (error) {
        console.error(error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadUpcomingMovies();
  }, []);

  if (isLoading) {
    return (
      <section>
        <h1>Latest Trailers</h1>
        <p>Loading movies…</p>
      </section>
    );
  }

  return <MovieList heading="Latest Trailers" movies={movies} layout={'carousel'} />;
}
