export const mapGenresResponse = data => ({
  genres: data.genres.map(genre => ({
    id: genre.id,
    name: genre.name,
  })),
});
