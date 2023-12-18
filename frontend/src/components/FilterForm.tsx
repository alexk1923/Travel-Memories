import React, { useState } from "react";
import { FaSortAmountDown } from "react-icons/fa";

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

const PlaceSortMap = {
  [PLACE_SORT.RATINGS]: "Ratings",
  [PLACE_SORT.LIKES]: "Likes",
  [PLACE_SORT.VISITORS]: "Number of visitors",
};

const PlaceCategoryMap = {
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
      <div className="flex flex-col">
        <div
          className="flex w-fit items-center justify-center rounded-full bg-white p-2 text-primary"
          onClick={() => setSorting((oldSorting) => !oldSorting)}
        >
          <FaSortAmountDown />
        </div>
        {sorting && (
          <>
            <span className="text-body-2 font-semibold">Sort by:</span>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="ratingSorting"
                  name="ratingSorting"
                  value="ratingSorting"
                  checked={sortPlace === PLACE_SORT.RATINGS}
                  onChange={() => setSortPlace(PLACE_SORT.RATINGS)}
                  className="radio "
                />
                <label htmlFor="ratingSorting">
                  {PlaceSortMap[PLACE_SORT.RATINGS]}
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="likeSorting"
                  name="likeSorting"
                  value="likeSorting"
                  checked={sortPlace === PLACE_SORT.LIKES}
                  onChange={() => setSortPlace(PLACE_SORT.LIKES)}
                  className="radio"
                />
                <label htmlFor="likeSorting">
                  {PlaceSortMap[PLACE_SORT.LIKES]}
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="visitorSorting"
                  name="visitorSorting"
                  value="visitorSorting"
                  checked={sortPlace === PLACE_SORT.VISITORS}
                  onChange={() => setSortPlace(PLACE_SORT.VISITORS)}
                  className="radio"
                />
                <label htmlFor="visitorSorting">
                  {PlaceSortMap[PLACE_SORT.VISITORS]}
                </label>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
