'use client';

import React from 'react';
import style from './HeroSearch.module.scss';
import { useMovies } from '@/context/moviesContext';

export default function HeroSearch() {
  const { setSearchText, submitSearch } = useMovies();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    submitSearch();
  };

  return (
    <form className={style.heroSearchContainer} onSubmit={handleSearchSubmit}>
      <input
        name="search"
        type="text"
        placeholder="Search for a movie, tv show of person....."
        className={style.heroSearch}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button type="submit" className={style.searchBtn}>
        Search
      </button>
    </form>
  );
}
