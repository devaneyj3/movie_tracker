'use client';

import React from 'react';
import style from './Searchbar.module.scss';
import { useMovies } from '@/context/moviesContest';

export default function Searchbar() {
  const { setSearchText, search } = useMovies();

  const goToSearch = (e) => {
    e.preventDefault();
    search();
  };

  return (
    <form className={style.searchForm} onSubmit={goToSearch}>
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
