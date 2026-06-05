import React from 'react';
import styles from './SearchSidebar.module.scss';
import { SearchResultsLabels } from "@/components/search-page";

export default function SearchSidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h2>Search Results</h2>
      </div>
      <SearchResultsLabels />
    </aside>
  );
}
