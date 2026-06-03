'use client';

import React from 'react';
import style from './HeroSearch.module.scss';
import { useMovies } from '@/context/moviesContest';

export default function HeroSeach() {
  const { setSearchText, search } = useMovies();

  const goToSearch = (e) => {
    e.preventDefault();
    search();
  };

  return (
    <form className={style.heroSearchContainer} onSubmit={goToSearch}>
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
