import { useCallback, useEffect, useRef, useState } from "react";
import { MemoizedPlace } from "./PlaceCard";
import { useUserContext } from "../contexts/UserContext";
import {
  PlaceActionType,
  RatingType,
  usePlaceContext,
} from "../contexts/PlaceContext";
import { useLogout } from "../hooks/useLogout";
import { PLACE_CATEGORY, PLACE_SORT, PLACE_FILTER } from "./FilterForm";
import { DEFAULT_COUNTRY, PlaceType } from "../constants";
import { Divider, Stack } from "@mui/material";
import SideComments from "./SideComments";
import { SyncLoader } from "react-spinners";
import { useTheme } from "@mui/material/styles";
import useFetchPlaces from "../hooks/useFetchPlaces";

type PlacesPropsType = {
  profileUser: string | undefined;
  category: PLACE_CATEGORY;
  sortPlace: PLACE_SORT;
  filter: PLACE_FILTER;
};

export default function Places({
  profileUser,
  category,
  sortPlace,
  filter,
}: PlacesPropsType) {
  const { dispatch, state } = usePlaceContext();
  const { user, setUser } = useUserContext();

  const logout = useLogout();
  const [count, setCount] = useState<number>(0);

  const [page, setPage] = useState<number>(0);
  const { loading, error } = useFetchPlaces(page, category);
  const theme = useTheme();

  useEffect(() => {
    console.log("category s-a schimbat si este acum=" + category);

    setPage(0);
  }, [category]);

  const handleInfiniteScrolling = () => {
    console.log("Handling scrolling");
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const lastPlaceRef = useCallback(
    (node: HTMLDivElement) => {
      console.log("my node " + node);

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            handleInfiniteScrolling();
          }
        },
        { threshold: 1.0 },
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [count],
  );

  useEffect(() => {
    const storageUser = localStorage.getItem("user");

    if (user.username === undefined && storageUser) {
      setUser(JSON.parse(storageUser));
      console.log("S-a setat userul global si se va face un API request");
    }

    if (user.username !== undefined) {
      // Check if the token is still valid
      fetch(`http://localhost:8000/api/user/${user.username}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      }).then((res) => {
        if (res.status === 401) {
          logout();
        }
      });
    }
  }, [user.token, user.username, setUser, logout]);

  const observer = useRef<IntersectionObserver>();

  function filterByCategory(place: PlaceType) {
    switch (category) {
      case PLACE_CATEGORY.MY_PLACES:
        return place.addedBy === user.id;
      case PLACE_CATEGORY.FAVORITE_PLACES:
        return user.favoritePlaces.includes(place._id);
      case PLACE_CATEGORY.LIKED_PLACES:
        return place.likedBy.includes(user.username);
      default:
        return true;
    }
  }

  function avgRating(ratings: RatingType[]) {
    if (ratings.length === 0) {
      return 0.0;
    }
    return Number(
      (
        ratings.reduce((acc, ratingInfo) => ratingInfo.rating + acc, 0) /
        ratings.length
      ).toFixed(2),
    );
  }

  function applySort(placeA: PlaceType, placeB: PlaceType) {
    switch (sortPlace) {
      case PLACE_SORT.RATINGS:
        const avg1 = avgRating(placeA.ratings);
        const avg2 = avgRating(placeB.ratings);
        return avg2 - avg1;
      case PLACE_SORT.LIKES:
        return placeB.likedBy.length - placeA.likedBy.length;
      case PLACE_SORT.VISITORS:
        return placeB.visitors.length - placeA.visitors.length;
      default:
        return -1;
    }
  }

  function filterByLocation(place: PlaceType) {
    const filterByCountry =
      filter.country === DEFAULT_COUNTRY
        ? true
        : filter.country === place.country;
    const filterByCity = filter.city === "" ? true : filter.city === place.city;
    return filterByCountry && filterByCity;
  }

  return (
    <Stack marginBottom={2} justifyContent="center">
      <button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        Ar trebui sa apara primele {5 * (page + 1)}
      </button>

      {state.places
        .filter(filterByLocation)
        // .filter(filterByCategory)
        .sort(applySort)
        .map((place, idx) => {
          return (
            <Stack
              gap={{ md: 4 }}
              className="md:flex-row"
              justifyContent="center"
              key={place._id}
            >
              {idx === state.places.length - 1 ? (
                <>
                  <div ref={lastPlaceRef}>
                    <MemoizedPlace {...place} key={place._id} />
                  </div>
                </>
              ) : (
                <MemoizedPlace {...place} key={place._id} />
              )}
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ display: { xs: "none", md: "block" } }}
              />
              <SideComments placeId={place._id} />
            </Stack>
          );
        })}

      {loading && <SyncLoader color={theme.palette.secondary.main} />}
    </Stack>
  );
}
