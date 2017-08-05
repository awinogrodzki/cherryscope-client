import { mapCompaniesResponse } from '../companies';

jest.mock('services/movie', () => ({
  getImageUrl: image => image,
}));

const mockCompaniesResponse = {
  results: [
    {
      id: 12345,
      logo_path: 'logo_path',
      name: 'Company name',
    },
  ],
  page: 1,
  total_pages: 5,
  total_results: 25,
};

const mappedCompanies = {
  companies: [
    {
      id: 12345,
      logoUrl: 'logo_path',
      name: 'Company name',
    },
  ],
  page: 1,
  pageCount: 5,
  itemCount: 25,
};

describe('movie service search companies response mapper', () => {
  it('should map companies', () => {
    expect(mapCompaniesResponse(mockCompaniesResponse)).toEqual(mappedCompanies);
  });
});
