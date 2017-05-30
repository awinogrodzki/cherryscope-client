import React from 'react';
import PropTypes from 'prop-types';
import Select from 'components/Select';
import MovieSort from 'components/MovieSort';
import { t } from 'services/translate';
import styles from './MovieSearch.css';

class MovieSearch extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      sortBy: null,
    };
  }

  onSortChange(value) {
    this.setState({
      sortBy: value,
    }, () => {
      this.props.onChange(this.getValues());
    });
  }

  getOptionGroups() {
    return [
      {
        label: t('movies.sortBy'),
        customComponent: (
          <MovieSort
            value={this.state.sortBy}
            onChange={value => this.onSortChange(value)}
          />
        ),
      },
      {
        label: t('movies.genres'),
        options: this.props.genres.map(item => ({ value: item.id, label: item.name, type: 'genre' })),
      },
    ];
  }

  onChange(values) {
    this.setState({
      selected: values,
    }, () => {
      this.props.onChange(this.getValues());
    });
  }

  getValues() {
    return {
      genres: this.state.selected,
      sortBy: this.state.sortBy,
    };
  }

  renderValue(options) {
    return <span className={styles[`${options.type}Value`]}>{options.label}</span>;
  }

  render() {
    return (
      <div className={styles.container}>
        <Select
          values={this.state.selected}
          onChange={values => this.onChange(values)}
          getValueClass={option => styles[`${option.type}Value`]}
          optionGroups={this.getOptionGroups()}
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
