/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

import getProperty from 'lodash/get';

const getConfig = () => {
  try {
    return require(`../../config/${process.env.NODE_ENV}.json`);
  } catch (error) {
    return null;
  }
};

const configData = getConfig();

export default {
  get(configName) {
    return getProperty(configData, configName);
  },
};
