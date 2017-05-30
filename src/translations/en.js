export default {
  movies: {
    dates: 'Dates',
    date: {
      release_date: {
        lte: 'Release date before',
        gte: 'Release date after',
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
        asc: 'Most votes',
        desc: 'Least votes',
      },
      vote_average: {
        asc: 'Best vote',
        desc: 'Worst vote',
      },
    },
  },
};
