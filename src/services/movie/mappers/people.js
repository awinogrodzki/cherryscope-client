import movieService from 'services/movie';
import { mapMovies } from './movies';

export const mapPeopleResponse = data => ({
  people: data.results.map(item => ({
    id: item.id,
    name: item.name,
    avatarUrl: movieService.getImageUrl(item.profile_path, 160),
    knownFor: mapMovies(item.known_for),
  })),
  page: data.page,
  pageCount: data.total_pages,
  itemCount: data.total_results,
});
