import React from 'react';
import styles from './Search.module.scss'
import { SearchResultsLabels } from "@/components/page-search";

export default function Search() {
  return (
    <div className={styles.searchResultsBox}>
      <div className={styles.searchHeaderBox}>
        <h2>Search Results</h2>
      </div>
      <div>
        <SearchResultsLabels />
      </div>
    </div>
  )
}
