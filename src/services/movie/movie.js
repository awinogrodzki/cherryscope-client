import axios from 'axios';
import config from 'services/config';

const API_KEY = config.get('services.movie.api_key');
const API_URL = config.get('services.movie.api_url');
const DISCOVER_URI = config.get('services.movie.discover_uri');
const GENRES_URI = config.get('services.movie.genres_uri');
const IMAGE_URL = config.get('services.movie.image_url');

const getImageUrl = image => `${IMAGE_URL}${image}`;
const getUrl = uri => `${API_URL}${uri}?api_key=${API_KEY}`;

const mapResponse = (response) => {
  const data = response.data;
  return data;
};

const DISCOVER_URL = getUrl(DISCOVER_URI);
const GENRES_URL = getUrl(GENRES_URI);

export default {
  discover(filters = {}) {
    return axios.get(DISCOVER_URL, { params: filters })
      .then(response => mapResponse(response));
  },

  getGenres() {
    return axios.get(GENRES_URL)
      .then(response => mapResponse(response));
  },

  getImageUrl,
};
