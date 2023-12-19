import React, { useState } from "react";

const PlaceDisplay = () => {
  const [displayType, setDisplayType] = useState<string>("Cards");
  return (
    <div>
      {" "}
      <select
        value={displayType}
        onChange={(e) => setDisplayType(e.target.value)}
        className="form-element"
      >
        <option value="Cards">Cards</option>
        <option value="Detailed">Detailed</option>
      </select>
    </div>
  );
};

export default PlaceDisplay;
