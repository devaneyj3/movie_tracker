"use client"

import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import MovieCard from "../MovieCard/MovieCard"

export default function Slider({ movies }) {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 8,
      spacing: 15,
    },
    breakpoints: {
      "(min-width: 200px)": {
        slides: { perView: 2.5, spacing: 12 },
      },
      "(min-width: 511px)": {
        slides: { perView: 3.5, spacing: 12 },
      },
      "(min-width: 768px)": {
        slides: { perView: 4.5, spacing: 15 },
      },
      "(min-width: 900px)": {
        slides: { perView: 5.5, spacing: 15 },
      },
      "(min-width: 1200px)": {
        slides: { perView: 6, spacing: 15 },
      },
    },
  })

  return (

    <div ref={sliderRef} className="keen-slider">
      {/* Each item must have the "keen-slider__slide" class */}
      {movies && movies.length > 0 && movies.map((result) => (
        <MovieCard keenClass="keen-slider__slide" key={result.id} movie={result} />
      ))}

    </div>
  )
}
