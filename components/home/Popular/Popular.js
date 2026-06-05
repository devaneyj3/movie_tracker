'use client';

import React, { useEffect, useState } from 'react';
import { MovieList } from "@/components/shared";
import tmdbQuery from "@/utils/tmdbQuery";

export default function Popular() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const response = await tmdbQuery.getPopularMovies();
        setMovies(response?.results ?? []);
      } catch (error) {
        console.error(error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  if (isLoading) {
    return (
      <section>
        <h1>What&apos;s Popular</h1>
        <p>Loading movies…</p>
      </section>
    );
  }

  return <MovieList heading="What's Popular" movies={movies} layout={'carousel'} />;
}
