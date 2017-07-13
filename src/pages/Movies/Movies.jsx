import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { discoverMovies, getMovie } from 'actions';
import { t } from 'services/translate';
import modalService from 'services/modal';
import MovieSearch from 'components/MovieSearch';
import MovieList from 'components/MovieList';
import MovieDetails, { MovieDetailsPropTypes } from 'components/MovieDetails';
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
      isListLoading: false,
      isMovieLoading: false,
      loadingMovieId: null,
      page: 1,
    };
  }

  componentDidMount() {
    this.discoverMovies();
  }

  discoverMovies(filters = {}, append = false) {
    this.setState({ isListLoading: true });

    this.props.discoverMovies(filters, append)
      .then(() => this.setState({ isListLoading: false }))
      .catch(() => this.setState({ isListLoading: false }));
  }

  mapFilters() {
    const filters = this.state.filters;

    const mappedFilters = {
      ...this.mapCompanies(filters.companies),
      ...this.mapPeople(filters.people),
      ...this.mapKeywords(filters.keywords),
      ...this.mapGenres(filters.genres),
      ...this.mapDateFilters(filters.dates),
      ...this.mapVoteFilters(filters.votes),
      sort_by: filters.sortBy,
      with_original_language: filters.language && filters.language.value || '',
      page: this.state.page,
    };

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

  mapDateFilters(dates = []) {
    const mappedFilters = {};

    dates.forEach((date) => {
      if (!date || !date.value || !date.date) {
        return;
      }

      mappedFilters[date.value] = date.date;
    });

    return mappedFilters;
  }

  mapVoteFilters(votes = []) {
    const mappedFilters = {};

    votes.forEach((vote) => {
      if (!vote || !vote.value || !vote.data) {
        return;
      }

      mappedFilters[vote.value] = vote.data;
    });

    return mappedFilters;
  }

  onMovieSearchChange(filters) {
    this.setState({ filters, page: 1 }, () => this.discoverMovies(this.mapFilters()));
  }

  onLoadMoreChange(page) {
    this.setState({ page }, () => this.discoverMovies(this.mapFilters(), true));
  }

  selectMovie(id, element) {
    if (this.state.isMovieLoading) {
      return;
    }

    this.setState({ isMovieLoading: true, loadingMovieId: id }, () => {
      this.props.getMovie(id).then(() => {
        modalService.createModal(() => {
          const {
            originalTitle,
            title,
            overview,
            imdbId,
            image,
            genres,
          } = this.props.movieDetails;

          return (
            <MovieDetails
              originalTitle={originalTitle}
              title={title}
              overview={overview}
              imdbUrl={imdbId && `http://www.imdb.com/title/${imdbId}`}
              image={image}
              genres={genres}
            />
          );
        }, {
          animateFromElement: element,
        });

        this.setState({ isMovieLoading: false, loadingMovieId: null });
      })
      .catch(() => this.setState({ isMovieLoading: false, loadingMovieId: null }));
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
          isLoading={this.state.isListLoading}
          loadingMovieId={this.state.loadingMovieId}
          onMovieSelect={(id, element) => this.selectMovie(id, element)}
        />
        {
          this.state.page < this.props.pageCount
          && <LoadMore
            isLoading={this.state.isListLoading}
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
  getMovie: id => getMovie(id),
};

const mapStateToProps = state => ({
  movies: state.movies.items,
  pageCount: state.movies.pageCount,
  movieDetails: state.movies.movieDetails,
});

Movies.propTypes = {
  movieDetails: PropTypes.shape(MovieDetailsPropTypes).isRequired,
  discoverMovies: PropTypes.func.isRequired,
  getMovie: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageCount: PropTypes.number,
};

Movies.defaultProps = {
  pageCount: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
