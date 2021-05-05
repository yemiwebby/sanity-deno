import { React } from "../../dep.ts";
import Movie from "./Movie.tsx";
import { runQuery } from "../../SanityAPI.ts";

const { useState, useEffect } = React;
const Movies = () => {
  const [movies, setMovies] = useState<any>([]);
  const updateMovies = (movies: any[]) => {
    setMovies(movies);
  };
  useEffect(() => {
    const query = `*[_type == 'movie']{_id, title, overview, releaseDate, poster}`;
    runQuery(query, updateMovies);
  }, []);

  return (
    <div className="container mx-auto px-6">
      <h3 className="text-gray-700 text-2xl font-medium">
        Bestselling Sci-fi Movies
      </h3>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-5">
        {movies.map((movie: any) => (
          <Movie key={movie._id} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;