import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGenres } from 'actions';
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
      genres={this.props.genres}
      onChange={values => this.props.onChange(values)}
      isLoading={this.state.isLoading}
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
