import React from 'react';
import { MovieList } from "@/components/shared";

export default function Trending({movies}) {
  return (
    <MovieList heading="Trending" movies={movies} />
  )
}
