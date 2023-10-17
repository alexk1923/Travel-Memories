import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { PlaceType } from "./Place";
import Place from "./Place";
import { UserType, useUserContext } from "../contexts/UserContext";
import { PlaceActionType, RatingType, usePlaceContext } from "../contexts/PlaceContext";
import { useLogout } from "../hooks/useLogout";
import { PLACE_CATEGORY, PLACE_SORT, PLACE_FILTER } from "./FilterForm";
import { DEFAULT_COUNTRY } from "../constants";

type PlacesPropsType = {
	profileUser: string | undefined;
	category: PLACE_CATEGORY;
	sortPlace: PLACE_SORT;
	filter: PLACE_FILTER;
};

export default function Places({ profileUser, category, sortPlace, filter }: PlacesPropsType) {
	const { state, dispatch } = usePlaceContext();
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
				if (res.status == 401) {
					logout();
				}
			});
		}
	}, []);

	useEffect(() => {
		console.log("oOn the telephone");

		if (profileUser === undefined) {

			return;
		}

		if (user && user.username) {

			// fetch(`http://localhost:8000/api/user/${profileUser}/places`, {
			// 	method: "GET",
			// 	headers: { Authorization: `Bearer ${user.token}` },
			// })
			// 	.then((res) => {
			// 		if (res.ok)
			// 			return res.json();
			// 		return Promise.reject(res);
			// 	})
			// 	.then((data) => {
			// 		dispatch({ type: PlaceActionType.GET, payload: data })
			// 	})
			// 	.catch((err) => {
			// 		console.log("Err:");
			// 		console.log(err);
			// 	});

			fetch(`http://localhost:8000/api/places/all`, {
				method: "GET",
				headers: { Authorization: `Bearer ${user.token}` }
			}).then(res => {
				if (res.ok) {
					return res.json()
				}
				return Promise.reject(res)
			}).then(data => {
				console.log("My all places:");

				console.log(data);

				dispatch({ type: PlaceActionType.GET, payload: data })
				console.log("S-a facut dispatch teoretic");

			}).catch(err => {
				console.log("Error in getting all places:");
				console.log(err);
			});
		}

	}, [user]);

	function applyFilter(place: PlaceType) {
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
		return Number((ratings.reduce((acc, ratingInfo) => ratingInfo.rating + acc, 0) / ratings.length).toFixed(2));
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
				return placeA.visitors.length - placeB.visitors.length;
			default:
				return -1;
		}
	}

	function filterByLocation(place: PlaceType) {

		const filterByCountry = filter.country == DEFAULT_COUNTRY ? true : (filter.country === place.country);
		const filterByCity = filter.city === "" ? true : (filter.city === place.city);

		return filterByCountry && filterByCity;
	}

	useEffect(() => {
		console.log(filter);

		let arr = state.places.filter(filterByLocation);
		console.log(state.places);

	}, [filter])

	useEffect(() => {
		console.log("S-a schimbat state places");
		console.log(state.places);


	}, [state.places])

	return (
		<div className='text-black grid grid-cols-3 items-center gap-2 rounded-xlg'>
			{state.places.filter(filterByLocation).filter(applyFilter).sort(applySort).map((place) => {
				return <Place {...place} key={uuid()} />;
			})}
		</div>
	);
}
