import React from 'react';
import { t } from 'services/translate';
import styles from './Footer.css';

const Footer = () => (
  <div className={styles.container}>
    <span className={styles.info}>
      {t('footer.infoPrefix')}&nbsp;
      <a rel="noopener noreferrer" target="_blank" href="https://www.themoviedb.org/">The Movie DB</a>.
      &nbsp;{t('footer.infoSuffix')}
    </span>
    <br />
    <span className={styles.copyright}>
      © {(new Date()).getFullYear()}&nbsp;
      <a rel="noopener noreferrer" target="_blank" href="https://github.com/awinogrodzki">
        Amadeusz Winogrodzki
      </a>
    </span>
  </div>
);

export default Footer;
