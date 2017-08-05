import { mapGenresResponse } from '../genres';

const mockGenresResponse = {
  genres: [
    {
      id: 12345,
      name: 'Genre name',
    },
  ],
};

const mappedGenresResponse = {
  genres: [
    {
      id: 12345,
      name: 'Genre name',
    },
  ],
};

describe('movie service genres response mapper', () => {
  it('should map genres', () => {
    expect(mapGenresResponse(mockGenresResponse)).toEqual(mappedGenresResponse);
  });
});
