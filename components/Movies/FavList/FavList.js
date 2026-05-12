'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./FavList.module.scss";

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
                  <span>{dateFormatter(fonudMovie.release_date)}</span>
                  {fonudMovie.genres?.length > 0 &&
                    fonudMovie.genres.map((genre) => (
                      <span key={genre.id}>{genre.name}</span>
                    ))}
                  <span>{fonudMovie.runtime} min</span>
                </div>
              </div>
              <span className={styles.value}>{fonudMovie.vote_average}/10</span>
              <div className={styles.synopsis}>
                <h2>{fonudMovie.tagline}</h2>
                <p >{fonudMovie.overview}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
