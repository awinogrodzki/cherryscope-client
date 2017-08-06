import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { t } from 'services/translate';
import { Observable } from 'services/observable';
import languages from 'services/languages';
import MovieSort from 'components/MovieSort';
import MovieOptions from 'components/MovieOptions';
import Select from 'components/Select';
import { movieType } from 'components/Movie';
import Person, { personType } from './Person';
import Company, { companyType } from './Company';
import styles from './MovieSearch.css';
import validDateStrings from './validDateStrings';

class MovieSearch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      query: null,
      selected: [],
      sortBy: null,
      inputLoading: false,
      genresLoading: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSortChange = this.onSortChange.bind(this);

    this.registerObservables();
  }

  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    this.setState({ genresLoading: true });
    this.props.getGenres()
      .then(() => this.setState({ genresLoading: false }))
      .catch(() => this.setState({ genresLoading: false }));
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
      this.getMoviesOptionGroup(),
      this.getGenreOptionGroup(),
      this.getLanguageOptionGroup(),
      this.getPeopleOptionGroup(),
      this.getCompaniesOptionGroup(),
      this.getKeywordOptionGroup(),
    ].filter(item => !!item);
  }

  getMoviesOptionGroup() {
    if (!this.props.movies.length) {
      return null;
    }

    return {
      id: 'movies',
      customComponent: (
        <MovieOptions
          movies={this.props.movies}
          onMovieClick={this.props.onMovieClick}
        />
      ),
    };
  }

  getSortOptionGroup() {
    return {
      id: 'sort',
      label: t('movies.sortBy'),
      customComponent: (
        <MovieSort
          value={this.state.sortBy}
          onChange={this.onSortChange}
        />
      ),
    };
  }

  getLanguageOptionGroup() {
    return {
      id: 'language',
      label: t('movies.language'),
      isUnique: true,
      options: this.getLanguageOptions(),
    };
  }

  getLanguageOptions() {
    if (!this.state.query) {
      return [];
    }
    const languagesArray = languages.getLike(this.state.query);

    if (!languagesArray || !languagesArray.length) {
      return [];
    }

    return languagesArray.map(language => ({
      value: language.code,
      label: `${language.name} (${language.nativeName})`,
      type: 'language',
    }));
  }

  getPeopleOptionGroup() {
    return {
      id: 'people',
      label: t('movies.people'),
      options: this.getPeopleOptions(),
    };
  }

  getPeopleOptions() {
    if (!this.props.people || !this.props.people.length) {
      return [];
    }

    const limit = 5;

    return this.props.people.map(person => ({
      value: person.id,
      label: person.name,
      type: 'person',
      customComponent: <Person
        name={person.name}
        imageUrl={person.avatarUrl}
        tags={person.knownFor && person.knownFor.map(item => ({ label: item.originalTitle }))}
      />,
    }))
    .filter((option, index) => index < limit);
  }

  getCompaniesOptionGroup() {
    return {
      id: 'companies',
      label: t('movies.companies'),
      options: this.getCompaniesOptions(),
    };
  }

  getCompaniesOptions() {
    if (!this.props.companies || !this.props.companies.length) {
      return [];
    }

    const limit = 5;

    return this.props.companies.map(company => ({
      value: company.id,
      label: company.name,
      type: 'company',
      customComponent: <Company
        name={company.name}
        imageUrl={company.logoUrl}
      />,
    }))
    .filter((option, index) => index < limit);
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
      this.props.clearCompanies();
      this.props.clearKeywords();
      this.props.clearPeople();
      this.props.clearMovies();
      this.props.onChange(this.getValues());
    });
  }

  onInputChange(value) {
    const onInputChangeDebouncedHandler = this.inputChangeObservable.getHandler();
    this.setState({ query: value });

    if (!value) {
      this.props.clearCompanies();
      this.props.clearKeywords();
      this.props.clearPeople();
      this.props.clearMovies();

      return;
    }

    this.setState({
      inputLoading: true,
    });
    onInputChangeDebouncedHandler(value);
  }

  onInputChangeDebounced(value) {
    Promise.all([
      this.props.searchCompanies(value),
      this.props.searchPeople(value),
      this.props.searchKeywords(value),
      this.props.searchMovies(value),
    ])
      .then(() => this.setState({ inputLoading: false }))
      .catch(() => this.setState({ inputLoading: false }));
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
    if (typeof value !== 'string' || value.length < 4) {
      return false;
    }

    const date = moment(value, validDateStrings, true);

    return date.isValid();
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
      people: this.state.selected.filter(value => value.type === 'person'),
      companies: this.state.selected.filter(value => value.type === 'company'),
      language: this.state.selected.find(value => value.type === 'language'),
      sortBy: this.state.sortBy,
    };
  }

  getLabelClass(group) {
    return styles[`${group.id}Label`];
  }

  getValueClass(option) {
    return styles[`${option.type}Value`];
  }

  getOptionClass(isActive, group) {
    return classNames({
      [styles.isActive]: isActive,
      [styles.option]: true,
      [styles[`${group.id}Option`]]: true,
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <Select
          className={styles.select}
          values={this.state.selected}
          onChange={this.onChange}
          getLabelClass={this.getLabelClass}
          getValueClass={this.getValueClass}
          getOptionClass={this.getOptionClass}
          onInputChange={this.onInputChange}
          optionGroups={this.getOptionGroups()}
          isLoading={this.state.genresLoading || this.state.inputLoading}
          inputPlaceholder={t('movieSearch.inputLabel')}
          ignoreInputBlur={this.props.ignoreInputBlur}
          isExpanded={this.props.isExpanded}
          getInput={this.props.getInput}
        />
      </div>
    );
  }
}

MovieSearch.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
  people: PropTypes.arrayOf(personType),
  companies: PropTypes.arrayOf(companyType),
  movies: PropTypes.arrayOf(movieType),
  keywords: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
  onChange: PropTypes.func,
  getGenres: PropTypes.func,
  searchKeywords: PropTypes.func,
  clearKeywords: PropTypes.func,
  searchPeople: PropTypes.func,
  clearPeople: PropTypes.func,
  searchCompanies: PropTypes.func,
  clearCompanies: PropTypes.func,
  searchMovies: PropTypes.func,
  clearMovies: PropTypes.func,
  onMovieClick: PropTypes.func,
  ignoreInputBlur: PropTypes.bool,
  isExpanded: PropTypes.bool,
  getInput: PropTypes.func,
};

MovieSearch.defaultProps = {
  genres: [],
  people: [],
  companies: [],
  movies: [],
  keywords: [],
  onChange: () => {},
  getGenres: () => {},
  searchKeywords: () => {},
  clearKeywords: () => {},
  searchPeople: () => {},
  clearPeople: () => {},
  searchCompanies: () => {},
  clearCompanies: () => {},
  searchMovies: () => {},
  clearMovies: () => {},
  onMovieClick: () => {},
  ignoreInputBlur: false,
  isExpanded: false,
  getInput: () => {},
};

export default MovieSearch;
