import React from "react";
import PropTypes from "prop-types";
import { t } from "services/translate";
import modalService from "services/modal";
import MovieSearch from "components/MovieSearch";
import MovieList from "components/MovieList";
import MovieDetails, { movieDetailsPropTypes } from "components/MovieDetails";
import LoadMore from "components/LoadMore";
import styles from "./Movies.css";

class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.movieSearchInput = null;

    this.onLoadMoreChange = this.onLoadMoreChange.bind(this);
    this.selectMovie = this.selectMovie.bind(this);
    this.onMovieSearchChange = this.onMovieSearchChange.bind(this);
    this.onMovieSearchMovieClick = this.onMovieSearchMovieClick.bind(this);
    this.setMovieSearchInput = this.setMovieSearchInput.bind(this);

    this.state = {
      filters: {},
      dates: [],
      genres: [],
      keywords: [],
      votes: [],
      sortBy: null,
      isListLoading: false,
      loadingMovieId: null,
      selectedSearchMovieId: null,
      page: 1
    };
  }

  componentDidMount() {
    this.discoverMovies();
    this.props.getConfiguration();
  }

  discoverMovies(filters = {}, append = false) {
    this.setState({ isListLoading: true });

    this.props
      .discoverMovies(filters, append)
      .then(() => this.setState({ isListLoading: false }))
      .catch(() => this.setState({ isListLoading: false }));
  }

  mapFilters() {
    const filters = this.state.filters;

    const mappedFilters = {
      ...this.mapCompanies(filters.companies),
      ...this.mapPeople(filters.people),
      ...this.mapKeywords(filters.keywords),
      ...this.mapGenres(filters.genres),
      ...this.mapDateFilters(filters.dates),
      ...this.mapVoteFilters(filters.votes),
      sort_by: filters.sortBy,
      with_original_language:
        (filters.language && filters.language.value) || "",
      page: this.state.page
    };

    return mappedFilters;
  }

  mapCompanies(companies) {
    if (!companies) {
      return {};
    }

    return {
      with_companies: companies.map(company => company.value).join(",")
    };
  }

  mapPeople(people) {
    if (!people) {
      return {};
    }

    return {
      with_people: people.map(person => person.value).join(",")
    };
  }

  mapKeywords(keywords) {
    if (!keywords) {
      return {};
    }

    return {
      with_keywords: keywords.map(keyword => keyword.value).join(",")
    };
  }

  mapGenres(genres) {
    if (!genres) {
      return {};
    }

    return {
      with_genres: genres.map(genre => genre.value).join(",")
    };
  }

  mapDateFilters(dates = []) {
    const mappedFilters = {};

    dates.forEach(date => {
      if (!date || !date.value || !date.date) {
        return;
      }

      mappedFilters[date.value] = date.date;
    });

    return mappedFilters;
  }

  mapVoteFilters(votes = []) {
    const mappedFilters = {};

    votes.forEach(vote => {
      if (!vote || !vote.value || !vote.data) {
        return;
      }

      mappedFilters[vote.value] = vote.data;
    });

    return mappedFilters;
  }

  onMovieSearchChange(filters) {
    this.setState({ filters, page: 1 }, () =>
      this.discoverMovies(this.mapFilters())
    );
  }

  onLoadMoreChange(page) {
    this.setState({ page }, () => this.discoverMovies(this.mapFilters(), true));
  }

  onMovieSearchMovieClick(id, element) {
    if (
      this.state.loadingMovieId !== null ||
      this.state.selectedSearchMovieId !== null
    ) {
      return;
    }

    this.setState(
      {
        loadingMovieId: id,
        selectedSearchMovieId: id
      },
      () => {
        this.openMovieModal(id, element, () => {
          this.setState(
            {
              loadingMovieId: null,
              selectedSearchMovieId: null
            },
            () => this.movieSearchInput.focus()
          );
        }).catch(() =>
          this.setState({
            loadingMovieId: null,
            selectedSearchMovieId: null
          })
        );
      }
    );
  }

  setMovieSearchInput(input) {
    this.movieSearchInput = input;
  }

  selectMovie(id, element) {
    if (this.state.loadingMovieId !== null) {
      return;
    }

    this.setState(
      {
        loadingMovieId: id
      },
      () => {
        this.openMovieModal(id, element)
          .then(() => this.setState({ loadingMovieId: null }))
          .catch(() => {
            this.setState({ loadingMovieId: null });
          });
      }
    );
  }

  openMovieModal(id, element, onWillUnmountCallback) {
    return this.props.getMovie(id).then(() => {
      modalService.createModal(
        () => {
          const {
            originalTitle,
            title,
            overview,
            imdbId,
            image,
            genres,
            voteCount,
            voteAverage,
            directors,
            writers,
            cast,
            images,
            videos
          } = this.props.movieDetails;

          return (
            <MovieDetails
              originalTitle={originalTitle}
              title={title}
              overview={overview}
              imdbUrl={imdbId && `http://www.imdb.com/title/${imdbId}`}
              image={image}
              genres={genres}
              voteCount={voteCount}
              voteAverage={voteAverage}
              directors={directors}
              writers={writers}
              cast={cast}
              images={images}
              videos={videos}
            />
          );
        },
        {
          animateFromElement: element,
          onWillUnmount: onWillUnmountCallback
        }
      );
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <MovieSearch
          onChange={this.onMovieSearchChange}
          onMovieClick={this.onMovieSearchMovieClick}
          isExpanded={!!this.state.selectedSearchMovieId}
          getInput={this.setMovieSearchInput}
        />
        <MovieList
          movies={this.props.movies}
          isLoading={this.state.isListLoading}
          loadingMovieId={this.state.loadingMovieId}
          onMovieSelect={this.selectMovie}
        />
        {this.state.page < this.props.pageCount && (
          <LoadMore
            isLoading={this.state.isListLoading}
            label={t("movies.loadMore")}
            page={this.state.page}
            onChange={this.onLoadMoreChange}
          />
        )}
      </div>
    );
  }
}

Movies.propTypes = {
  movieDetails: PropTypes.shape(movieDetailsPropTypes),
  discoverMovies: PropTypes.func,
  getConfiguration: PropTypes.func,
  getMovie: PropTypes.func,
  movies: PropTypes.arrayOf(PropTypes.object),
  pageCount: PropTypes.number
};

Movies.defaultProps = {
  movieDetails: {},
  discoverMovies: null,
  getMovie: null,
  getConfiguration: () => {},
  movies: [],
  pageCount: 0
};

export default Movies;
