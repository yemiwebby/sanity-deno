import { React } from "../../dep.ts";
import { urlFor } from "../../SanityAPI.ts";

const Actor: React.FC<any> = ({ name, image }) => {
  const defaultImageURL =
    "https://images.vexels.com/media/users/3/140384/isolated/preview/fa2513b856a0c96691ae3c5c39629f31-girl-profile-avatar-1-by-vexels.png";
  return (
    <>
      <div className="max-w-xs rounded overflow-hidden shadow-lg my-2">
        <img
          className="w-full"
          src={`${image ? urlFor(image.asset._ref) : defaultImageURL}`}
          alt={name}
        />
        <div className="px-6 py-4">
          <h3 className="text-xl mb-2 text-center">{name}</h3>
        </div>
      </div>
    </>
  );
};

export default Actor;