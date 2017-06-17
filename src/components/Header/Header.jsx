import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.css';

const Header = () => (
  <div className={styles.container}>
    <h1 className={styles.title}><Link to="/">cherryscope</Link></h1>
  </div>
);

export default Header;
