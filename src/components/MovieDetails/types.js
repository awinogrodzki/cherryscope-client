import PropTypes from 'prop-types';

export const GenreType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
});

export const PersonType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
});

export const MovieDetailsPropTypes = {
  originalTitle: PropTypes.string,
  title: PropTypes.string,
  imdbUrl: PropTypes.string,
  overview: PropTypes.string,
  image: PropTypes.string,
  genres: PropTypes.arrayOf(GenreType),
  voteAverage: PropTypes.number,
  voteCount: PropTypes.number,
  directors: PropTypes.arrayOf(PersonType),
  writers: PropTypes.arrayOf(PersonType),
  cast: PropTypes.arrayOf(PersonType),
};
