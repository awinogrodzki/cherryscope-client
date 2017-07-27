import PropTypes from 'prop-types';

export const genreType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
});

export const personType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
});

export const imageType = PropTypes.shape({
  id: PropTypes.number,
  url: PropTypes.string,
  thumbnailUrl: PropTypes.string,
});

export const movieDetailsPropTypes = {
  originalTitle: PropTypes.string,
  title: PropTypes.string,
  imdbUrl: PropTypes.string,
  overview: PropTypes.string,
  image: PropTypes.string,
  images: PropTypes.arrayOf(imageType),
  genres: PropTypes.arrayOf(genreType),
  voteAverage: PropTypes.number,
  voteCount: PropTypes.number,
  directors: PropTypes.arrayOf(personType),
  writers: PropTypes.arrayOf(personType),
  cast: PropTypes.arrayOf(personType),
};
