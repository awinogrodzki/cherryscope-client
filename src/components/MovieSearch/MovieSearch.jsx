import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { t } from 'services/translate';
import { Observable } from 'services/observable';
import languages from 'services/languages';
import movieService from 'services/movie';
import MovieSort from 'components/MovieSort';
import Select from 'components/Select';
import Person from './Person';
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
      this.getCompaniesOptionGroup(),
      this.getPeopleOptionGroup(),
      this.getDateOptionGroup(),
      this.getVoteOptionGroup(),
      this.getLanguageOptionGroup(),
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
        image={movieService.getImageUrl(person.profile_path, 160)}
        tags={person.known_for && person.known_for.map(item => ({ label: item.original_title }))}
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
      this.props.clearCompanies();
      this.props.clearKeywords();
      this.props.clearPeople();
      return;
    }

    this.props.searchCompanies(value);
    this.props.searchPeople(value);
    this.props.searchKeywords(value);
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

    const date = moment(value, [
      'MMMM-DD-YYYY',
      'YYYY-MM-DD',
      'MMMM DD YYYY',
      'MMMM Do YYYY',
      'YYYY-DD-MM',
      'DD MMMM YYYY',
      'Do MMMM YYYY',
      'MMMM DD YYYY',
      'MMMM Do YYYY',
    ]);

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
  people: PropTypes.arrayOf(PropTypes.object),
  companies: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  getGenres: PropTypes.func,
  searchKeywords: PropTypes.func,
  clearKeywords: PropTypes.func,
  searchPeople: PropTypes.func,
  clearPeople: PropTypes.func,
  searchCompanies: PropTypes.func,
  clearCompanies: PropTypes.func,
};

MovieSearch.defaultProps = {
  genres: [],
  people: [],
  companies: [],
  keywords: [],
  onChange: () => {},
  getGenres: () => {},
  searchKeywords: () => {},
  clearKeywords: () => {},
  searchPeople: () => {},
  clearPeople: () => {},
  searchCompanies: () => {},
  clearCompanies: () => {},
};

export default MovieSearch;
