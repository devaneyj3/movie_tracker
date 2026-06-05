'use client';

import React, { useEffect, useState } from 'react';
import { MovieList } from "@/components/shared";
import tmdbQuery from '@/utils/tmdbQuery';

export default function FreeToWatch() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNowPlayingMovies = async () => {
      try {
        const response = await tmdbQuery.getNowPlayingMovies();
        setMovies(response?.results ?? []);
      } catch (error) {
        console.error(error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadNowPlayingMovies();
  }, []);

  if (isLoading) {
    return (
      <section>
        <h1>Free To Watch</h1>
        <p>Loading movies…</p>
      </section>
    );
  }

  return <MovieList heading="Free To Watch" movies={movies} />;
}
