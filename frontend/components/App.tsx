import { React, Link, Route, Switch } from "../dep.ts";
import Movies from "./movie/Movies.tsx";
import Actors from "./actor/Actors.tsx";

const App = () => {
  return (
    <div className="bg-white">
      <header>
        <div className="container mx-auto px-6 py-3">
          <nav className="sm:flex sm:justify-center sm:items-center mt-4">
            <div className="flex flex-col sm:flex-row">
              <Link
                to="/movies"
                className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
              >
                Movies
              </Link>
              <Link
                to="/actors"
                className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
              >
                Actors
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <main className="my-8">
        <Switch>
          <Route path="/" exact>
            <Movies />
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/actors">
            <Actors />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default App;