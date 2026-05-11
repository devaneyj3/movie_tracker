import React from 'react';
import MovieList from '../MovieList/MovieList';
import { useMovies } from '@/context/moviesContest';

export default function Trending() {
  const { movies } = useMovies()
  return (
    <MovieList heading="Trending" movies={movies} />
  )
}
