import React from 'react';
import styles from './Hero.module.css';
import heroBackground from '../../assets/hero-background.jpg';

const Hero = () => {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Your Partner in making Clean and Hygiene environment
        </h1>
        <button className={styles.loginButton}>login</button>
      </div>
    </section>
  );
};

export default Hero;