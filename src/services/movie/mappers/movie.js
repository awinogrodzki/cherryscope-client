import movieService from 'services/movie';
import { get } from 'lodash';

export const mapDirectors = response =>
  get(response, 'credits.crew', [])
  .filter(item => item.job === 'Director');

export const mapWriters = response =>
  get(response, 'credits.crew', [])
  .filter(item => item.job === 'Writer' || item.job === 'Screenplay');

export const mapCast = response => get(response, 'credits.cast', []).slice(0, 10);

export const mapMovie = data => ({
  id: data.id,
  overview: data.overview,
  imdbId: data.imdb_id,
  image: movieService.getImageUrl(data.poster_path),
  images: data.images.backdrops.map((image, index) => ({
    id: index,
    url: movieService.getImageUrl(image.file_path, 1000),
    thumbnailUrl: movieService.getImageUrl(image.file_path, 160),
  })),
  videos: data.videos.results.map(video => ({
    id: video.id,
    key: video.key,
    name: video.name,
    site: video.site,
    type: video.type,
  })),
  originalTitle: data.original_title,
  title: data.title,
  genres: data.genres,
  voteCount: data.vote_count,
  voteAverage: data.vote_average,
  directors: mapDirectors(data),
  writers: mapWriters(data),
  cast: mapCast(data),
});
