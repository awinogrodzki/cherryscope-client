import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGenres, searchKeywords, clearKeywords } from 'actions';
import MovieSearch from './MovieSearch';

class MovieSearchContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    this.setState({ isLoading: true });
    this.props.getGenres()
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false }));
  }

  render() {
    return (<MovieSearch
      searchKeywords={this.props.searchKeywords}
      clearKeywords={this.props.clearKeywords}
      genres={this.props.genres}
      keywords={this.props.keywords}
      onChange={values => this.props.onChange(values)}
      isLoading={this.state.isLoading}
    />);
  }
}

const mapDispatchToProps = {
  searchKeywords: value => searchKeywords(value),
  getGenres: () => getGenres(),
  clearKeywords: () => clearKeywords(),
};

const mapStateToProps = state => ({
  genres: state.movies.genres,
  keywords: state.movies.keywords,
});

MovieSearchContainer.propTypes = {
  onChange: PropTypes.func,
  getGenres: PropTypes.func.isRequired,
  searchKeywords: PropTypes.func.isRequired,
  clearKeywords: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.object),
};

MovieSearchContainer.defaultProps = {
  onChange: () => {},
  genres: [],
  keywords: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchContainer);
