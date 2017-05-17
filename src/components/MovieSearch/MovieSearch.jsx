import React from 'react';
import PropTypes from 'prop-types';
import Select from 'components/Select';
import { t } from 'services/translate';
import styles from './MovieSearch.css';

class MovieSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  getOptionGroups() {
    return [
      {
        label: t('movies.genres'),
        options: this.props.genres.map(item => ({ value: item.id, label: item.name, type: 'genre' })),
      },
    ];
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
          value={this.state.value}
          onChange={value => this.onChange(value)}
          optionGroups={this.getOptionGroups()}
          groupBy={'type'}
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
