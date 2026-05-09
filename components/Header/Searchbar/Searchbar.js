import React from 'react';
import style from './Searchbar.module.scss'

export default function Searchbar() {
  return (
    <input type ='text' placeholder='Search for a movie, tv show of person.....' className={style.searchbar}/>
  )
}
