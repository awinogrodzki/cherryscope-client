import React from 'react';
import PropTypes from 'prop-types';
import movieService from 'services/movie';
import MovieDetails from './MovieDetails';

class MovieDetailsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      overview: null,
      imdbId: null,
    };
  }

  componentDidMount() {
    movieService.getMovie(this.props.id)
      .then(response => this.setState({
        isLoading: false,
        overview: response.overview,
        imdbId: response.imdb_id,
      }))
      .catch(() => this.setState({
        isLoading: false,
      }));
  }

  render() {
    return (
      <MovieDetails
        isLoading={this.state.isLoading}
        overview={this.state.overview}
        imdbUrl={this.state.imdbId && `http://www.imdb.com/title/${this.state.imdbId}`}
      />
    );
  }
}

MovieDetailsContainer.propTypes = {
  id: PropTypes.number.isRequired,
};

export default MovieDetailsContainer;
