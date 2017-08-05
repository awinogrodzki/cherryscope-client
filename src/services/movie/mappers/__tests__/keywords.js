import { mapKeywordsResponse } from '../keywords';

const mockKeywordsResponse = {
  results: [
    {
      id: 12345,
      name: 'Keyword name',
    },
  ],
  page: 1,
  total_pages: 5,
  total_results: 25,
};

const mappedKeywords = {
  keywords: [
    {
      id: 12345,
      name: 'Keyword name',
    },
  ],
  page: 1,
  pageCount: 5,
  itemCount: 25,
};

describe('movie service search keywords response mapper', () => {
  it('should map keywords', () => {
    expect(mapKeywordsResponse(mockKeywordsResponse)).toEqual(mappedKeywords);
  });
});
