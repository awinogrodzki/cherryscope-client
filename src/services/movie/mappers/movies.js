import movieService from 'services/movie';

export const mapMovies = (data, imageSize = 500) => ({
  items: data.results.map(item => ({
    id: item.id,
    title: item.title,
    originalTitle: item.original_title,
    imageUrl: movieService.getImageUrl(item.poster_path, imageSize),
    voteAverage: item.vote_average,
    voteCount: item.vote_count,
    releaseDate: item.release_date,
  })),
  page: data.page,
  pageCount: data.total_pages,
  itemCount: data.total_results,
});
