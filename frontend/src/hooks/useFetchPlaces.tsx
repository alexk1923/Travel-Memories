import React, { useEffect, useState } from "react";
import { PlaceActionType, usePlaceContext } from "../contexts/PlaceContext";
import { useUserContext } from "../contexts/UserContext";
import { PLACE_CATEGORY } from "../constants";

const useFetchPlaces = (page: number, category: PLACE_CATEGORY) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useUserContext();
  const { dispatch, state } = usePlaceContext();
  const paginationSize = 5;

  useEffect(() => {
    const fetchData = async () => {
      if (user === undefined) {
        return;
      }

      setLoading(true);
      if (user && user.username) {
        console.log("Making a request, because page is " + page);
        console.log("my category is: " + category);

        if (page == 0 && state.places.length > 0) {
          dispatch({ type: PlaceActionType.RESET, payload: "" });
        }

        let url = "";
        switch (category) {
          case PLACE_CATEGORY.ALL_PLACES:
            url = `http://localhost:8000/api/places/all?page=${page}&paginationSize=${paginationSize}`;
            break;
          case PLACE_CATEGORY.MY_PLACES:
            url = `http://localhost:8000/api/user/${user.username}/places?page=${page}&paginationSize=${paginationSize}`;
            break;
          case PLACE_CATEGORY.FAVORITE_PLACES:
            url = `http://localhost:8000/api/user/${user.username}/places/favorites?page=${page}&paginationSize=${paginationSize}`;
            break;
          case PLACE_CATEGORY.LIKED_PLACES:
            url = `http://localhost:8000/api/user/${user.username}/places/liked?page=${page}&paginationSize=${paginationSize}`;
            break;
          default:
            break;
        }

        await fetch(url, {
          method: "GET",
          headers: { Authorization: `Bearer ${user.token}` },
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(res);
          })
          .then(async (data) => {
            dispatch({ type: PlaceActionType.GET, payload: data });
            setLoading(false);
          })
          .catch((err) => {
            console.log("Error in getting all places:");
            console.log(err);
            setError(true);
          });
      }

      return () => {
        dispatch({ type: PlaceActionType.RESET, payload: "" });
      };
    };

    fetchData();
  }, [page, category]);

  return { loading, error };
};

export default useFetchPlaces;
