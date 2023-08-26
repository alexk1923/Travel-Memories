import React, { Dispatch, createContext, useContext, useEffect, useReducer, useState } from "react";
import { PlaceType } from "../components/Place";
import { useUserContext } from "./UserContext";
import Places from "../components/Places";

type ReducerType = {
	state: PlaceState;
	dispatch: Dispatch<any>;
};

export enum PlaceActionType {
	ADD = "ADD",
	DELETE = "DELETE",
	GET = "GET",
	LIKE_TOGGLE = "LIKE_TOGGLE",
}

type LikeChangeType = {
	id: string;
	likedBy: string[];
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
	const [stateReducer, dispatchReducer] = useReducer(reducer, { places: [] });


	useEffect(() => {
		if (likeChange.id) {

			console.log("Database function");

			console.log(likeChange);
			// console.log(likeChange.likedBy);
			console.log();

			fetch(`http://localhost:8000/api/places/${likeChange.id}`, {
				method: 'PATCH',
				headers: { Authorization: `Bearer ${user.token}`, "Content-Type": "application/json", },
				body: JSON.stringify({
					likedBy: likeChange.likedBy
				}),
			})
		}

	}, [stateReducer])

	function reducer(
		state: PlaceState,
		action: ActionInfo<PlaceType[] | PlaceType | string>
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

								console.log("Before Like Toggle");

								console.log(action.payload);
								console.log(place.likedBy);


								const newLikeChange = { id: action.payload, likedBy: place.likedBy }
								console.log("After Like Toggle:");

								console.log(newLikeChange);

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
