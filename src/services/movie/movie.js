import axios from 'axios';
import config from 'services/config';

const API_KEY = config.get('services.movie.api_key');
const API_URL = config.get('services.movie.api_url');
const DISCOVER_URI = config.get('services.movie.discover_uri');
const IMAGE_URL = config.get('services.movie.image_url');

const getImageUrl = (image) => {
  return `${IMAGE_URL}${image}`;
};

const getUrl = (uri) => {
  return `${API_URL}${DISCOVER_URI}?api_key=${API_KEY}`;
}

const mapResponse = (response) => {
  const data = response.data;

  return data;
};

const DISCOVER_URL = getUrl(DISCOVER_URI);

export default {
  discover(filters = {}) {
    return new Promise((resolve, reject) => {
      axios.get(DISCOVER_URL, filters)
        .then((response) => {
          resolve(mapResponse(response));
        })
        .catch(error => reject(error));
    });
  },
  getImageUrl,
}
