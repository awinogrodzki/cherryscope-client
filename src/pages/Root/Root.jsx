import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { ModalStack } from 'components/Modal';
import styles from './Root.css';

const Root = ({ route }) => ( // eslint-disable-line react/prop-types
  <div className={styles.container}>
    <Header />
    {renderRoutes(route.routes)}
    <Footer />
    <ModalStack />
  </div>
);

export default Root;
