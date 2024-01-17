import React from "react";
import { CircleFlag } from "react-circle-flags";

const Profile = () => {
  return (
    <div className="flex flex-1 flex-col items-center gap-2 rounded-lg bg-pure-white p-4 font-bold shadow-md">
      <CircleFlag countryCode="es" width="40" />
      <div className="text-body-2 flex flex-col gap-2">
        <div>
          <span>Place added: </span>
          <span className="text-primary">42</span>
        </div>

        <div>
          <span>Popularity: </span>
          <span className="text-primary">#10</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
