export const mapKeywordsResponse = data => ({
  keywords: data.results.map(item => ({
    id: item.id,
    name: item.name,
  })),
  page: data.page,
  pageCount: data.total_pages,
  itemCount: data.total_results,
});
