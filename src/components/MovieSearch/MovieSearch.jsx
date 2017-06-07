import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'services/translate';
import MovieSort from 'components/MovieSort';
import Select from 'components/Select';
import styles from './MovieSearch.css';

class MovieSearch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      query: null,
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
        label: t('movies.dates'),
        filterByInput: false,
        isUnique: true,
        options: this.getDateOptionsFromQuery(),
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
      query: null,
    }, () => {
      this.props.onChange(this.getValues());
    });
  }

  onInputChange(value) {
    this.setState({ query: value });
  }

  getDateOptionsFromQuery() {
    if (!this.state.query || !this.isDate(this.state.query)) {
      return null;
    }

    return [
      {
        value: 'primary_release_date.lte',
        label: `${t('movies.date.primary_release_date.lte')} ${this.state.query}`,
        type: 'date',
        date: new Date(this.state.query),
      },
      ...[(this.isYear(this.state.query) ? {
        value: 'primary_release_year',
        label: `${t('movies.date.primary_release_year')} ${this.state.query}`,
        type: 'date',
        date: new Date(this.state.query).getFullYear(),
      } : false)].filter(value => value !== false),
      {
        value: 'primary_release_date.gte',
        label: `${t('movies.date.primary_release_date.gte')} ${this.state.query}`,
        type: 'date',
        date: new Date(this.state.query),
      },
    ];
  }

  isDate(value) {
    const date = new Date(value);
    return !isNaN(date.valueOf());
  }

  isYear(value) {
    const date = new Date(value);

    return value === String(date.getFullYear());
  }

  getValues() {
    return {
      dates: this.state.selected.filter(value => value.type === 'date'),
      genres: this.state.selected.filter(value => value.type === 'genre'),
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
          onInputChange={value => this.onInputChange(value)}
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
