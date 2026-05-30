import React from 'react';
import styles from './Search.module.scss'
import SEARCH_RESULTS_LABELS from '@/utils/searchResultsLabels';

export default function Search() {
  return (
    <div className={styles.searchResultsBox}>
      <div className={styles.searchHeaderBox}>
        <h2>Search Results</h2>
      </div>
      <div>
        {SEARCH_RESULTS_LABELS.map((label) => {
          return (
            <div key={label} className={styles.labelContainer}>
              <p>{label}</p><span>78</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
