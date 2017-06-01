import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { discoverMovies } from 'actions';
import MovieSearch from 'components/MovieSearch';
import MovieList from 'components/MovieList';

class Movies extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      genres: [],
      sortBy: null,
      isLoading: false,
    };
  }

  discoverMovies(filters = {}) {
    this.setState({ isLoading: true });

    this.props.discoverMovies(filters)
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false }));
  }

  getFilters() {
    const filters = {
      with_genres: this.state.genres
        .map(genre => genre.value)
        .join(','),
      sort_by: this.state.sortBy,
    };

    this.state.dates.forEach((date) => {
      if (!date || !date.value || !date.date) {
        return;
      }

      filters[date.value] = date.date;
    });

    return filters;
  }

  onMovieSearchChange(data) {
    this.setState({
      dates: data.dates,
      genres: data.genres,
      sortBy: data.sortBy,
    }, () => {
      this.discoverMovies(this.getFilters());
    });
  }

  render() {
    return (
      <div>
        <MovieSearch
          onChange={data => this.onMovieSearchChange(data)}
        />
        <MovieList
          movies={this.props.movies}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  discoverMovies: filters => discoverMovies(filters),
};

const mapStateToProps = state => ({
  movies: state.movies.items,
});

Movies.propTypes = {
  discoverMovies: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
