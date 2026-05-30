import Searchbar from '@/components/Header/Searchbar/Searchbar'
import Search from '@/components/Search/Search'
import React from 'react';
import styles from './SearchPage.module.scss'

export default function SearchPage() {
  return (
    <div>
      <Searchbar />
      <div className={styles.page} >
        <Search />
      <div>
        Search Results
      </div>
      </div>
    </div>
  )
}
