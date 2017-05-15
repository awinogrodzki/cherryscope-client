import movieService from './movie';

jest.mock('services/config', () => {
  const mockConfig = {
    services: {
      movie: {
        api_key: '1ef3f71a318d8d8ed927fdcf2fb90670',
        api_url: 'https://api.themoviedb.org/3',
        discover_uri: '/discover/movie',
        genres_uri: '/genre/movie/list',
        image_url: 'https://image.tmdb.org/t/p/w500',
      },
    },
  };

  return {
    get: string => require('lodash').get(mockConfig, string), //eslint-disable-line global-require
  };
});

jest.mock('axios', () => ({
  get: (url, options = {}) => Promise.resolve({ data: { url, options } }),
}));

describe('movie service', () => {
  it('should properly generate url', () => {
    expect(movieService.getUrl('/test_uri')).toBe('https://api.themoviedb.org/3/test_uri?api_key=1ef3f71a318d8d8ed927fdcf2fb90670');
  });

  it('should be able to discover movies', () => movieService.discover().then((response) => {
    expect(response.url).toBe('https://api.themoviedb.org/3/discover/movie?api_key=1ef3f71a318d8d8ed927fdcf2fb90670');
  }));

  it('should be able to discover movies with parameters', () => {
    const params = {
      testFilters: [1, 2, 3],
    };

    return movieService.discover(params).then((response) => {
      expect(response.options.params).toBe(params);
    });
  });

  it('should be able to get genres', () => movieService.getGenres().then((response) => {
    expect(response.url).toBe('https://api.themoviedb.org/3/genre/movie/list?api_key=1ef3f71a318d8d8ed927fdcf2fb90670');
  }));

  it('should be able to generate image url', () => {
    expect(movieService.getImageUrl('/test_url')).toBe('https://image.tmdb.org/t/p/w500/test_url');
  });

  it('should return null if image uri is incorrect', () => {
    expect(movieService.getImageUrl(undefined)).toBe(null);
  });
});