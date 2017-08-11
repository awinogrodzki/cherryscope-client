import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { t } from 'services/translate';
import { Observable } from 'services/observable';
import Select from 'components/Select';
import styles from './MovieSearch.css';

class MovieSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.registerObservables();
  }

  componentDidMount() {
  }

  registerObservables() {
    this.inputChangeObservable = new Observable(value => this.onInputChangeDebounced(value))
      .debounce(500)
      .register();
  }

  onChange(values) {
    this.setState({
      selected: values,
    }, () => {
      this.resetSearch();
      this.props.onChange(this.getValues());
    });
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

  resetSearch() {
    const onInputChangeDebouncedHandler = this.inputChangeObservable.getHandler();
    onInputChangeDebouncedHandler(null);
  }

  onInputChange(value) {
    const onInputChangeDebouncedHandler = this.inputChangeObservable.getHandler();
    onInputChangeDebouncedHandler(value);

    if (!value) {
      this.resetSearch();
    }
  }

  onInputChangeDebounced() {
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
          optionGroups={[]}
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
  onChange: PropTypes.func,
  onMovieClick: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  ignoreInputBlur: PropTypes.bool,
  isExpanded: PropTypes.bool,
  getInput: PropTypes.func,
};

MovieSearch.defaultProps = {
  onChange: () => {},
  onMovieClick: () => {},
  ignoreInputBlur: false,
  isExpanded: false,
  getInput: () => {},
};

export default MovieSearch;
