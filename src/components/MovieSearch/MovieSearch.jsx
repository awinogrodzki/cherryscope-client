import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Observable } from 'services/observable';
import styles from './MovieSearch.css';

class MovieSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: null,
    };

    this.registerObservables();
  }

  registerObservables() {
    this.onInputChangeObservable = new Observable(value => this.handleInputChange(value));
    this.onInputChangeObservable.debounce(500).distinctUntilChanged().register();
  }

  handleInputChange(value) {
    this.setState({
      searchString: value,
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <Select onInputChange={this.onInputChangeObservable.getHandler()} multiple />
      </div>
    );
  }
}

MovieSearch.propTypes = {
  onChange: PropTypes.func,
};

MovieSearch.defaultProps = {
  onChange: () => {},
};

export default MovieSearch;
