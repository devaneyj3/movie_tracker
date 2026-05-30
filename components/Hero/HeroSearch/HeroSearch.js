import React from 'react';
import style from './HeroSearch.module.scss'
import { useMovies } from '@/context/moviesContest';


export default function HeroSeach() {

  const { setSearchText, search } = useMovies()
  return (
    <div className={style.heroSearchContainer}>
      <input name='search' type='text' placeholder='Search for a movie, tv show of person.....' className={style.heroSearch} onChange={(e) => setSearchText(e.target.value)} />
      <button type='submit' className={style.searchBtn} onClick={search}>Search</button>
    </div>
  )
}
