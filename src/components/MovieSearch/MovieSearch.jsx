import React from 'react';
import PropTypes from 'prop-types';
import Select from 'components/Select';
import styles from './MovieSearch.css';
import GenreOptionGroup from './GenreOptionGroup';
import { genrePropTypes } from './types';

const mapGenresToOptions = genres => genres.map(({ id, name }) => ({ label: name, value: id, type: 'genre' }));

class MovieSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOptions: [],
    };

    this.onSelectChange = this.onSelectChange.bind(this);
  }

  onSelectChange(selectedOptions) {
    this.setState({
      selectedOptions,
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <Select
          selectedOptions={this.state.selectedOptions}
          isExpanded={this.props.isExpanded}
          onChange={this.onSelectChange}
        >
          <GenreOptionGroup
            options={mapGenresToOptions(this.props.genres)}
          />
        </Select>
      </div>
    );
  }
}

MovieSearch.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.shape(genrePropTypes)),
  isExpanded: PropTypes.bool,
  onChange: PropTypes.func,
};

MovieSearch.defaultProps = {
  genres: [],
  isExpanded: false,
  onChange: () => {},
};

export default MovieSearch;
