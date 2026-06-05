import React from 'react';
import styles from './CategorySidebar.module.scss';
import { SortResults } from "@/components/category";

export default function CategorySidebar({ onSortChange }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.box}>
        <div className={styles.sortSection}>
          <h2>Sort</h2>
          <div className={styles.divider} />
          <SortResults onSortChange={onSortChange} />
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.divider} />
        <h2>Where To Watch</h2>
      </div>
      <div className={styles.box}>
        <div className={styles.divider} />
        <h2>Filters</h2>
      </div>
    </aside>
  );
}
