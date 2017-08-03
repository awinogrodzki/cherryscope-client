import React from 'react';
import TMDBLogo from './images/tmdb_logo.svg';
import styles from './Footer.css';

const Footer = () => (
  <div className={styles.container}>
    <span className={styles.copyright}>
      Copyright © {(new Date()).getFullYear()}&nbsp;
      <a rel="noopener noreferrer" target="_blank" href="https://github.com/awinogrodzki">
        Amadeusz Winogrodzki
      </a>
    </span>
    <a className={styles.tmdbLogo} rel="noopener noreferrer" target="_blank" href="https://www.themoviedb.org/">
      <TMDBLogo />
    </a>
  </div>
);

export default Footer;
