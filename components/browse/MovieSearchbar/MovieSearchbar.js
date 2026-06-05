import React from 'react';
import styles from './MovieSearbar.module.scss'
import { SortResults } from "@/components/shared";

export default function MovieSearchbar({ onSortChange }) {
  return (
    <div className={styles.searchbar}>
      <div className={styles.box}>
        <div className={styles.sortResults}>
        <h2>Sort</h2>
          <div className={styles.border}></div>
          <SortResults onSortChange={onSortChange} />
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.border}></div>
        <h2>Where To Watch</h2>
      </div>
      <div className={styles.box}>
        <div className={styles.border}></div>
        <h2>Filters</h2>
      </div>
    </div>
  )
}
