import React from 'react';
import { MovieList } from "@/components/shared";
import { useMovies } from '@/context/moviesContest';


export default function Popular() {
  const { movies } = useMovies()
  return <MovieList heading='What&apos;s Popular' movies={movies} />
}
