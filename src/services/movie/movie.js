import axios, { CancelToken } from 'axios';
import {
  mapMoviesResponse,
  mapMovieResponse,
  mapCompaniesResponse,
  mapPeopleResponse,
  mapKeywordsResponse,
  mapGenresResponse,
} from './mappers';

import {
  API_KEY,
  API_URL,
  DISCOVER_URI,
  GENRES_URI,
  SEARCH_KEYWORDS_URI,
  SEARCH_PEOPLE_URI,
  SEARCH_COMPANIES_URI,
  SEARCH_MOVIES_URI,
  MOVIE_URI,
  IMAGE_URL,
} from './constants';

const source = CancelToken.source();
const getImageUrl = (image, size = 500) => (image ? `${IMAGE_URL}${size}${image}` : null);
const getUrl = uri => `${API_URL}${uri}?api_key=${API_KEY}`;

const mapResponse = (response) => {
  const data = response.data;
  return data;
};

const getConfig = () => ({
  cancelToken: source.token,
});

export default {
  discover(filters = {}) {
    return axios.get(getUrl(DISCOVER_URI), {
      params: filters,
      ...getConfig(),
    })
    .then(response => mapMoviesResponse(mapResponse(response)));
  },

  getMovie(id) {
    return axios.get(getUrl(`${MOVIE_URI}/${id}`), {
      params: { append_to_response: 'videos,images,credits' },
      ...getConfig(),
    })
    .then(response => mapMovieResponse(mapResponse(response)));
  },

  getGenres() {
    return axios.get(getUrl(GENRES_URI), getConfig())
      .then(response => mapGenresResponse(mapResponse(response)));
  },

  searchKeywords(query = null) {
    return axios.get(getUrl(SEARCH_KEYWORDS_URI), {
      params: { query },
      ...getConfig(),
    })
    .then(response => mapKeywordsResponse(mapResponse(response)));
  },

  searchPeople(query = null) {
    return axios.get(getUrl(SEARCH_PEOPLE_URI), {
      params: { query },
      ...getConfig(),
    })
    .then(response => mapPeopleResponse(mapResponse(response)));
  },

  searchCompanies(query = null) {
    return axios.get(getUrl(SEARCH_COMPANIES_URI), {
      params: { query },
      ...getConfig(),
    })
    .then(response => mapCompaniesResponse(mapResponse(response)));
  },

  searchMovies(query = null) {
    return axios.get(getUrl(SEARCH_MOVIES_URI), {
      params: { query },
      ...getConfig(),
    })
    .then(response => mapMoviesResponse(mapResponse(response), 160));
  },

  cancelAllRequests() {
    source.cancel('Operation cancelled by the user.');
  },

  getImageUrl,
  getUrl,
};
