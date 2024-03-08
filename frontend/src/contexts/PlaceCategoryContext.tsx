import React, { createContext, useContext, useState } from "react";
import { PLACE_CATEGORY } from "../constants";

type CategoryContextType = {
  placesCategory: PLACE_CATEGORY;
  setPlacesCategory: React.Dispatch<React.SetStateAction<PLACE_CATEGORY>>;
};

const PlaceCategoryContext = createContext({} as CategoryContextType);

export function usePlaceCategoryContext() {
  return useContext(PlaceCategoryContext);
}

const PlaceCategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [placesCategory, setPlacesCategory] = useState<PLACE_CATEGORY>(
    PLACE_CATEGORY.MY_PLACES,
  );

  return (
    <PlaceCategoryContext.Provider
      value={{ placesCategory, setPlacesCategory }}
    >
      {children}
    </PlaceCategoryContext.Provider>
  );
};

export default PlaceCategoryProvider;
