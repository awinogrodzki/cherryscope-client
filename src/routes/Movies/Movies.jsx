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

  componentDidUpdate() {

  }

  render() {
    return (
      <div>
        <MovieSearch onChange={data => this.setState({ genres: data.filter(value => value.type === 'genre') })} />
        <MovieList genres={this.state.genres} />
      </div>
    );
  }
}

export default Movies;
