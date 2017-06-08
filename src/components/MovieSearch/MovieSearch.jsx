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
      this.getSortOptionGroup(),
      this.getDateOptionGroup(),
      this.getVoteOptionGroup(),
      this.getGenreOptionGroup(),
    ];
  }

  getSortOptionGroup() {
    return {
      id: 'sort',
      label: t('movies.sortBy'),
      customComponent: (
        <MovieSort
          value={this.state.sortBy}
          onChange={value => this.onSortChange(value)}
        />
      ),
    };
  }

  getDateOptionGroup() {
    return {
      id: 'dates',
      label: t('movies.dates'),
      filterByInput: false,
      isUnique: true,
      options: this.getDateOptionsFromQuery(),
    };
  }

  getVoteOptionGroup() {
    return {
      id: 'votes',
      label: t('movies.votes'),
      filterByInput: false,
      isUnique: true,
      options: this.getVoteOptionsFromQuery(),
    };
  }

  getGenreOptionGroup() {
    return {
      id: 'genres',
      label: t('movies.genres'),
      options: this.props.genres.map(item => ({ value: item.id, label: item.name, type: 'genre' })),
    };
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
    if (
      !this.state.query
      || !this.isDate(this.state.query)
      || this.hasPrimaryReleaseYear(this.state.selected)) {
      return null;
    }

    return [
      {
        value: 'primary_release_date.lte',
        label: `${t('movies.date.primary_release_date.lte')} ${this.state.query}`,
        type: 'date',
        date: new Date(this.state.query),
      },
      ...this.getPrimaryReleaseYearOption(),
      {
        value: 'primary_release_date.gte',
        label: `${t('movies.date.primary_release_date.gte')} ${this.state.query}`,
        type: 'date',
        date: new Date(this.state.query),
      },
    ];
  }

  getVoteOptionsFromQuery() {
    if (
      !this.state.query
      || !this.isNumber(this.state.query)
    ) {
      return null;
    }

    return [
      {
        value: 'vote_count.gte',
        label: `${t('movies.vote.vote_count.gte')} ${this.state.query}`,
        type: 'vote',
        data: this.state.query,
      },
      {
        value: 'vote_count.lte',
        label: `${t('movies.vote.vote_count.lte')} ${this.state.query}`,
        type: 'vote',
        data: this.state.query,
      },
    ];
  }

  getPrimaryReleaseYearOption() {
    return [(
      this.isYear(this.state.query)
      && !this.hasPrimaryReleaseDate(this.state.selected) ?
      {
        value: 'primary_release_year',
        label: `${t('movies.date.primary_release_year')} ${this.state.query}`,
        type: 'date',
        date: new Date(this.state.query).getFullYear(),
      } : false
    )].filter(value => value !== false);
  }

  isDate(value) {
    const date = new Date(value);

    return !isNaN(date.valueOf())
      && String(value).length >= 4;
  }

  isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  hasPrimaryReleaseYear(options) {
    return !!options.filter(
      option => option.value === 'primary_release_year'
    ).length;
  }

  hasPrimaryReleaseDate(options) {
    return !!options.filter(
      option => (
        option.value
        && String(option.value)
        || ''
      ).indexOf('primary_release_date') >= 0
    ).length;
  }

  isYear(value) {
    const date = new Date(value);

    return value === String(date.getFullYear())
      && String(value).length >= 4;
  }

  getValues() {
    return {
      dates: this.state.selected.filter(value => value.type === 'date'),
      genres: this.state.selected.filter(value => value.type === 'genre'),
      votes: this.state.selected.filter(value => value.type === 'vote'),
      sortBy: this.state.sortBy,
    };
  }

  render() {
    return (
      <div className={styles.container}>
        <Select
          values={this.state.selected}
          onChange={values => this.onChange(values)}
          getLabelClass={group => styles[`${group.id}Label`]}
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
