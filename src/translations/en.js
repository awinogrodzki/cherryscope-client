export default {
  movie: {
    voteCount: 'Vote count',
    voteAverage: 'Vote average',
    releaseDate: 'Released',
  },
  movies: {
    dates: 'Dates',
    date: {
      primary_release_year: 'Released in year',
      primary_release_date: {
        lte: 'Released before',
        gte: 'Released after',
      },
    },
    genres: 'Genres',
    sortBy: 'Sort by',
    sort: {
      popularity: {
        asc: 'Least popular',
        desc: 'Most popular',
      },
      release_date: {
        asc: 'Released earliest',
        desc: 'Released latest',
      },
      primary_release_date: {
        asc: 'Primary released earliest',
        desc: 'Primary released latest',
      },
      vote_count: {
        asc: 'Least votes',
        desc: 'Most votes',
      },
      vote_average: {
        asc: 'Worst vote',
        desc: 'Best vote',
      },
    },
  },
};
