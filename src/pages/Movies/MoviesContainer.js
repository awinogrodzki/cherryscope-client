import { connect } from 'react-redux';
import { discoverMovies, getMovie } from 'actions';
import Movies from './Movies';

const mapDispatchToProps = {
  discoverMovies: (filters, append) => discoverMovies(filters, append),
  getMovie: id => getMovie(id),
};

const mapStateToProps = state => ({
  movies: state.movies.items,
  pageCount: state.movies.pageCount,
  movieDetails: state.movies.details,
});

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
