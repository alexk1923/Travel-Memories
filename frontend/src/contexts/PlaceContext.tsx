import React, { Dispatch, createContext, useContext, useEffect, useReducer, useState } from "react";
import { PlaceType } from "../components/Place";
import { useUserContext } from "./UserContext";

type ReducerType = {
	state: PlaceState;
	dispatch: Dispatch<any>;
};

type RatingPayloadType = {
	_id: string;
	newRating: number;
	userId: string
};

export type RatingType = { userId: string, rating: number };


export enum PlaceActionType {
	ADD = "ADD",
	DELETE = "DELETE",
	GET = "GET",
	LIKE_TOGGLE = "LIKE_TOGGLE",
	FAVORITE_TOGGLE = "FAVORITE_TOGGLE",
	CHANGE_RATING = "CHANGE_RATING"
}

type LikeChangeType = {
	id: string;
	likedBy: string[];
}

type FavoriteChange = {
	userId: string;
	favoritePlaces: string[];
}

interface ActionInfo<T> {
	type: PlaceActionType;
	payload: T;
}

interface PlaceState {
	places: PlaceType[];
}

const PlaceContext = createContext<ReducerType>({
	dispatch: () => { },
	state: {
		places: [],
	},
});

export function usePlaceContext() {
	return useContext(PlaceContext);
}

export function PlaceProvider({ children }: { children: React.ReactNode }) {
	const { user } = useUserContext();
	const [likeChange, setLikeChange] = useState<LikeChangeType>({} as LikeChangeType);
	const [favoriteChange, setFavoriteChange] = useState<FavoriteChange>({} as FavoriteChange);

	const [stateReducer, dispatchReducer] = useReducer(reducer, { places: [] });

	// Update database if like list changed
	useEffect(() => {
		if (likeChange.id) {
			fetch(`http://localhost:8000/api/places/${likeChange.id}`, {
				method: 'PATCH',
				headers: { Authorization: `Bearer ${user.token}`, "Content-Type": "application/json", },
				body: JSON.stringify({
					likedBy: likeChange.likedBy
				}),
			})
		}

	}, [likeChange])

	// Update database if favorite list changed
	useEffect(() => {
		if (favoriteChange.userId) {
			fetch(`http://localhost:8000/api/user/${favoriteChange.userId}`, {
				method: 'PATCH',
				headers: { Authorization: `Bearer ${user.token}`, "Content-Type": "application/json", },
				body: JSON.stringify({
					favoritePlaces: favoriteChange.favoritePlaces
				}),
			})

			localStorage.setItem("user", JSON.stringify(user))
		}

	}, [favoriteChange])

	function updatePlaceRatingDb(placeId: string, newRatings: RatingType[]) {
		fetch(`http://localhost:8000/api/places/${placeId}`, {
			method: 'PATCH',
			headers: { Authorization: `Bearer ${user.token}`, "Content-Type": "application/json", },
			body: JSON.stringify({
				ratings: newRatings
			})
		});

	}

	function reducer(
		state: PlaceState,
		action: ActionInfo<PlaceType[] | PlaceType | RatingPayloadType | string>
	) {
		console.log(action);
		switch (action.type) {
			case PlaceActionType.GET:
				const newPlaces = {
					places: action.payload as PlaceType[],
				};

				return newPlaces;
			case PlaceActionType.ADD:
				state.places.push(action.payload as PlaceType);
				return { ...state };
			case PlaceActionType.DELETE:
				return {
					places: state.places.filter(
						(place) => place._id != (action.payload as string)
					),
				};
			case PlaceActionType.LIKE_TOGGLE:
				return {
					places: state.places.map((place) => {
						// If the user didn't like the post before
						if (
							place._id === action.payload
						) {
							if (!place.likedBy.includes(user.username)) {
								place.likedBy.push(user.username);

								const newLikeChange = { id: action.payload, likedBy: place.likedBy }

								setLikeChange({ id: place._id, likedBy: place.likedBy });
								return {
									...place,
								};
							}

							// The post was already liked
							else if (place.likedBy.includes(user.username)) {
								const newPlace = {
									...place,
									likedBy: place.likedBy.filter(
										(userLikeId) => userLikeId != user.username
									),
								};
								setLikeChange({ id: newPlace._id, likedBy: newPlace.likedBy });
								return newPlace;
							}
						}

						return place;
					}),
				};
			case PlaceActionType.FAVORITE_TOGGLE:
				const newFavPlaceId = action.payload;
				console.log("Favorite toggle");
				console.log(user);


				if (!user.favoritePlaces.includes(newFavPlaceId as string)) {
					user.favoritePlaces.push(newFavPlaceId as string);
				} else {
					user.favoritePlaces = user.favoritePlaces.filter(favPlaceId => favPlaceId !== newFavPlaceId);
				}
				setFavoriteChange({ userId: user.id, favoritePlaces: user.favoritePlaces });
				return { ...state }
			case PlaceActionType.CHANGE_RATING:
				state.places.map(place => {
					if (place._id === (action.payload as RatingPayloadType)._id) {
						const index = place.ratings.findIndex(rating => rating.userId === (action.payload as RatingPayloadType).userId)
						if (index !== -1) {
							place.ratings[index].rating = (action.payload as RatingPayloadType).newRating;
						} else {
							place.ratings.push({
								userId: (action.payload as RatingPayloadType).userId,
								rating: (action.payload as RatingPayloadType).newRating
							});
						}
						updatePlaceRatingDb(place._id, place.ratings);
					}
				})

				return state;
			default:
				return { ...state };
		}


	}

	return (
		<PlaceContext.Provider
			value={{ state: stateReducer, dispatch: dispatchReducer }}
		>
			{children}
		</PlaceContext.Provider>
	);
}
