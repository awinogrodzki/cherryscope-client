import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publish';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/distinctUntilChanged';
import 'react-select/dist/react-select.css';
import styles from './MovieSearch.css';

class MovieSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: null,
    };

    this.registerObservables();
  }

  setOnInputChangeObserver(observer) {
    this.onInputChangeObserver = observer;
  }

  registerObservables() {
    const source = Observable
      .create(observer => this.setOnInputChangeObserver(observer))
      .debounce(() => Observable.interval(500))
      .distinctUntilChanged();

    const published = source.publish();
    published.subscribe(this.handleInputChange);
    published.connect();
  }

  handleInputChange(value) {
    this.setState({
      searchString: value,
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <Select onInputChange={value => this.onInputChangeObserver.next(value)} multiple />
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
