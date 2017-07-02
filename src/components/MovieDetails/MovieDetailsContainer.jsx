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
    };
  }

  componentDidMount() {
    movieService.getMovie(this.props.id)
      .then(response => this.setState({
        isLoading: false,
        overview: response.overview,
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
      />
    );
  }
}

MovieDetailsContainer.propTypes = {
  id: PropTypes.number.isRequired,
};

export default MovieDetailsContainer;
