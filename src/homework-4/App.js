import React, { Component, useEffect, useState} from "react";
import {
  Routes,
  Route,
  useNavigate,
  Link,
  Navigate,
  NavLink,
} from "react-router-dom";
import styles from "./styles.module.css";
import { nanoid } from "nanoid";

class SearchBar extends Component {
  state = {
    search: "",
  };
  handleInput = ({ target }) => {
    this.setState({ search: target.value });
  };
  handleSubmit = (evt) => {
    evt.preventDefault();
    const { search } = this.props;
    const dataToSearchFor = this.state.search;
    search(dataToSearchFor);
  };
  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm}>
          <button
            type="submit"
            onClick={this.handleSubmit}
            className={styles.SearchForm_button}
          >
            <span className={styles.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={styles.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}

class NavBar extends Component {
  render() {
    return (
      <>
        <div>
          <NavLink to="/homework-4">Home</NavLink>
          <NavLink to="/homework-4/movies">Movies</NavLink>
        </div>
      </>
    );
  }
}

function HomePage(props) {
  const { movies, setCurrentMovie } = props;
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <button onClick={() => navigate(-1)}>Go back</button>
      <h1>Trending today:</h1>
      <ul className={styles.trending}>
        {movies.map((movie) => (
          <li key={nanoid()}>
            <Link
              className={styles.Link}
              to={"movies/:" + movie.id}
              onClick={() => {
                setCurrentMovie(movie.id);
              }}
            >
              {movie.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function MoviesPage(props) {
  const [movies, setMovies] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const { setCurrentMovieId } = props;

  function getKeywordFromSearchBar(keyword) {
    setKeyword(keyword);
  }

  async function fetchMoviesByKeyword() {
    return fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=2b063754856898754bb8ffd8c55819f3&language=en-US&query=${keyword}&page=1&include_adult=false`
    )
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((movies) =>
        movies.results.map((movie) => {
          if (movie.name !== undefined) return { ...movie, name: movie.name };
          else return { ...movie, name: movie.title };
        })
      );
  }

  

  useEffect(() => {
    async function test() {
      console.log(1);
      setMovies(await fetchMoviesByKeyword());
    }
    test();
  }, [keyword]);

  if (!movies.length)
    return (
      <>
        <NavBar />
        <button onClick={() => navigate(-1)}>Go back</button>
        <SearchBar search={getKeywordFromSearchBar} />
      </>
    );
  return (
    <>
      <NavBar />
      <button onClick={() => navigate(-1)}>Go back</button>
      <SearchBar search={getKeywordFromSearchBar} />
      <ul>
        {movies.map((movie) => {
          return (
            <li key={nanoid()}>
              <Link
                to={":" + movie.id}
                onClick={() => setCurrentMovieId(movie.id)}
              >
                {movie.name}
              </Link>
              <br></br>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function MovieDetailsPage(props) {
  const [movie, setMovie] = useState({});
  const [depth, setDepth] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    async function getMovieByFetch() {
      const { fetchInfoAboutMovie } = props;
      setMovie(await fetchInfoAboutMovie());
    }
    getMovieByFetch();
  }, []);

  if (Object.keys(movie).length > 0) {
    const { ExtraInfo } = props;
    return (
      <>
        <NavBar />
        <button onClick={() => navigate(-depth)}>Go back</button>
        <img
          src={"https://image.tmdb.org/t/p/original/" + movie.posterImage}
          style={{ height: "380px" }}
        />
        <h1>{movie.name}</h1>
        <p>User score: {movie.userScore}%</p>
        <h2>Overview</h2>
        <p>{movie.overview}</p>
        <h2>Genres</h2>
        <p>
          {movie.genres.map((genre) => (
            <span key={nanoid()}>{genre.name + " "}</span>
          ))}
        </p>
        <Link
          onClick={() => setDepth(depth + 1)}
          to={"/homework-4/movies/:" + movie.id + "/cast"}
        >
          Cast
        </Link>
        <br></br>
        <Link
          onClick={() => setDepth(depth + 1)}
          to={"/homework-4/movies/:" + movie.id + "/reviews"}
        >
          Reviews
        </Link>
        {ExtraInfo}
      </>
    );
  }
  return <h1>Failed to load web-page, come back to main menu</h1>;
}

function Cast(props) {
  const [cast, setCast] = useState([]);
  const { movieId } = props;
  const [id, setId] = useState(movieId);

  async function fetchCast() {
    return await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=2b063754856898754bb8ffd8c55819f3`
    )
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((credits) =>
        credits.cast
          .filter((actor, index) => index < 3)
          .map((actor) => ({
            character: actor.character,
            picture: actor.profile_path,
            name: actor.name,
            id: id,
          }))
      );
  }

  useEffect(() => {
    async function getMovieCast() {
      if (!cast.length) setCast(await fetchCast());
    }
    getMovieCast();
  });

  return (
    <>
      {cast.map((actor) => (
        <div key={nanoid()}>
          <img
            key={nanoid()}
            src={"https://image.tmdb.org/t/p/original/" + actor.picture}
            style={{ height: "225px" }}
          />
          <ul key={nanoid()}>
            <li key={nanoid()}>{actor.name}</li>
            <p key={nanoid()}>Character: {actor.character}</p>
          </ul>
        </div>
      ))}
    </>
  );
}

function Reviews(props) {
  const [reviews, setReviews] = useState([]);
  const { movieId } = props;
  const [id, setId] = useState(movieId);

  async function fetchReviews() {
    return await fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=2b063754856898754bb8ffd8c55819f3`
    )
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((reviews) =>
        reviews.results
          .filter((review, index) => index < 3)
          .map((review) => ({
            author: review.author,
            content: review.content,
          }))
      );
  }

  useEffect(() => {
    async function getReviews() {
      if (!reviews.length) setReviews(await fetchReviews());
    }
    getReviews();
  }, []);

  return (
    <>
      {reviews.length ? (
        reviews.map((review) => (
          <ul key={nanoid()}>
            <li>
              <strong>Author: {review.author}</strong>
              <p>{review.content}</p>
            </li>
          </ul>
        ))
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </>
  );
}

function App() {
  const [movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState(0);

  async function getTrending() {
    return fetch(
      "https://api.themoviedb.org/3/trending/all/day?api_key=2b063754856898754bb8ffd8c55819f3"
    )
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((movies) => {
        return movies.results.map((movie) => {
          if (movie.name !== undefined) return { ...movie, name: movie.name };
          else return { ...movie, name: movie.title };
        });
      });
  }

  async function updateMovies() {
    setMovies(await getTrending());
  }

  function setCurrentMovie(id) {
    if (id !== movieId && id !== undefined && id !== null) {
      setMovieId(id);
    }
  }

  async function fetchInfoAboutMovie() {
    return fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=2b063754856898754bb8ffd8c55819f3&language=en-US`
    )
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((movieDetails) => {
        if (movieDetails.name !== undefined)
          return { ...movieDetails, name: movieDetails.name };
        else return { ...movieDetails, name: movieDetails.title };
      })
      .then((movie) => {
        return {
          posterImage: movie.poster_path,
          name: movie.name,
          id: movie.id,
          userScore: Math.round(movie.vote_average * 10),
          overview: movie.overview,
          genres: movie.genres,
        };
      });
  }

  useEffect(() => {
    updateMovies();
  }, []);

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <HomePage movies={movies} setCurrentMovie={setCurrentMovie} />
          }
        />
        <Route
          path="movies/"
          element={<MoviesPage setCurrentMovieId={setCurrentMovie} />}
        />
        <Route
          path={"movies/:" + movieId}
          element={
            <MovieDetailsPage fetchInfoAboutMovie={fetchInfoAboutMovie} />
          }
        />
        <Route
          path={"movies/:" + movieId + "/cast"}
          element={<MovieDetailsPage ExtraInfo={<Cast movieId={movieId} />} />}
        />
        <Route
          path={"movies/:" + movieId + "/reviews"}
          element={
            <MovieDetailsPage ExtraInfo={<Reviews movieId={movieId} />} />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
//https://api.themoviedb.org/3/movie/550?api_key=2b063754856898754bb8ffd8c55819f3
//https://api.themoviedb.org/3/search/movie?api_key=2b063754856898754bb8ffd8c55819f3&language=en-US&query=aaaaaaa&page=1&include_adult=false
