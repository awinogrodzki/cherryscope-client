import React from 'react';
import MovieSearch from 'components/MovieSearch';
import MovieList from 'components/MovieList';

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
    };
  }

  render() {
    return (
      <div>
        <MovieSearch onChange={({ genres }) => this.setState({ genres })} />
        <MovieList />
      </div>
    );
  }
}

export default Movies;
