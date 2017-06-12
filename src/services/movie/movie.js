import axios from 'axios';
import config from 'services/config';

const API_KEY = config.get('services.movie.api_key');
const API_URL = config.get('services.movie.api_url');
const DISCOVER_URI = config.get('services.movie.discover_uri');
const GENRES_URI = config.get('services.movie.genres_uri');
const SEARCH_KEYWORDS_URI = config.get('services.movie.search.keywords_uri');
const SEARCH_PEOPLE_URI = config.get('services.movie.search.people_uri');
const IMAGE_URL = config.get('services.movie.image_url');

const getImageUrl = image => (image ? `${IMAGE_URL}${image}` : null);
const getUrl = uri => `${API_URL}${uri}?api_key=${API_KEY}`;

const mapResponse = (response) => {
  const data = response.data;
  return data;
};

export default {
  discover(filters = {}) {
    return axios.get(getUrl(DISCOVER_URI), { params: filters })
      .then(response => mapResponse(response));
  },

  getGenres() {
    return axios.get(getUrl(GENRES_URI))
      .then(response => mapResponse(response));
  },

  searchKeywords(query = null) {
    return axios.get(getUrl(SEARCH_KEYWORDS_URI), { params: { query } })
      .then(response => mapResponse(response));
  },

  searchPeople(query = null) {
    return axios.get(getUrl(SEARCH_PEOPLE_URI), { params: { query } })
      .then(response => mapResponse(response));
  },

  getImageUrl,
  getUrl,
};
