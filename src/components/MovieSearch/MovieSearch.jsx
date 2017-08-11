import React from 'react';
import PropTypes from 'prop-types';
import styles from './MovieSearch.css';

class MovieSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
    };
  }

  render() {
    return (
      <div className={styles.container} />
    );
  }
}

MovieSearch.propTypes = {
  onChange: PropTypes.func,
};

MovieSearch.defaultProps = {
  onChange: () => {},
};

export default MovieSearch;
