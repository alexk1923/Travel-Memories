import React, { SyntheticEvent, useState } from "react";
import { PLACE_SORT } from "../constants";
import { FaSortAmountDown } from "react-icons/fa";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

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

  const handleChangeSorting = (
    e: SyntheticEvent<Element, Event>,
    checked: boolean,
  ) => {
    setSortPlace(parseInt((e.target as HTMLInputElement).value) as PLACE_SORT);
  };

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
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={PLACE_SORT.RATINGS}
            name="radio-buttons-group"
          >
            <FormControlLabel
              value={PLACE_SORT.RATINGS}
              control={<Radio />}
              label={PlaceSortMap[PLACE_SORT.RATINGS]}
              onChange={handleChangeSorting}
            />
            <FormControlLabel
              value={PLACE_SORT.LIKES}
              control={<Radio />}
              label="Likes"
              onChange={handleChangeSorting}
            />
            <FormControlLabel
              value={PLACE_SORT.VISITORS}
              control={<Radio />}
              label="Number of visitors"
              onChange={handleChangeSorting}
            />
          </RadioGroup>
        </>
      )}
    </div>
  );
};

export default SortingForm;
