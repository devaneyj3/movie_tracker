'use client'
import Searchbar from '@/components/Header/Searchbar/Searchbar'
import Search from '@/components/Search/Search'
import React from 'react';
import styles from './SearchPage.module.scss'
import MovieList from '@/components/Movies/MovieList/MovieList';
import { useMovies } from '@/context/moviesContest';

export default function SearchPage() {
  const { searchResults } = useMovies()
  console.log(searchResults)
  return (
    <div>
      <Searchbar />
      <div className={styles.page} >
        <Search />
        <div>
          <MovieList heading='Search Results' movies={searchResults.movies.results} />
        </div>
      </div>
    </div>
  )
}
