import React from 'react';
import MovieList from '../MovieList/MovieList';

export default function Trending({movies}) {
  return (
    <MovieList heading="Trending" movies={movies} />
  )
}
