import React from 'react';
import styles from './MovieSearbar.module.scss'

export default function MovieSearchbar() {
  return (
    <div className={styles.searchbar}>
      <div className={styles.box}>
        <h2>Sort</h2>
        <div className={styles.sortResults}>
          <div className={styles.border}></div>
          <p>Sort Results By</p>
        </div>
      </div>
      <div className={styles.box}>
        <h2>Where To Watch</h2>
      </div>
      <div className={styles.box}>
        <h2>Filters</h2>
      </div>
    </div>
  )
}
