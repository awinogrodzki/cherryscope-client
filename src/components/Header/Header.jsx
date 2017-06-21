import React from 'react';
import { Link } from 'react-router-dom';
import CherryscopeLogo from 'resources/images/cherryscope_logo.svg';
import { t } from 'services/translate';
import styles from './Header.css';

const Header = () => (
  <div className={styles.container}>
    <div className={styles.logoContainer}>
      <Link to="/">
        <CherryscopeLogo className={styles.logo} />
      </Link>
      <span className={styles.headline}>{t('header.headline')}</span>
    </div>
  </div>
);

export default Header;
