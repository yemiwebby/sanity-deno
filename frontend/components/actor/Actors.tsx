import { React } from "../../dep.ts";
import { runQuery } from "../../SanityAPI.ts";
import Actor from "./Actor.tsx";

const { useState, useEffect } = React;
const Actors = () => {
  const [actor, setActors] = useState<any>([]);
  const updateActors = (actors: any[]) => {
    setActors(actors);
  };
  useEffect(() => {
    const query = `*[_type == 'person']{ _id, name, image}`;
    runQuery(query, updateActors);
  }, []);

  return (
    <div className="container mx-auto px-6">
      <h3 className="text-gray-700 text-2xl font-medium">A-List Movie Stars</h3>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-5">
        {actor.map((actor: any) => (
          <Actor key={actor._id} {...actor} />
        ))}
      </div>
    </div>
  );
};

export default Actors;