import React from 'react';
import { MovieList } from "@/components/shared";
import { useMovies } from '@/context/moviesContest';

export default function FreeToWatch() {
  const { movies } = useMovies()
  return <MovieList heading='Free To Watch' movies={movies}/>
}
