import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from 'components/Header';

const Root = ({ route }) => ( // eslint-disable-line react/prop-types
  <div>
    <Header />
    {renderRoutes(route.routes)}
  </div>
);

export default Root;
