import {
  FaHeart,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { MdBackpack } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { useUserContext } from "../contexts/UserContext";
import {
  PlaceActionType,
  RatingType,
  usePlaceContext,
} from "../contexts/PlaceContext";
import React, { useCallback, useEffect, useState } from "react";
import Rating from "./Rating";
import { useNavigate } from "react-router-dom";
import { CircleFlag } from "react-circle-flags";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { PlaceType, UserType } from "../constants";

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

  const [avg, setAvg] = useState("0.00");
  const [, setColoredAvg] = useState([false, false, false, false, false]);
  const [colored] = useState([false, false, false, false, false]);
  const [hoverPlace, setHoverPlace] = useState(false);
  const { state } = usePlaceContext();
  const [isoCode, setIsoCode] = useState("?");
  const [addedByUsername, setAddedByUsername] = useState<string>("");

  useEffect(() => {
    const newAvg =
      ratings.reduce((acc, ratingInfo) => ratingInfo.rating + acc, 0) /
      ratings.length;

    setAvg(Number(newAvg).toFixed(2));
  }, [ratings, state]);

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

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/iso", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country }),
    })
      .then((res) => res.json())
      .then((data: { data: { Iso2: string } }) => {
        console.log(data.data.Iso2);
        setIsoCode(data.data.Iso2.toLowerCase());
      });
  }, []);

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

  // useEffect(() => {
  //   fetch(`http://localhost:8000/api/user/${addedBy}`, {
  //     method: "GET",
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       } else {
  //         return {} as UserType;
  //       }
  //     })
  //     .then((data: UserType) => {
  //       console.log(data);
  //       setAddedByUsername(data.username);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <Stack
      mb={4}
      flex={1}
      className="rounded-lg  lg:min-w-[300px]"
      bgcolor="secondary.dark"
    >
      <Stack
        direction="row"
        alignItems="center"
        bgcolor="primary.main"
        color="secondary.main"
        spacing={2}
        paddingX={1}
        paddingY={2}
        className="rounded-t-lg shadow-lg "
        onClick={() => navigate(`/user/${addedBy}`)}
        textOverflow="ellipsis"
        overflow="hidden"
        white-space="nowrap"
      >
        <Avatar alt={addedBy} src={`/img/users/${addedBy}.jpg`} />
        <Typography
          variant="body1"
          fontWeight="bold"
          textOverflow="ellipsis"
          overflow="hidden"
        >
          {addedBy}
        </Typography>
      </Stack>

      <div
        className="relative flex w-full max-w-full justify-center self-center"
        onMouseEnter={() => setHoverPlace(true)}
        onMouseLeave={() => setHoverPlace(false)}
      >
        {addedBy === user.id && hoverPlace && (
          <>
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-black opacity-75"></div>

            <div className="text-body-1 absolute bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center gap-8 text-gray">
              <div className="flex items-center justify-center">
                <FaEdit className="cursor-pointer hover:text-pure-white" />
              </div>
              <div className="flex items-center justify-center">
                <FaTrashAlt
                  className="cursor-pointer hover:text-pure-white"
                  onClick={handleRemovePlace}
                />
              </div>
            </div>
          </>
        )}

        {imageURL === "" ? (
          <div className="flex aspect-square w-full items-center justify-center bg-white ">
            No image found
          </div>
        ) : (
          <img src={imageURL} alt={name} className="aspect-square w-full " />
        )}

        <Stack
          flexDirection="row"
          position="absolute"
          justifyContent="space-between"
          className="w-full"
          alignItems="center"
        >
          <Box paddingLeft={2} width="fit-content">
            <CircleFlag
              countryCode={isoCode}
              className="h-[20px] w-[20px] md:h-[50px] md:w-[50px]"
            />
          </Box>
          <Box className="rounded-bl-lg" bgcolor={"secondary.main"} padding={2}>
            <Stack direction="row">
              <Typography fontWeight="bold" variant="h5" color="primary.dark">
                {ratings.length > 0 ? avg : "0.00"}
                <StarIcon />
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Stack
          flexDirection="row"
          justifyContent="center"
          position="absolute"
          bottom={0}
          zIndex={2}
          className="bg-gradient-to-t from-black"
          width="100%"
        >
          <Typography variant="h4" component="div">
            <Rating ratings={ratings} placeId={_id} userId={user.id} />
          </Typography>
        </Stack>
      </div>

      <Stack maxWidth="100%" alignItems="center" justifyContent="center">
        <Divider light />
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

        <Stack gap={2} padding={2}>
          {user.id && addedBy !== user.id && (
            <div className="flex justify-center gap-2">
              <span>
                {visitors.includes(user.id) ? "Visited" : "Not visited"}
              </span>

              <FaCheckCircle
                className={
                  `cursor-pointer ` +
                  (visitors.includes(user.id)
                    ? "text-green hover:text-gray"
                    : "hover:text-green")
                }
                onClick={handleMarkAsVisited}
              />
            </div>
          )}
          <Button variant="contained" onClick={() => navigate(`/place/${_id}`)}>
            Details
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export const MemoizedPlace = React.memo(Place);
