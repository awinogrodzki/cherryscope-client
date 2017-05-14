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

  render() {
    return (
      <div>
        <MovieSearch onChange={genres => this.setState({ selectedGenres: genres })} />
        <MovieList genres={this.state.selectedGenres} />
      </div>
    );
  }
}

export default Movies;
