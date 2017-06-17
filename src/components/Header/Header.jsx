import React from 'react';
import { Link } from 'react-router-dom';
import CherryscopeLogo from 'resources/images/cherryscope_logo.svg';
import styles from './Header.css';

const Header = () => (
  <div className={styles.container}>
    <div className={styles.logoContainer}>
      <Link to="/">
        <CherryscopeLogo className={styles.logo} />
      </Link>
    </div>
  </div>
);

export default Header;
