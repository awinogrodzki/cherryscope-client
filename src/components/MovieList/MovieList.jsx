import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import movieService from 'services/movie';
import Movie from 'components/Movie';
import styles from './MovieList.css';

class MovieList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expandedMovieId: null,
    };
  }

  renderMovies() {
    return this.props.movies.map(item => (
      <Movie
        className={classNames({
          [styles.movie]: true,
          [styles.isExpanded]: this.state.expandedMovieId === item.id,
        })}
        id={item.id}
        key={item.id}
        title={item.title}
        originalTitle={item.original_title}
        imageUrl={movieService.getImageUrl(item.poster_path)}
        voteAverage={item.vote_average}
        voteCount={item.vote_count}
        releaseDate={new Date(item.release_date)}
        onClick={() => {
          if (this.state.expandedMovieId !== item.id) {
            this.setState({ expandedMovieId: item.id });
          } else {
            this.setState({ expandedMovieId: null });
          }
        }}
        isExpanded={this.state.expandedMovieId === item.id}
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
      <div className={styles.container}>
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
};

MovieList.defaultProps = {
  movies: [],
  isLoading: false,
};

export default MovieList;
