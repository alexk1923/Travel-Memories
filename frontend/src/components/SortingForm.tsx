import React, { useState } from "react";
import { PLACE_SORT } from "../constants";
import { FaSortAmountDown } from "react-icons/fa";

type SortingFormProps = {
  sortPlace: PLACE_SORT;
  setSortPlace: React.Dispatch<React.SetStateAction<PLACE_SORT>>;
};

const PlaceSortMap = {
  [PLACE_SORT.RATINGS]: "Ratings",
  [PLACE_SORT.LIKES]: "Likes",
  [PLACE_SORT.VISITORS]: "Number of visitors",
};

const SortingForm = ({ sortPlace, setSortPlace }: SortingFormProps) => {
  const [sorting, setSorting] = useState(false);

  return (
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
  );
};

export default SortingForm;
