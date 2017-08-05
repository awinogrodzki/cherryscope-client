import { mapMovies } from '../movies';

jest.mock('services/movie', () => ({
  getImageUrl: image => image,
}));

const mockMoviesResponse = {
  results: [
    {
      id: 12345,
      poster_path: 'test_image_url',
      original_title: 'Original title',
      title: 'Title',
      vote_count: 10,
      vote_average: 5.5,
      release_date: '2012-12',
    },
  ],
  page: 1,
  total_results: 20,
  total_pages: 5,
};

const mappedMoviesResponse = {
  items: [
    {
      id: 12345,
      imageUrl: 'test_image_url',
      title: 'Title',
      originalTitle: 'Original title',
      voteCount: 10,
      voteAverage: 5.5,
      releaseDate: '2012-12',
    },
  ],
  page: 1,
  pageCount: 5,
  itemCount: 20,
};

describe('movie service response get movie details mapper', () => {
  it('should map movie details', () => {
    expect(mapMovies(mockMoviesResponse)).toEqual(mappedMoviesResponse);
  });
});
