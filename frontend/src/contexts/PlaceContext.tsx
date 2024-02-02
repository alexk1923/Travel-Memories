import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useUserContext } from "./UserContext";
import { PlaceType } from "../constants";

type ReducerType = {
  state: PlaceState;
  dispatch: React.Dispatch<
    ActionInfo<
      | string
      | PlaceType
      | PlaceType[]
      | RatingPayloadType
      | VisitPayloadType
      | LikePayloadType
    >
  >;
};

type RatingPayloadType = {
  placeId: string;
  newRating: number;
  userId: string;
};

type VisitPayloadType = {
  placeId: string;
  newVisitors: string[];
};

type LikePayloadType = {
  placeId: string;
};

export type RatingType = { userId: string; rating: number };

export enum PlaceActionType {
  ADD = "ADD",
  DELETE = "DELETE",
  GET = "GET",
  LIKE_TOGGLE = "LIKE_TOGGLE",
  FAVORITE_TOGGLE = "FAVORITE_TOGGLE",
  CHANGE_RATING = "CHANGE_RATING",
  VISIT = "VISIT",
}

type LikeChangeType = {
  id: string;
  likedBy: string[];
};

type FavoriteChange = {
  userId: string;
  favoritePlaces: string[];
};

interface ActionInfo<T> {
  type: PlaceActionType;
  payload: T;
}

interface PlaceState {
  places: PlaceType[];
}

const PlaceContext = createContext<ReducerType>({
  dispatch: () => {},
  state: {
    places: [],
  } as PlaceState,
});

export function usePlaceContext() {
  return useContext(PlaceContext);
}

export function PlaceProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUserContext();
  const [likeChange, setLikeChangeDb] = useState<LikeChangeType>(
    {} as LikeChangeType,
  );
  const [favoriteChange, setFavoriteChange] = useState<FavoriteChange>(
    {} as FavoriteChange,
  );

  function reducer(
    state: PlaceState,
    action: ActionInfo<
      PlaceType[] | PlaceType | RatingPayloadType | LikePayloadType | string
    >,
  ) {
    switch (action.type) {
      case PlaceActionType.GET:
        return { ...state, places: action.payload as PlaceType[] };
      case PlaceActionType.ADD:
        fetch(`http://localhost:8000/api/places/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(action.payload),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(`Added ${data} to the database`);
          })
          .catch((err) => {
            console.log(err);
          });

        // state.places.push(action.payload as PlaceType);
        return { ...state };
      case PlaceActionType.DELETE:
        return {
          places: state.places.filter(
            (place) => place._id !== (action.payload as string),
          ),
        };
      case PlaceActionType.LIKE_TOGGLE:
        const place = state.places.find(
          (place) => place._id === (action.payload as LikePayloadType).placeId,
        );
        console.log("Found place:");
        console.log(place);
        if (place) {
          if (!place.likedBy.includes(user.username)) {
            place.likedBy.push(user.username);
            console.log("Not liked yet");
            setLikeChangeDb({ id: place._id, likedBy: place.likedBy });
            return { ...state };
          } else if (place.likedBy.includes(user.username)) {
            place.likedBy = place.likedBy.filter(
              (username) => username !== user.username,
            );
            console.log("Already liked");
            console.log(place);

            setLikeChangeDb({ id: place._id, likedBy: place.likedBy });
            return { ...state };
          }
        }

        return { ...state };

      case PlaceActionType.FAVORITE_TOGGLE:
        const newFavPlaceId = action.payload;
        if (!user.favoritePlaces.includes(newFavPlaceId as string)) {
          user.favoritePlaces.push(newFavPlaceId as string);
        } else {
          user.favoritePlaces = user.favoritePlaces.filter(
            (favPlaceId) => favPlaceId !== newFavPlaceId,
          );
        }
        setFavoriteChange({
          userId: user.id,
          favoritePlaces: user.favoritePlaces,
        });
        return { ...state };
      case PlaceActionType.CHANGE_RATING:
        state.places.map((place) => {
          if (place._id === (action.payload as RatingPayloadType).placeId) {
            const index = place.ratings.findIndex(
              (rating) =>
                rating.userId === (action.payload as RatingPayloadType).userId,
            );
            if (index !== -1) {
              place.ratings[index].rating = (
                action.payload as RatingPayloadType
              ).newRating;
            } else {
              place.ratings.push({
                userId: (action.payload as RatingPayloadType).userId,
                rating: (action.payload as RatingPayloadType).newRating,
              });
            }
            updatePlaceRatingDb(place._id, place.ratings);
          }
          return place;
        });
        return { ...state };
      case PlaceActionType.VISIT:
        const { placeId, newVisitors } = action.payload as VisitPayloadType;
        console.log(newVisitors);
        updateVisitNumber(placeId, newVisitors);
        return { ...state };
      default:
        return { ...state };
    }
  }

  const [stateReducer, dispatchReducer] = useReducer(reducer, { places: [] });

  // Update database if like list changed
  useEffect(() => {
    if (likeChange.id) {
      fetch(`http://localhost:8000/api/places/${likeChange.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likedBy: likeChange.likedBy,
          unprivileged: "true",
        }),
      });
    }
  }, [likeChange, user]);

  // Update database if favorite list changed
  useEffect(() => {
    if (favoriteChange.userId) {
      fetch(`http://localhost:8000/api/user/${favoriteChange.userId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          favoritePlaces: favoriteChange.favoritePlaces,
        }),
      });

      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [favoriteChange, user]);

  function updatePlaceRatingDb(placeId: string, newRatings: RatingType[]) {
    console.log(`Update the place ${placeId} with new ratings: ${newRatings}`);

    fetch(`http://localhost:8000/api/places/${placeId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ratings: newRatings,
        unprivileged: "true",
      }),
    });
  }

  function updateVisitNumber(placeId: string, newVisitors: string[]) {
    fetch(`http://localhost:8000/api/places/${placeId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitors: newVisitors,
        unprivileged: "yes",
      }),
    });
  }

  useEffect(() => {
    if (user === undefined) {
      return;
    }

    if (user && user.username) {
      fetch(`http://localhost:8000/api/places/all`, {
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res);
        })
        .then((data) => {
          dispatchReducer({ type: PlaceActionType.GET, payload: data });
          console.log(data);
        })
        .catch((err) => {
          console.log("Error in getting all places:");
          console.log(err);
        });
    }
  }, [user]);

  return (
    <PlaceContext.Provider
      value={{ state: stateReducer, dispatch: dispatchReducer }}
    >
      {children}
    </PlaceContext.Provider>
  );
}
