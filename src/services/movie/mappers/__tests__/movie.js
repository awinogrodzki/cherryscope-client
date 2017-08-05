import { mapMovie } from '../movie';

jest.mock('services/movie', () => ({
  getImageUrl: image => image,
}));

const mockMovieResponse = {
  id: 12345,
  imdb_id: 54321,
  overview: 'Lorem ipsum',
  poster_path: 'test_image_url',
  original_title: 'Original title',
  title: 'Title',
  genres: [1, 2, 3],
  vote_count: 10,
  vote_average: 5.5,
  credits: {
    crew: [
      { id: 123456, name: 'Director Name', job: 'Director' },
      { id: 654321, name: 'Writer Name', job: 'Writer' },
      { id: 515212, name: 'Second Writer Name', job: 'Screenplay' },
    ],
    cast: [
      { id: 123, name: 'John Doe' },
    ],
  },
  images: {
    backdrops: [
      { file_path: 'image_1' },
      { file_path: 'image_2' },
    ],
  },
  videos: {
    results: [
      {
        id: '57d2ffc49251415496000429',
        iso_639_1: 'en',
        iso_3166_1: 'US',
        key: 'PC460OxDNhc',
        name: 'Announcement',
        site: 'YouTube',
        size: 1080,
        type: 'Teaser',
      },
      {
        id: '590dedfbc3a36864a700fb24',
        iso_639_1: 'en',
        iso_3166_1: 'US',
        key: 'T7O7BtBnsG4',
        name: 'Official Trailer #1',
        site: 'YouTube',
        size: 1080,
        type: 'Trailer',
      },
    ],
  },
};

const mappedMovieResponse = {
  id: 12345,
  imdbId: 54321,
  overview: 'Lorem ipsum',
  image: 'test_image_url',
  originalTitle: 'Original title',
  title: 'Title',
  genres: [1, 2, 3],
  voteCount: 10,
  voteAverage: 5.5,
  directors: mockMovieResponse.credits.crew
    .filter(item => item.job === 'Director'),
  writers: mockMovieResponse.credits.crew
    .filter(item => item.job === 'Writer' || item.job === 'Screenplay'),
  cast: mockMovieResponse.credits.cast,
  images: [
    { id: 0, url: 'image_1', thumbnailUrl: 'image_1' },
    { id: 1, url: 'image_2', thumbnailUrl: 'image_2' },
  ],
  videos: [
    {
      id: '57d2ffc49251415496000429',
      key: 'PC460OxDNhc',
      name: 'Announcement',
      site: 'YouTube',
      type: 'Teaser',
    },
    {
      id: '590dedfbc3a36864a700fb24',
      key: 'T7O7BtBnsG4',
      name: 'Official Trailer #1',
      site: 'YouTube',
      type: 'Trailer',
    },
  ],
};

describe('movie service response get movie details mapper', () => {
  it('should map movie details', () => {
    expect(mapMovie(mockMovieResponse)).toEqual(mappedMovieResponse);
  });
});
