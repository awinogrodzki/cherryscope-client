import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { discoverMovies } from 'actions';
import MovieList from './MovieList';

class MovieListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      filters: {},
    };
  }

  componentDidMount() {
    this.discoverMovies();
  }

  discoverMovies() {
    this.setState({ isLoading: true });

    this.props.discoverMovies(this.state.filters)
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false }));
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
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieListContainer);
