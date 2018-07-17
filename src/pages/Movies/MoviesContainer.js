import { connect } from 'react-redux';
import { discoverMovies, getMovie, getConfiguration } from 'actions';
import Movies from './Movies';

const mapDispatchToProps = {
  getConfiguration: () => getConfiguration(),
  discoverMovies: (filters, append) => discoverMovies(filters, append),
  getMovie: id => getMovie(id),
};

const mapStateToProps = state => ({
  configuration: state.movies.configuration,
  movies: state.movies.items,
  pageCount: state.movies.pageCount,
  movieDetails: state.movies.details,
});

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
