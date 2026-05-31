import React from 'react';
import { MovieList } from "@/components/shared";
import { useMovies } from '@/context/moviesContest';

export default function LatestTrailers() {
  const { movies } = useMovies()
  return <MovieList heading='Latest Trailers' movies={movies} />
}
