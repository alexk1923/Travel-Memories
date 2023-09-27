import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { PlaceType } from "./Place";
import Place from "./Place";
import { UserType, useUserContext } from "../contexts/UserContext";
import { PlaceActionType, usePlaceContext } from "../contexts/PlaceContext";
import { useLogout } from "../hooks/useLogout";

type PlacesPropsType = {
	profileUser: string | undefined;
};

export default function Places({ profileUser }: PlacesPropsType) {
	// const [places, setPlaces] = useState<PlaceType[]>([]);
	const { state, dispatch } = usePlaceContext();
	const { user, setUser } = useUserContext();
	const logout = useLogout();
	// const deleteFromList = (deleted_id: string) =>
	// 	setPlaces((prevPlace) => {
	// 		const newPlaces = prevPlace.filter((place) => place._id != deleted_id);
	// 		return newPlaces;
	// 	});


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

		if (profileUser === undefined) {
			return;
		}

		if (user && user.username) {
			fetch(`http://localhost:8000/api/user/${profileUser}/places`, {
				method: "GET",
				headers: { Authorization: `Bearer ${user.token}` },
			})
				.then((res) => {
					if (res.ok)
						return res.json();
					return Promise.reject(res);
				})
				.then((data) => {
					dispatch({ type: PlaceActionType.GET, payload: data })
				})
				.catch((err) => {
					console.log("Err:");
					console.log(err);
				});
		}


	}, [user]);

	return (
		<div className='text-black grid grid-cols-3 items-center gap-2 rounded-xlg'>
			{state.places.map((place) => {
				return <Place {...place} key={uuid()} />;
			})}
		</div>
	);
}
