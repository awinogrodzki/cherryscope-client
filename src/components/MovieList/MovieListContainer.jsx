import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { discoverMovies } from 'actions';
import MovieList from './MovieList';

class MovieListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.discoverMovies();
  }

  discoverMovies(filters = {}) {
    this.setState({ isLoading: true });

    this.props.discoverMovies(filters)
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false }));
  }

  getFilters() {
    return {
      with_genres: this.props.genres
        .map(genre => genre.value)
        .join(','),
    };
  }

  hasGenresChanged(nextProps) {
    return !isEqual(nextProps.genres, this.props.genres);
  }

  componentDidUpdate(prevProps) {
    if (this.hasGenresChanged(prevProps)) {
      this.discoverMovies(this.getFilters());
    }
  }

  render() {
    return MovieList({
      movies: this.props.items,
      isLoading: this.state.isLoading,
    });
  }
}

const mapDispatchToProps = {
  discoverMovies: filters => discoverMovies(filters),
};

const mapStateToProps = state => ({
  items: state.movies.items,
});

MovieListContainer.propTypes = {
  discoverMovies: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  genres: PropTypes.arrayOf(PropTypes.object),
};

MovieListContainer.defaultProps = {
  genres: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieListContainer);
