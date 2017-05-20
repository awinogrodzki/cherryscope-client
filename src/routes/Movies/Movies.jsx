import React from 'react';
import MovieSearch from 'components/MovieSearch';
import MovieList from 'components/MovieList';

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      sortBy: null,
    };
  }

  render() {
    return (
      <div>
        <MovieSearch
          onChange={data => this.setState({
            genres: data.genres.filter(value => value.type === 'genre'),
            sortBy: data.sortBy,
          })}
        />
        <MovieList genres={this.state.genres} sortBy={this.state.sortBy} />
      </div>
    );
  }
}

export default Movies;
