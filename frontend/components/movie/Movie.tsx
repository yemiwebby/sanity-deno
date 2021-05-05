import { React } from "../../dep.ts";
import { urlFor } from "../../SanityAPI.ts";

const Movie:React.FC<any> = ({ title, overview, releaseDate, poster }) => {
  return (
      <div className="max-w-xs rounded overflow-hidden shadow-lg my-2">
        <img
          src={`${urlFor(poster.asset._ref)}`}
          alt={title}
        />
        <div className="px-6 py-4">
          <h3 className="text-xl mb-2 text-center">{title}</h3>
          <p className="text-md justify-start">
            {overview[0].children[0].text}
          </p>
        </div>
        <div className="align-bottom">
          <p className="text-gray text-center text-xs font-medium my-5">
            Released on {new Date(releaseDate).toDateString()}
          </p>
        </div>
      </div>
  );
};

export default Movie;