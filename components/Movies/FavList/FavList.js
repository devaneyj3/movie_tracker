'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./FavList.module.scss";
import { Heart, List, Star, X } from 'lucide-react';
import { dateFormatter } from "@/utils/dateFormater";
import { useMovies } from "@/context/moviesContest";
import { isOnList } from "@/utils/isOnList";
import { useRouter } from "next/navigation";

export default function FavList({ movieDetails }) {

  const [fonudMovies, setFoundMovies] = useState([])


  const { movies, addToWatchlist, removeFromWatchlist, setSelectedMovie, watchlist, markMovieAsWatched, moviesWatched, removeMovieAsWatched } =
    useMovies();

  const router = useRouter();
  function goToMovie() {
    setSelectedMovie(movie)
    router.push(`/Movie/${id}`);
  }

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
  }, [movies, movieDetails?.movieId])
  return (
    <>
      <div className={styles.movieContainer}>
        {fonudMovies && fonudMovies.map((fonudMovie) => {
          const { id, title, poster_path, release_date , overview} = fonudMovie
          return (
            <div key={id} className={styles.movie}>
              <div className={styles.movieInfo}>
                <div className={styles.imageContainer}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    width={150}
                    height={200}
                    alt={`${title} Poster`}
                    className={styles.image}
                  />
                </div>
                <div className={styles.details}>
                  <p className={styles.lastWatched}>Last Watched: {dateFormatter(movieDetails.dateWatched)}</p>
                  <div className={styles.detailHeader}>
                    <h2>{title}</h2>
                    <div className={styles.attributes}>
                      <p>{dateFormatter(release_date)}</p>
                    </div>
                  </div>
                  <div className={styles.synopsis}>
                    <p >{overview}</p>
                  </div>
                </div>
              </div>
              <div>
                <hr />
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
                  <div className={styles.actionBox}
                    onClick={async (e) => {
                      e.stopPropagation();
                      try {
                        if (isOnList(moviesWatched, id)) {
                          await removeMovieAsWatched(fonudMovie);
                          return
                        } else {
                          await markMovieAsWatched(fonudMovie);
                        }
                      } catch (err) {
                        console.error(err);
                      }
                    }}>
                    <div className={styles.actionIcon}>{isOnList(moviesWatched, id) ? <X /> : <List />}</div>
                    <h2> {isOnList(moviesWatched, id) ? "Remove from Watched" : "Mark as Watched"}</h2>
                  </div>
                  <div className={styles.actionBox} onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      if (isOnList(watchlist, id)) {
                        await removeFromWatchlist(String(id), title);
                      } else {
                        await addToWatchlist(id, title);
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  }}>
                    <div className={styles.actionIcon}>{isOnList(watchlist, id) ? <X /> : <List />}</div>
                    <h2> {isOnList(watchlist, id) ? "Remove from Watchlist" : "Add to Watchlist"}</h2>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        )}
      </div>
    </>
  );
}
