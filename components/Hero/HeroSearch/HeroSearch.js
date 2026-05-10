import React from 'react';
import style from './HeroSearch.module.scss'

export default function HeroSeach() {
  return (
    <div  className={style.heroSearchContainer}>
      <input name='search' type='text' placeholder='Search for a movie, tv show of person.....' className={style.heroSearch} />
      <button type='submit' className={style.searchBtn}>Search</button>
    </div>
  )
}
