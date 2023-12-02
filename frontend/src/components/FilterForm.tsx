import React from "react";

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

  return (
    <>
      {" "}
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
      <div className="flex flex-col justify-center ">
        <div>
          <p>Sort by:</p>
        </div>
        <div>
          <label htmlFor="huey">{PlaceSortMap[PLACE_SORT.RATINGS]}</label>
          <input
            type="radio"
            id="huey"
            name="drone"
            value="huey"
            checked={sortPlace === PLACE_SORT.RATINGS}
            onChange={() => setSortPlace(PLACE_SORT.RATINGS)}
          />
        </div>

        <div>
          <label htmlFor="dewey">{PlaceSortMap[PLACE_SORT.LIKES]}</label>
          <input
            type="radio"
            id="dewey"
            name="drone"
            value="dewey"
            checked={sortPlace === PLACE_SORT.LIKES}
            onChange={() => setSortPlace(PLACE_SORT.LIKES)}
          />
        </div>

        <div>
          <label htmlFor="louie">{PlaceSortMap[PLACE_SORT.VISITORS]}</label>
          <input
            type="radio"
            id="louie"
            name="drone"
            value="louie"
            checked={sortPlace === PLACE_SORT.VISITORS}
            onChange={() => setSortPlace(PLACE_SORT.VISITORS)}
          />
        </div>
      </div>
    </>
  );
}
