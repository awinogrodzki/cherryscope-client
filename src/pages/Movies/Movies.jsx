import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'services/translate';
import modalService from 'services/modal';
import MovieSearch from 'components/MovieSearch';
import MovieList from 'components/MovieList';
import MovieDetails, { movieDetailsPropTypes } from 'components/MovieDetails';
import LoadMore from 'components/LoadMore';
import styles from './Movies.css';

class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.onLoadMoreChange = this.onLoadMoreChange.bind(this);
    this.selectMovie = this.selectMovie.bind(this);
    this.onMovieSearchChange = this.onMovieSearchChange.bind(this);

    this.state = {
      isListLoading: false,
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

  onMovieSearchChange(filters) {
    this.setState({ filters, page: 1 }, () => this.discoverMovies(this.mapFilters()));
  }

  mapFilters() {
    return {
      page: this.state.page,
    };
  }

  onLoadMoreChange(page) {
    this.setState({ page }, () => this.discoverMovies(this.mapFilters(), true));
  }

  setMovieSearchInput(input) {
    this.movieSearchInput = input;
  }

  selectMovie(id, element) {
    if (this.state.loadingMovieId !== null) {
      return;
    }

    this.setState({
      loadingMovieId: id,
    }, () => {
      this.openMovieModal(id, element)
        .then(() => this.setState({ loadingMovieId: null }))
        .catch(() => {
          this.setState({ loadingMovieId: null });
        });
    });
  }

  openMovieModal(id, element, onWillUnmountCallback) {
    return this.props.getMovie(id).then(() => {
      modalService.createModal(() => {
        const {
          originalTitle,
          title,
          overview,
          imdbId,
          image,
          genres,
          voteCount,
          voteAverage,
          directors,
          writers,
          cast,
          images,
          videos,
        } = this.props.movieDetails;

        return (
          <MovieDetails
            originalTitle={originalTitle}
            title={title}
            overview={overview}
            imdbUrl={imdbId && `http://www.imdb.com/title/${imdbId}`}
            image={image}
            genres={genres}
            voteCount={voteCount}
            voteAverage={voteAverage}
            directors={directors}
            writers={writers}
            cast={cast}
            images={images}
            videos={videos}
          />
        );
      }, {
        animateFromElement: element,
        onWillUnmount: onWillUnmountCallback,
      });
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <MovieSearch
          onChange={this.onMovieSearchChange}
        />
        <MovieList
          movies={this.props.movies}
          isLoading={this.state.isListLoading}
          loadingMovieId={this.state.loadingMovieId}
          onMovieSelect={this.selectMovie}
        />
        {
          this.state.page < this.props.pageCount
          && <LoadMore
            isLoading={this.state.isListLoading}
            label={t('movies.loadMore')}
            page={this.state.page}
            onChange={this.onLoadMoreChange}
          />
        }
      </div>
    );
  }
}

Movies.propTypes = {
  movieDetails: PropTypes.shape(movieDetailsPropTypes),
  discoverMovies: PropTypes.func,
  getMovie: PropTypes.func,
  movies: PropTypes.arrayOf(PropTypes.object),
  pageCount: PropTypes.number,
};

Movies.defaultProps = {
  movieDetails: {},
  discoverMovies: null,
  getMovie: null,
  movies: [],
  pageCount: 0,
};

export default Movies;
