'use client';

import React from 'react';
import style from './Searchbar.module.scss';
import { useMovies } from '@/context/moviesContext';

export default function Searchbar() {
  const { setSearchText, submitSearch } = useMovies();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    submitSearch();
  };

  return (
    <form className={style.searchForm} onSubmit={handleSearchSubmit}>
      <input
        name="search"
        type="text"
        placeholder="Search for a movie, tv show of person....."
        className={style.searchbar}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
}
