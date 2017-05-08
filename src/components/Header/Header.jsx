import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.css';

const Header = () => (
  <div className={styles.container}>
    <h1>Header</h1>
    <Link to="/">Home</Link>
    {' '}
    <Link to="/about">About</Link>
  </div>
);

export default Header;
