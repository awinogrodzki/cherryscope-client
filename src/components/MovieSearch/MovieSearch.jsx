import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import styles from './MovieSearch.css';

class MovieSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }
  getOptions() {
    return this.props.genres.map(item => ({ value: item.id, label: item.name }));
  }

  onChange(value) {
    this.props.onChange(value);
    this.setState({
      selected: value,
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <Select
          value={this.state.selected}
          onChange={value => this.onChange(value)}
          options={this.getOptions()}
          multi
          joinValues
        />
      </div>
    );
  }
}

MovieSearch.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
};

MovieSearch.defaultProps = {
  genres: [],
  onChange: () => {},
};

export default MovieSearch;
