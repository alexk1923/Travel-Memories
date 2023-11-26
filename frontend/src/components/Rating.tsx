import { useCallback, useEffect, useState } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { PlaceActionType, usePlaceContext } from "../contexts/PlaceContext";
import { RatingProps } from "../constants";

export default function Rating(props: RatingProps) {
    const { ratings, placeId, userId } = props;


    const { state, dispatch } = usePlaceContext();
    const [avg, setAvg] = useState(0.0);

    useEffect(() => {
        setAvg(Number((ratings.reduce((acc, ratingInfo) => ratingInfo.rating + acc, 0) / ratings.length).toFixed(2)));
    }, [ratings, state])






    // function handleRatingHover(i: number) {
    //     setColored(ratingToStars(i + 1))
    // }

    return (
        <></>
        // <div className='rating' onMouseOut={() => setColored([false, false, false, false, false])}>
        //     <p>My rating:</p>
        //     {
        //         [...colored].map((e, i) =>
        //             <span key={i} onMouseOver={() => handleRatingHover(i)}
        //                 onClick={() => dispatch({ type: PlaceActionType.CHANGE_RATING, payload: { placeId, newRating: i + 1, userId } })}
        //             >
        //                 {colored[i] ? <FaStar className='inline text-yellow-400 drop-shadow-md' /> :
        //                     <FaStar className='inline text-stone-400 drop-shadow-md' />}
        //             </span>)
        //     }

        //     <br></br>

        // </div>
    )
}
