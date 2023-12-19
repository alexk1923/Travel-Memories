import { useCallback, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { PlaceActionType, usePlaceContext } from "../contexts/PlaceContext";
import { RatingProps } from "../constants";

export default function Rating(props: RatingProps) {
  const { ratings, placeId, userId } = props;

  const { state, dispatch } = usePlaceContext();
  const [, setAvg] = useState(0.0);

  const ratingToStars = useCallback((rating: number) => {
    let arr = Array(5).fill(false);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = false;
      if (i + 1 <= rating) {
        arr[i] = true;
      }
    }
    return arr;
  }, []);

  function getDefault() {
    const currentUserRating = ratings.find(
      (rating) => rating.userId === userId,
    );
    const defaultRating: Boolean[] = currentUserRating
      ? ratingToStars(currentUserRating.rating)
      : [false, false, false, false, false];
    return defaultRating;
  }

  const defaultRating = getDefault();

  const [colored, setColored] = useState(defaultRating);

  useEffect(() => {
    setAvg(
      Number(
        (
          ratings.reduce((acc, ratingInfo) => ratingInfo.rating + acc, 0) /
          ratings.length
        ).toFixed(2),
      ),
    );
  }, [ratings, state]);

  function handleRatingHover(i: number) {
    setColored(ratingToStars(i + 1));
  }

  return (
    <div className="rating" onMouseLeave={() => setColored(defaultRating)}>
      {[...colored].map((e, i) => (
        <span
          key={i}
          onMouseOver={() => handleRatingHover(i)}
          onClick={() =>
            dispatch({
              type: PlaceActionType.CHANGE_RATING,
              payload: { placeId, newRating: i + 1, userId },
            })
          }
        >
          {colored[i] ? (
            <FaStar className="inline text-yellow-400 drop-shadow-md" />
          ) : (
            <FaStar className="inline text-stone-400 drop-shadow-md" />
          )}
        </span>
      ))}

      <br></br>
    </div>
  );
}
