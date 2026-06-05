import React, { useEffect } from 'react'
import { useMovies } from "@/context/moviesContest";
import { useState } from 'react';
import styles from './SearchResultsLabels.module.scss'


const SearchLabels = () => {
  const [labels, setLabels] = useState([
    { title: "TV Shows", count: 0 },
    { title: "Movies", count: 0 },
    { title: "People", count: 0 },
    { title: "Collections", count: 0 },
    { title: "Keywords", count: 0 },
    { title: "Companies", count: 0 },
    { title: "Networks", count: 0 },
    { title: "Awards", count: 0 },
  ])
  const { searchResults } = useMovies();
  const { movies } = searchResults ?? {};

  useEffect(() => {
    if (!movies?.total_results) return;

    setLabels((prev) =>
      prev.map((label) =>
        label.title === "Movies"
          ? { ...label, count: movies.total_results }
          : label,
      ),
    );
  }, [movies]);


  return (
    <div className={styles.labelsList}>
      {
        labels.map(({ title, count }) => {
          return (
            <div key={title} className={styles.labelContainer}>
              <p>{title}</p><span>{count}</span>
            </div>
          )
        })
      }
    </div>
  )

}
export default SearchLabels