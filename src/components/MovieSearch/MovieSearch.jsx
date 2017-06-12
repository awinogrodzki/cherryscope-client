import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'services/translate';
import { Observable } from 'services/observable';
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
      isLoading: false,
    };

    this.registerObservables();
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

  registerObservables() {
    this.inputChangeObservable = new Observable(value => this.onInputChangeDebounced(value))
      .debounce(500)
      .register();
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
      this.getKeywordOptionGroup(),
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

  getKeywordOptionGroup() {
    return {
      id: 'keywords',
      label: t('movies.keywords'),
      options: this.props.keywords.map(item => ({ value: item.id, label: item.name, type: 'keyword' })),
    };
  }

  onChange(values) {
    this.setState({
      selected: values,
      query: null,
    }, () => {
      this.props.clearKeywords();
      this.props.onChange(this.getValues());
    });
  }

  onInputChange(value) {
    const onInputChangeDebouncedHandler = this.inputChangeObservable.getHandler();

    this.setState({ query: value });
    onInputChangeDebouncedHandler(value);
  }

  onInputChangeDebounced(value) {
    if (!value) {
      return this.props.clearKeywords();
    }

    return this.props.searchKeywords(value);
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
        label: `${t('movies.date.primaryReleaseDate.lte')} ${this.state.query}`,
        type: 'date',
        date: new Date(this.state.query),
      },
      ...this.getPrimaryReleaseYearOption(),
      {
        value: 'primary_release_date.gte',
        label: `${t('movies.date.primaryReleaseDate.gte')} ${this.state.query}`,
        type: 'date',
        date: new Date(this.state.query),
      },
    ];
  }

  getVoteOptionsFromQuery() {
    if (
      !this.state.query
      || !this.isNumber(this.state.query)
      || this.state.query < 0
    ) {
      return null;
    }

    return [
      {
        value: 'vote_count.gte',
        label: `${t('movies.vote.count.gte')} ${this.state.query}`,
        type: 'vote',
        data: this.state.query,
      },
      {
        value: 'vote_count.lte',
        label: `${t('movies.vote.count.lte')} ${this.state.query}`,
        type: 'vote',
        data: this.state.query,
      },
      ...this.getVoteAverageOptions(),
    ];
  }

  getVoteAverageOptions() {
    if (
      !this.state.query
      || !this.isNumber(this.state.query)
      || this.state.query < 0
      || this.state.query > 10
    ) {
      return [];
    }

    return [
      {
        value: 'vote_average.gte',
        label: `${t('movies.vote.average.gte')} ${this.state.query}`,
        type: 'vote',
        data: this.state.query,
      },
      {
        value: 'vote_average.lte',
        label: `${t('movies.vote.average.lte')} ${this.state.query}`,
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
        label: `${t('movies.date.primaryReleaseYear')} ${this.state.query}`,
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
      keywords: this.state.selected.filter(value => value.type === 'keyword'),
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
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}

MovieSearch.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  getGenres: PropTypes.func,
  searchKeywords: PropTypes.func,
  clearKeywords: PropTypes.func,
};

MovieSearch.defaultProps = {
  genres: [],
  keywords: [],
  onChange: () => {},
  getGenres: () => {},
  searchKeywords: () => {},
  clearKeywords: () => {},
};

export default MovieSearch;
