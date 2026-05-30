import React from 'react';
import styles from './Search.module.scss'
import SearchLabels from '@/components/SearchResultsLabels/SearchResultsLabels';

export default function Search() {
  return (
    <div className={styles.searchResultsBox}>
      <div className={styles.searchHeaderBox}>
        <h2>Search Results</h2>
      </div>
      <div>
        <SearchLabels />
      </div>
    </div>
  )
}
