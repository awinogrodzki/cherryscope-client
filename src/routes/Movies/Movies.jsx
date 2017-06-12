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
      keywords: [],
      votes: [],
      sortBy: null,
      isLoading: false,
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

  mapFilters(filters) {
    const mappedFilters = {
      with_people: filters.people
        .map(person => person.value)
        .join(','),
      with_keywords: filters.keywords
        .map(keyword => keyword.value)
        .join(','),
      with_genres: filters.genres
        .map(genre => genre.value)
        .join(','),
      sort_by: filters.sortBy,
      with_original_language: filters.language && filters.language.value || '',
    };

    filters.dates.forEach((date) => {
      if (!date || !date.value || !date.date) {
        return;
      }

      mappedFilters[date.value] = date.date;
    });

    filters.votes.forEach((vote) => {
      if (!vote || !vote.value || !vote.data) {
        return;
      }

      mappedFilters[vote.value] = vote.data;
    });

    return mappedFilters;
  }

  onMovieSearchChange(filters) {
    this.discoverMovies(this.mapFilters(filters));
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
