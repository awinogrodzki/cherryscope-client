import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import movieService from 'services/movie';
import Movie from 'components/Movie';
import Loader from 'components/Loader';
import styles from './MovieList.css';
import { movieType } from './types';

class MovieList extends React.Component {
  renderMovies() {
    return this.props.movies.map(item => (
      <Movie
        className={styles.movie}
        isLoading={item.id === this.props.loadingMovieId}
        key={item.id}
        title={item.title}
        originalTitle={item.original_title}
        imageUrl={movieService.getImageUrl(item.poster_path)}
        voteAverage={item.vote_average}
        voteCount={item.vote_count}
        releaseDate={new Date(item.release_date)}
        onClick={element => this.props.onMovieSelect(item.id, element)}
      />
    ));
  }

  renderLoading() {
    if (!this.props.isLoading) {
      return null;
    }

    return (
      <div data-test="MovieList.isLoading" className={styles.loading}>
        <Loader className={styles.loader} />
      </div>
    );
  }

  render() {
    return (
      <div
        className={classNames({
          [styles.container]: true,
        })}
      >
        { this.renderLoading() }
        <div className={styles.wrapper}>
          { this.renderMovies() }
        </div>
      </div>
    );
  }
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(movieType),
  isLoading: PropTypes.bool,
  loadingMovieId: PropTypes.number,
  onMovieSelect: PropTypes.func,
};

MovieList.defaultProps = {
  movies: [],
  isLoading: false,
  loadingMovieId: null,
  onMovieSelect: () => {},
};

export default MovieList;
