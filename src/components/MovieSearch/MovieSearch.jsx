import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publish';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/distinctUntilChanged';
import styles from './MovieSearch.css';
import 'react-select/dist/react-select.css';

class MovieSearch extends React.Component {
  constructor(props) {
    super(props);

    this.registerObservables();
  }

  registerObservables() {
    const source = Observable
      .create(observer => this.onInputChangeObserver = (e) => observer.next(e))
      .debounce(() => Observable.interval(500))
      .distinctUntilChanged();

    const published = source.publish();
    published.subscribe(this.handleInputChange);
    published.connect();
  }

  handleInputChange(e) {
    console.log(e);
  }

  render() {
    return (
      <div className={styles.container}>
        <Select onInputChange={this.onInputChangeObserver} multiple />
      </div>
    );
  }
}

MovieSearch.propTypes = {
  onChange: PropTypes.func,
};

export default MovieSearch;
