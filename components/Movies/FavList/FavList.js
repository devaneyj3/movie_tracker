'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./FavList.module.scss";
import { Heart, List, Star, X } from 'lucide-react';
import { dateFormatter } from "@/utils/dateFormater";
import { useMovies } from "@/context/moviesContest";

export default function FavList({ movieDetails }) {
  const { movies } = useMovies()
  const [fonudMovies, setFoundMovies] = useState([])
  useEffect(() => {
    const filterMovies = () => {
      try {
        const movie = movies.results.filter((movie) => Number(movie.id) === Number(movieDetails.movieId))
        setFoundMovies(movie)
      } catch (error) {
        console.log(error)
        setFoundMovies([])
      }
    }
    filterMovies()
  }, [])
  return (
    <>
      <div className={styles.movieContainer}>
        {fonudMovies && fonudMovies.map((fonudMovie) => (

          <div key={fonudMovie.id} className={styles.movie}>
            <div className={styles.movieInfo}>
              <div className={styles.imageContainer}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${fonudMovie.poster_path}`}
                  width={150}
                  height={200}
                  alt={`${fonudMovie.title} Poster`}
                  className={styles.image}
                />
              </div>
              <div className={styles.details}>
                <div className={styles.detailHeader}>
                  <h2>{fonudMovie.title}</h2>
                  <div className={styles.attributes}>
                    <p>{dateFormatter(fonudMovie.release_date)}</p>
                  </div>
                </div>
                <div className={styles.synopsis}>
                  <p >{fonudMovie.overview}</p>
                </div>
              </div>
            </div>
            <div className={styles.actionBar}>
              <div className={styles.column}>
                <div className={styles.actionBox}>
                  <div className={styles.actionIcon}><Star /></div>
                  <h2>Rate it!</h2>
                </div>
              <div className={styles.actionBox}>
                <div className={styles.actionIcon}><Heart /></div>
                <h2>Favorite</h2>
                </div>
              </div>
              <div className={styles.column}>
              <div className={styles.actionBox}>
                <div className={styles.actionIcon}><List /></div>
                <h2>Add to list</h2>
              </div>
              <div className={styles.actionBox}>
                <div className={styles.actionIcon}><X /></div>
                <h2>Remove</h2>
              </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
