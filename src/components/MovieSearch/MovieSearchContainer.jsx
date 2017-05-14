import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGenres } from 'actions';
import MovieSearch from './MovieSearch';

class MovieSearchContainer extends React.Component {
  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    this.props.getGenres();
  }

  render() {
    return (<MovieSearch
      genres={this.props.genres}
      onChange={value => this.props.onChange(value)}
    />);
  }
}

const mapDispatchToProps = {
  getGenres: () => getGenres(),
};

const mapStateToProps = state => ({
  genres: state.movies.genres,
});

MovieSearchContainer.propTypes = {
  onChange: PropTypes.func,
  getGenres: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.object),
};

MovieSearchContainer.defaultProps = {
  onChange: () => {},
  genres: [],
};


export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchContainer);
