import PropTypes from 'prop-types';

export const movieType = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  originalTitle: PropTypes.string,
  imageUrl: PropTypes.string,
  voteAverage: PropTypes.number,
  voteCount: PropTypes.number,
  releaseDate: PropTypes.string,
});
