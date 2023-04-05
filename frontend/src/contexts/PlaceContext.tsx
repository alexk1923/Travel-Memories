import React, { Dispatch, createContext, useContext, useReducer } from "react";
import { PlaceType } from "../components/Place";
import { isForStatement, isIfStatement } from "typescript";

type ReducerType = {
	state: PlaceState;
	dispatch: Dispatch<any>;
};

export enum PlaceActionType {
	ADD = "ADD",
	DELETE = "DELETE",
	GET = "GET",
	LIKE_INC = "LIKE_INC",
}

interface ActionInfo<T> {
	type: PlaceActionType;
	payload: T;
}

interface PlaceState {
	places: PlaceType[];
}

function reducer(
	state: PlaceState,
	action: ActionInfo<PlaceType[] | PlaceType | string>
) {
	console.log("dfsf");
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
		case PlaceActionType.LIKE_INC:
			return {
				places: state.places.map((place) => {
					if (place._id == action.payload) {
						const noLikes = place.likes;
						return {
							...place,
							likes: noLikes + 1,
						};
					} else {
						return place;
					}
				}),
			};
		default:
			return { ...state };
	}
}

const PlaceContext = createContext<ReducerType>({
	dispatch: () => {},
	state: {
		places: [],
	},
});

export function usePlaceContext() {
	return useContext(PlaceContext);
}

export function PlaceProvider({ children }: { children: React.ReactNode }) {
	const [stateReducer, dispatchReducer] = useReducer(reducer, { places: [] });
	return (
		<PlaceContext.Provider
			value={{ state: stateReducer, dispatch: dispatchReducer }}
		>
			{children}
		</PlaceContext.Provider>
	);
}
