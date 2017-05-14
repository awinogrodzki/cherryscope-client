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
    return this.props.genres.map(item => ({ value: item.id, label: item.name, type: 'genre' }));
  }

  onChange(value) {
    this.props.onChange(value);
    this.setState({
      selected: value,
    });
  }

  renderValue(options) {
    return <span className={styles[`${options.type}Value`]}>{options.label}</span>;
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
          valueRenderer={options => this.renderValue(options)}
          isLoading={this.props.isLoading}
        />
      </div>
    );
  }
}

MovieSearch.propTypes = {
  isLoading: PropTypes.bool,
  genres: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
};

MovieSearch.defaultProps = {
  isLoading: true,
  genres: [],
  onChange: () => {},
};

export default MovieSearch;
