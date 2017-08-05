import { mapPeopleResponse } from '../people';

jest.mock('services/movie', () => ({
  getImageUrl: image => image,
}));

jest.mock('../movies', () => ({
  mapMovies: value => value,
}));

const mockPeopleResponse = {
  results: [
    {
      id: 12345,
      profile_path: 'avatar_url',
      name: 'John Doe',
      known_for: 'moviesToMap',
    },
  ],
  page: 1,
  total_pages: 5,
  total_results: 25,
};

const mappedPeople = {
  people: [
    {
      id: 12345,
      avatarUrl: 'avatar_url',
      name: 'John Doe',
      knownFor: 'moviesToMap',
    },
  ],
  page: 1,
  pageCount: 5,
  itemCount: 25,
};

describe('movie service search people response mapper', () => {
  it('should map people', () => {
    expect(mapPeopleResponse(mockPeopleResponse)).toEqual(mappedPeople);
  });
});
