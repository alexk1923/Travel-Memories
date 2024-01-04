import React, { useState } from "react";
import { FaSortAmountDown } from "react-icons/fa";
import SortingForm from "./SortingForm";

export enum PLACE_CATEGORY {
  "ALL_PLACES",
  "MY_PLACES",
  "FAVORITE_PLACES",
  "LIKED_PLACES",
}

export enum PLACE_SORT {
  "RATINGS",
  "LIKES",
  "VISITORS",
}

export const PlaceCategoryMap = {
  [PLACE_CATEGORY.ALL_PLACES]: "All Places",
  [PLACE_CATEGORY.MY_PLACES]: "My Places",
  [PLACE_CATEGORY.FAVORITE_PLACES]: "Favorites",
  [PLACE_CATEGORY.LIKED_PLACES]: "Liked",
};

export type PLACE_FILTER = {
  country: string;
  city: string;
};

type FilterPropsType = {
  category: {
    page: string;
    placesCategory?: PLACE_CATEGORY;
    setPlacesCategory?: React.Dispatch<React.SetStateAction<PLACE_CATEGORY>>;
  };
  sortPlace: PLACE_SORT;
  setSortPlace: React.Dispatch<React.SetStateAction<PLACE_SORT>>;
};

export default function Filter(props: FilterPropsType) {
  const { sortPlace, setSortPlace, category } = props;
  const [sorting, setSorting] = useState(false);
  return (
    <>
      {category.page === "Profile" && (
        <div className="bg-red-300 text-slate-800">
          <select
            value={category.placesCategory}
            onChange={(e) => {
              category.setPlacesCategory?.(
                parseInt(e.target.value) as PLACE_CATEGORY,
              );
            }}
          >
            <option value={PLACE_CATEGORY.MY_PLACES}>
              {PlaceCategoryMap[PLACE_CATEGORY.MY_PLACES]}
            </option>
            <option value={PLACE_CATEGORY.FAVORITE_PLACES}>
              {PlaceCategoryMap[PLACE_CATEGORY.FAVORITE_PLACES]}
            </option>
            <option value={PLACE_CATEGORY.LIKED_PLACES}>
              {PlaceCategoryMap[PLACE_CATEGORY.LIKED_PLACES]}
            </option>
          </select>
        </div>
      )}
      {/* Sort */}
    </>
  );
}
