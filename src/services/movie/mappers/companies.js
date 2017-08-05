import movieService from 'services/movie';

export const mapCompaniesResponse = data => ({
  companies: data.results.map(item => ({
    id: item.id,
    name: item.name,
    logoUrl: movieService.getImageUrl(item.logo_path, 160),
  })),
  page: data.page,
  pageCount: data.total_pages,
  itemCount: data.total_results,
});
