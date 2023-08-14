import React, { Dispatch, createContext, useContext, useReducer } from "react";
import { PlaceType } from "../components/Place";
import { useUserContext } from "./UserContext";
import Places from "../pages/Places";

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
				console.log(state.places);
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
						if (
							place._id == action.payload &&
							!place.likedBy.includes(user._id)
						) {
							place.likedBy.push(user._id);
							console.log(place);
							return {
								...place,
							};
						} else {
							return {
								...place,
								likedBy: place.likedBy.filter(
									(userLikeId) => userLikeId != user._id
								),
							};
						}
					}),
				};
			default:
				return { ...state };
		}
	}

	const [stateReducer, dispatchReducer] = useReducer(reducer, { places: [] });
	return (
		<PlaceContext.Provider
			value={{ state: stateReducer, dispatch: dispatchReducer }}
		>
			{children}
		</PlaceContext.Provider>
	);
}
