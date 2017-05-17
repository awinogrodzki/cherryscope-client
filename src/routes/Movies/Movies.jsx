import React from 'react';
import MovieSearch from 'components/MovieSearch';
import MovieList from 'components/MovieList';

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGenres: [],
    };
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <div>
        <MovieSearch onChange={data => this.setState({ selectedGenres: data.genre })} />
        <MovieList genres={this.state.selectedGenres} />
      </div>
    );
  }
}

export default Movies;
