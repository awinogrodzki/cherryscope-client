import PropTypes from 'prop-types';
import { movieType } from 'components/Movie/types';

export const personType = PropTypes.shape({
  id: PropTypes.number,
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
  knownFor: PropTypes.arrayOf(movieType),
});
