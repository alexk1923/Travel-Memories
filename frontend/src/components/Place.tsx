import {
  FaHeart,
  FaMapMarkerAlt,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { MdBackpack, MdClose } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { useUserContext } from "../contexts/UserContext";
import {
  PlaceActionType,
  RatingType,
  usePlaceContext,
} from "../contexts/PlaceContext";
import React, { useCallback, useEffect, useState } from "react";
import Rating from "./Rating";
import { useLocation, useNavigate } from "react-router-dom";
import { CircleFlag } from "react-circle-flags";
import Button from "./Button";

export type PlaceType = {
  _id: string;
  name: string;
  country: string;
  city: string;
  imageURL: string;
  likes: number;
  favorite: number;
  visitors: string[];
  addedBy: string;
  likedBy: string[];
  ratings: RatingType[];
};

export default function Place(props: PlaceType) {
  const { user } = useUserContext();
  const { dispatch } = usePlaceContext();
  const navigate = useNavigate();

  const {
    _id,
    name,
    city,
    country,
    imageURL,
    visitors,
    addedBy,
    likedBy,
    ratings,
  } = props;

  const location = useLocation();
  const [avg, setAvg] = useState("0.00");
  const [coloredAvg, setColoredAvg] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [colored, setColored] = useState([false, false, false, false, false]);

  useEffect(() => {
    const newAvg =
      ratings.reduce((acc, ratingInfo) => ratingInfo.rating + acc, 0) /
      ratings.length;

    setAvg(Number(newAvg).toFixed(2));
  }, [ratings]);

  const ratingToStars = useCallback(
    (rating: number) => {
      let arr = [...colored];
      for (let i = 0; i < arr.length; i++) {
        arr[i] = false;
        if (i + 1 <= rating) {
          arr[i] = true;
        }
      }
      return arr;
    },
    [colored],
  );

  useEffect(() => {
    const stars = ratingToStars(Number(avg));
    setColoredAvg(stars);
  }, [avg, ratingToStars]);

  function handleRemovePlace() {
    fetch(`http://localhost:8000/api/places/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data: { deleted_id: string }) => {
        dispatch({ type: PlaceActionType.DELETE, payload: data.deleted_id });
      })

      .catch((err) => {
        console.log(err);
      });
  }

  function isLiked() {
    if (user.id === undefined) {
      return false;
    }

    return likedBy.includes(user.username);
  }

  console.log("Place rendered");
  console.log(likedBy);

  function handleMarkAsVisited() {
    if (!visitors.includes(user.id)) {
      visitors.push(user.id);
    } else {
      const index = visitors.findIndex((visitor) => visitor === user.id);
      visitors.splice(index, 1);
    }
    const newVisitors = visitors;
    dispatch({
      type: PlaceActionType.VISIT,
      payload: { placeId: _id, newVisitors },
    });
  }

  return (
    <div className="flex max-w-[80%] flex-col items-center rounded-lg bg-pure-white font-bold drop-shadow-lg md:my-5 md:flex-1 lg:pb-5">
      {addedBy === user.id && (
        <MdClose
          className="text-red-700 absolute right-[5%] top-1 inline cursor-pointer self-start text-3xl"
          onClick={handleRemovePlace}
        />
      )}

      <div className="relative flex justify-center self-center">
        <img
          src={imageURL ? imageURL : ""}
          alt={name}
          className="aspect-square w-full"
          onClick={() => {
            if (!location.pathname.includes(_id)) {
              navigate(`/place/${_id}`);
            }
          }}
        />

        <div className="absolute flex w-full items-center justify-between">
          <div className="w-fit ps-2">
            <CircleFlag countryCode="ro" width="40" />
          </div>
          <div className="text-body-1 rounded-bl-lg bg-white px-4 py-2">
            {ratings.length > 0 ? avg : "0.00"}
          </div>
        </div>

        <div className="text-star absolute bottom-0 flex w-full  justify-center bg-gradient-to-t from-black">
          {[...coloredAvg].map((e, i) => (
            <span key={i}>
              {coloredAvg[i] ? (
                <FaStar className="inline text-yellow-400 drop-shadow-2xl" />
              ) : Number(avg) - i >= 0.5 ? (
                <FaStarHalfAlt className="inline text-yellow-400 drop-shadow-2xl " />
              ) : (
                <FaRegStar className="inline text-yellow-400 drop-shadow-2xl" />
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="flex max-w-full flex-col items-center justify-center">
        <span className="text-body-1">{name}</span>

        <span className="text-body-2 inline">
          <FaMapMarkerAlt className="inline" />
          {`${country}, ${city}`}
        </span>
        <div className="text-place-card flex gap-3 text-primary">
          <span className={isLiked() ? "text-blue-700" : ""}>
            <AiFillLike
              className="inline"
              onClick={() =>
                dispatch({
                  type: PlaceActionType.LIKE_TOGGLE,
                  payload: { placeId: _id },
                })
              }
            />
            {likedBy.length}
          </span>

          <span
            className={
              user &&
              user.favoritePlaces &&
              user?.favoritePlaces.includes(props._id)
                ? "px-3 text-red"
                : "px-3"
            }
          >
            <FaHeart
              className="inline"
              onClick={() =>
                dispatch({
                  type: PlaceActionType.FAVORITE_TOGGLE,
                  payload: _id,
                })
              }
            />
          </span>
          <span>
            <MdBackpack className="inline" />
            {visitors.length}
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {user.id && addedBy !== user.id && (
            <div className="flex gap-2">
              <span>
                {visitors.includes(user.id)
                  ? "Remove visit"
                  : "Mark as visited"}
              </span>

              {visitors.includes(user.id) ? (
                <FaTimesCircle
                  className="hover:text-red"
                  onClick={handleMarkAsVisited}
                />
              ) : (
                <FaCheckCircle
                  className="hover:text-green"
                  onClick={handleMarkAsVisited}
                />
              )}
            </div>
          )}
          <Button
            text="Details"
            variant="filled"
            onClick={() => navigate(`/place/${_id}`)}
          />
        </div>
      </div>

      {/* <Rating ratings={ratings} placeId={_id} userId={user.id} /> */}
    </div>
  );
}

export const MemoizedPlace = React.memo(Place);
