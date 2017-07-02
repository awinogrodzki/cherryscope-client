import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import movieService from 'services/movie';
import Movie from 'components/Movie';
import styles from './MovieList.css';

class MovieList extends React.Component {
  renderMovies() {
    return this.props.movies.map(item => (
      <Movie
        className={styles.movie}
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
      <div className={styles.loading}>
        Loading...
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
  movies: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  onMovieSelect: PropTypes.func,
};

MovieList.defaultProps = {
  movies: [],
  isLoading: false,
  onMovieSelect: () => {},
};

export default MovieList;
