import movieService from 'services/movie';

export const mapMovies = (results, imageSize) => results.map(item => ({
  id: item.id,
  title: item.title,
  originalTitle: item.original_title,
  imageUrl: movieService.getImageUrl(item.poster_path, imageSize),
  voteAverage: item.vote_average,
  voteCount: item.vote_count,
  releaseDate: item.release_date,
}));

export const mapMoviesResponse = (data, imageSize = 500) => ({
  movies: mapMovies(data.results, imageSize),
  page: data.page,
  pageCount: data.total_pages,
  itemCount: data.total_results,
});
