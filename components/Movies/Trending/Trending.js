import React from 'react';
import styles from './Trending.module.scss'
import MovieCard from '../MovieCard/MovieCard';

export default function Trending({ trendingMovies }) {
  console.log(trendingMovies)
  const { dates, results } = trendingMovies
  return (
    <div>
      <h1>Trending</h1>
      {results && results.map((result) => {
        return (
          <MovieCard key={result.id} movie={result} />
        )
      })}
    </div>
  )
}
