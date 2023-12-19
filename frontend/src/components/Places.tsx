import { useEffect } from "react";
import { MemoizedPlace, PlaceType } from "./Place";
import { useUserContext } from "../contexts/UserContext";
import { RatingType, usePlaceContext } from "../contexts/PlaceContext";
import { useLogout } from "../hooks/useLogout";
import { PLACE_CATEGORY, PLACE_SORT, PLACE_FILTER } from "./FilterForm";
import { DEFAULT_COUNTRY } from "../constants";

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
  const { state } = usePlaceContext();
  const { user, setUser } = useUserContext();
  const logout = useLogout();

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
    <div className="rounded-xlg grid justify-items-center gap-2 text-black lg:grid-cols-3">
      {state.places
        .filter(filterByLocation)
        .filter(filterByCategory)
        .sort(applySort)
        .map((place) => {
          return <MemoizedPlace {...place} key={place._id} />;
        })}
    </div>
  );
}
