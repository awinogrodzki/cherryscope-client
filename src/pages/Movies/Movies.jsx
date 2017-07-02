import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { discoverMovies } from 'actions';
import { t } from 'services/translate';
import modalService from 'services/modal';
import MovieSearch from 'components/MovieSearch';
import MovieList from 'components/MovieList';
import MovieDetails from 'components/MovieDetails';
import LoadMore from 'components/LoadMore';
import styles from './Movies.css';

class Movies extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filters: {},
      dates: [],
      genres: [],
      keywords: [],
      votes: [],
      sortBy: null,
      isLoading: false,
      page: 1,
      movieModal: null,
    };
  }

  componentDidMount() {
    this.discoverMovies();
  }

  discoverMovies(filters = {}, append = false) {
    this.setState({ isLoading: true });

    this.props.discoverMovies(filters, append)
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false }));
  }

  mapFilters() {
    const filters = this.state.filters;

    const mappedFilters = {
      ...this.mapCompanies(filters.companies),
      ...this.mapPeople(filters.people),
      ...this.mapKeywords(filters.keywords),
      ...this.mapGenres(filters.genres),
      sort_by: filters.sortBy,
      with_original_language: filters.language && filters.language.value || '',
      page: this.state.page,
    };

    filters.dates && filters.dates.forEach((date) => {
      if (!date || !date.value || !date.date) {
        return;
      }

      mappedFilters[date.value] = date.date;
    });

    filters.votes && filters.votes.forEach((vote) => {
      if (!vote || !vote.value || !vote.data) {
        return;
      }

      mappedFilters[vote.value] = vote.data;
    });

    return mappedFilters;
  }

  mapCompanies(companies) {
    if (!companies) {
      return {};
    }

    return {
      with_companies: companies
        .map(company => company.value)
        .join(','),
    };
  }

  mapPeople(people) {
    if (!people) {
      return {};
    }

    return {
      with_people: people
        .map(person => person.value)
        .join(','),
    };
  }

  mapKeywords(keywords) {
    if (!keywords) {
      return {};
    }

    return {
      with_keywords: keywords
        .map(keyword => keyword.value)
        .join(','),
    };
  }

  mapGenres(genres) {
    if (!genres) {
      return {};
    }

    return {
      with_genres: genres
        .map(genre => genre.value)
        .join(','),
    };
  }

  onMovieSearchChange(filters) {
    this.setState({ filters, page: 1 }, () => this.discoverMovies(this.mapFilters()));
  }

  onLoadMoreChange(page) {
    this.setState({ page }, () => this.discoverMovies(this.mapFilters(), true));
  }

  selectMovie(id) {
    if (this.state.movieModal) {
      modalService.removeModal(this.state.movieModal);
    }

    const movieModal = modalService.createModal(() => (
      <MovieDetails id={id} />
    ));

    this.setState({
      movieModal,
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <MovieSearch
          onChange={data => this.onMovieSearchChange(data)}
        />
        <MovieList
          movies={this.props.movies}
          isLoading={this.state.isLoading}
          onMovieSelect={(id, element) => this.selectMovie(id, element)}
        />
        {
          this.state.page < this.props.pageCount
          && <LoadMore
            label={t('movies.loadMore')}
            page={this.state.page}
            onChange={page => this.onLoadMoreChange(page)}
          />
        }
      </div>
    );
  }
}

const mapDispatchToProps = {
  discoverMovies: (filters, append) => discoverMovies(filters, append),
};

const mapStateToProps = state => ({
  movies: state.movies.items,
  pageCount: state.movies.pageCount,
});

Movies.propTypes = {
  discoverMovies: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageCount: PropTypes.number,
};

Movies.defaultProps = {
  pageCount: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
