import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.css';

const Header = () => (
  <div className={styles.container}>
    <Link to="/"><h1 className={styles.title}>cherryscope</h1></Link>
  </div>
);

export default Header;
