import React from 'react'
import styles from './Hero.module.scss'
import HeroSeach from './HeroSearch/HeroSearch'

export default function Hero() {
  return (
    <div className={styles.heroSection}>
      <div className={styles.heroTextContainer}>
        <h1 className={styles.heroTitle}>Welcome to MovieTracker</h1>
        <p className={styles.heroSubtitle}>
          Track the movies you&apos;ve watched and discover new favorites
          with ease. Your personal cinema journey starts here.
        </p>
      </div>
      <HeroSeach/>
    </div>
  )
}
