'use client';

import React, { useEffect, useState } from 'react';
import { MovieList } from "@/components/shared";
import tmdbQuery from '@/utils/tmdbQuery';
import sortByDate from '@/utils/sortByDate';

export default function Trending() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        const response = await tmdbQuery.getTrendingMovies();
        setMovies(sortByDate(response?.results ?? []));
      } catch (error) {
        console.error(error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTrendingMovies();
  }, []);

  if (isLoading) {
    return (
      <section>
        <h1>Trending</h1>
        <p>Loading movies…</p>
      </section>
    );
  }

  return <MovieList heading="Trending" movies={movies} />;
}
