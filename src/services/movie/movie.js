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
  CONFIGURATION_URI,
} from './constants';

class MovieService {
  constructor() {
    this.source = null;

    this.refreshCancellationToken();
  }

  getConfiguration() {
    return axios
      .get(this.getUrl(CONFIGURATION_URI), {
        ...this.getConfig(),
      })
      .then(response => this.mapResponse(response));
  }

  discover(filters = {}) {
    return axios
      .get(this.getUrl(DISCOVER_URI), {
        params: filters,
        ...this.getConfig(),
      })
      .then(response => mapMoviesResponse(this.mapResponse(response)));
  }

  getMovie(id) {
    return axios
      .get(this.getUrl(`${MOVIE_URI}/${id}`), {
        params: { append_to_response: 'videos,images,credits' },
        ...this.getConfig(),
      })
      .then(response => mapMovieResponse(this.mapResponse(response)));
  }

  getGenres() {
    return axios
      .get(this.getUrl(GENRES_URI), this.getConfig())
      .then(response => mapGenresResponse(this.mapResponse(response)));
  }

  searchKeywords(query = null) {
    return axios
      .get(this.getUrl(SEARCH_KEYWORDS_URI), {
        params: { query },
        ...this.getConfig(),
      })
      .then(response => mapKeywordsResponse(this.mapResponse(response)));
  }

  searchPeople(query = null) {
    return axios
      .get(this.getUrl(SEARCH_PEOPLE_URI), {
        params: { query },
        ...this.getConfig(),
      })
      .then(response => mapPeopleResponse(this.mapResponse(response)));
  }

  searchCompanies(query = null) {
    return axios
      .get(this.getUrl(SEARCH_COMPANIES_URI), {
        params: { query },
        ...this.getConfig(),
      })
      .then(response => mapCompaniesResponse(this.mapResponse(response)));
  }

  searchMovies(query = null) {
    return axios
      .get(this.getUrl(SEARCH_MOVIES_URI), {
        params: { query },
        ...this.getConfig(),
      })
      .then(response => mapMoviesResponse(this.mapResponse(response), 300));
  }

  refreshCancellationToken() {
    this.source = CancelToken.source();
  }

  cancelAllRequests() {
    this.source.cancel('Operation cancelled by the user.');
    this.refreshCancellationToken();
  }

  mapResponse(response) {
    const data = response.data;

    return data;
  }

  getConfig() {
    return {
      cancelToken: this.source.token,
    };
  }

  getImageUrl(image, size = 500) {
    return image ? `${IMAGE_URL}${size}${image}` : null;
  }

  getUrl(uri) {
    return `${API_URL}${uri}?api_key=${API_KEY}`;
  }
}

export default new MovieService();
